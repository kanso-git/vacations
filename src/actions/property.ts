'use server'

import { ActionSubmissionResult, SearchRental } from '@/types'
import {
  imageSchema,
  propertySchema,
  PropertySchema,
} from '@/zod-schemas/propertySchema'
import { Prisma, Property } from '@prisma/client'
import { getLoggedUser, isLogged } from './clerk-utils'
import prisma from '@/utils/db'
import { base64ToFile } from '@/lib/utils'
import { deleteImage, uploadImage } from '@/utils/supabase'

/**
 * create a property for a rental
 * @param data
 * @returns
 */
export async function createProperty(
  data: PropertySchema
): Promise<ActionSubmissionResult<Property>> {
  try {
    console.log(`[createProperty] create the property in our db`)
    const user = await getLoggedUser()
    const validated = propertySchema.safeParse(data)
    if (validated.error) {
      return { status: 'error', errors: validated.error.errors }
    }

    let imageUrl = validated.data.image
    if (imageUrl) {
      const imgValidation = await validatePropertyImage(
        null,
        validated.data.image
      )
      if (imgValidation.status === 'error') {
        return imgValidation
      }
      imageUrl = imgValidation.data!
    }

    const propertyData: Prisma.PropertyCreateInput = {
      ...validated.data,
      image: imageUrl,
      profile: {
        connect: {
          clerkId: user.id,
        },
      },
    }

    const newProperty = await prisma.property.create({
      data: propertyData,
    })

    return { status: 'success', data: newProperty }
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 * delete the property
 * @param propertyId
 */
export async function deleteProperty(propertyId: string) {
  try {
    await getLoggedUser()
    const property = await prisma.property.findUniqueOrThrow({
      where: {
        id: propertyId,
      },
    })
    await prisma.property.delete({
      where: {
        id: propertyId,
      },
    })
    await deletePropertyImage(property.image)
  } catch (error) {
    console.error(error)
  }
}

/**
 * Used to fetch rental properties for home screen (without login)
 * and for favorite screen (authenticated user ONLY)
 * @param param0
 * @param screen
 * @returns
 */
export async function fetchProperties(
  {
    category,
    search = '',
    pageNumber = 1,
    pageSize,
    orderBy = 'createdAt',
  }: SearchRental,
  screen: 'home' | 'favorite' = 'home'
) {
  try {
    const user = await isLogged()
    let favoriteIds: string[] = []
    if (user && screen === 'favorite') {
      favoriteIds = (await getFavoriteProperties()).map((fp) => fp.propertyId)
    }
    const calculatedSize = pageSize
      ? parseInt(pageSize as unknown as string)
      : 12

    const count = await prisma.property.count({
      where: {
        ...(category ? { category } : {}),
        ...(screen === 'favorite'
          ? {
              id: {
                in: favoriteIds,
              },
            }
          : {}),
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { tagline: { contains: search, mode: 'insensitive' } },
        ],
      },
    })

    const properties = await prisma.property.findMany({
      where: {
        ...(category ? { category } : {}),
        ...(screen === 'favorite'
          ? {
              id: {
                in: favoriteIds,
              },
            }
          : {}),
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { tagline: { contains: search, mode: 'insensitive' } },
        ],
      },
      select: {
        image: true,
        id: true,
        name: true,
        tagline: true,
        country: true,
        price: true,
      },

      orderBy: {
        [orderBy]: 'desc',
      },
      skip: (pageNumber - 1) * calculatedSize,
      take: calculatedSize,
    })
    const data = {
      properties,
      count,
    }
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 * get liked properties return empty array if not logged in and the liked property Ids if logged
 * @returns
 */
export async function getFavoriteProperties() {
  try {
    const user = await isLogged()
    if (!user) {
      return []
    } else {
      return prisma.favorite.findMany({
        where: {
          clerkId: user.id,
        },
        select: {
          propertyId: true,
        },
      })
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 *
 * @param propertyId
 */
export async function toggleFavorite(propertyId: string) {
  try {
    const user = await getLoggedUser()
    const isFavorite = await prisma.favorite.findFirst({
      where: {
        propertyId,
        clerkId: user.id,
      },
    })
    if (isFavorite) {
      // delete record
      await prisma.favorite.delete({
        where: {
          clerkId_propertyId: {
            propertyId,
            clerkId: user.id,
          },
        },
      })
    } else {
      // create favorite
      await prisma.favorite.create({
        data: {
          propertyId,
          clerkId: user.id,
        },
      })
    }
  } catch (error) {}
}
/**
 * Used to validate the uploaded image if any
 * @param clerkUserId
 * @param dataImageUrl
 * @returns
 */
async function validatePropertyImage(
  propertyId: string | null,
  dataImageUrl?: string
): Promise<ActionSubmissionResult<string | undefined>> {
  try {
    // delete unused image
    const savedPropertyImage = propertyId
      ? await prisma.property.findFirst({
          where: {
            id: propertyId,
            name: {
              startsWith: process.env.SUPABASE_URL,
            },
          },
          select: {
            name: true,
          },
        })
      : null

    if (!dataImageUrl) {
      console.log(
        'case 1: there is no image provided, delete saved property image'
      )
      // case 1: there is no image provided, delete saved property image
      if (savedPropertyImage?.name) {
        await deletePropertyImage(savedPropertyImage.name)
      }
      return { status: 'success', data: undefined }
    } else if (dataImageUrl.startsWith(process.env.SUPABASE_URL!)) {
      console.log("ase 2: image doesn't not changed")
      // case 2: image doesn't not changed
      return { status: 'success', data: dataImageUrl }
    } else {
      console.log('case 3: a new base 64 image was uploaded')
      // case 3: a new base 64 image was uploaded
      const imageType = dataImageUrl.slice(5, dataImageUrl.indexOf(';'))
      const imageFile = base64ToFile(
        dataImageUrl,
        `property-image.${imageType.slice('image/'.length)}`
      )
      const imgValidation = imageSchema.safeParse(imageFile)
      if (imgValidation.error) {
        return {
          status: 'error',
          errors: imgValidation.error.errors.map((e) => ({
            ...e,
            path: ['name'],
          })),
        }
      }

      if (savedPropertyImage?.name) {
        await deletePropertyImage(savedPropertyImage.name)
      }
      // upload image to supabase bucket
      const urlImage = await uploadImgToStorage(imageFile)
      return { status: 'success', data: urlImage }
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
/**
 * upload image file to supabase and return the image full url
 * @param imageFile
 * @returns
 */
async function uploadImgToStorage(
  imageFile: File
): Promise<string | undefined> {
  // upload image to supabase bucket
  return uploadImage(imageFile)
}

async function deletePropertyImage(imgUrl: string) {
  return deleteImage(imgUrl)
}

/**
 * get a property by its ID
 * @param param0
 * @returns
 */
export async function fetchOneProperty(id: string) {
  try {
    const user = await isLogged()
    const property = await prisma.property.findUnique({
      where: {
        id,
      },
      select: {
        image: true,
        id: true,
        name: true,
        tagline: true,
        country: true,
        price: true,
        profile: true,
        targetFavorites: !!user,
        description: true,
      },
    })
    return property
  } catch (error) {
    console.error(error)
    throw error
  }
}
