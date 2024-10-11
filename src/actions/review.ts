'use server'
import prisma from '@/utils/db'
import { Review } from '@prisma/client'
import { getLoggedUser, isLogged } from './clerk-utils'
import { reviewSchema, ReviewSchema } from '@/zod-schemas/reviewSchema'
import { ActionSubmissionResult } from '@/types'
import { revalidatePath } from 'next/cache'

type ScreenReview = {
  text: string
  rate: number
  clerkId: string
  propertyId: string
  target: {
    id: string
    name: string
    image: string
  }
}
export async function fetchReviews(
  screen: 'property' | 'profile',
  id: string
): Promise<ScreenReview[]> {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        ...(screen === 'property' ? { propertyId: id } : { clerkId: id }),
      },
      select: {
        text: true,
        rate: true,
        propertyId: true,
        clerkId: true,
        ...(screen === 'profile'
          ? {
              property: {
                select: {
                  id: true,
                  image: true,
                  name: true,
                },
              },
            }
          : {
              profile: {
                select: {
                  id: true,
                  profileImage: true,
                  firstName: true,
                  lastName: true,
                },
              },
            }),
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    console.log(JSON.stringify(reviews, null, 3))
    return reviews.length > 0
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        reviews.map((r: any) => ({
          text: r.text,
          rate: r.rate,
          propertyId: r.propertyId,
          clerkId: r.clerkId,
          target: {
            id: screen === 'property' ? r.profile.id : r.property.id,
            image:
              screen === 'property' ? r.profile.profileImage : r.property.image,
            name:
              screen === 'property'
                ? r.profile.firstName + ' ' + r.profile.lastName
                : r.property.name,
          },
        }))
      : []
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function createOneReview(
  data: ReviewSchema
): Promise<ActionSubmissionResult<Review>> {
  try {
    const user = await getLoggedUser()
    console.log('--------- createOneReview ------ ')
    console.log(data)
    /**
     * validate the data
     */
    const validated = reviewSchema.safeParse(data)
    if (validated.error) {
      return { status: 'error', errors: validated.error.errors }
    }
    const isOwner = await isPropertyOwner(data.propertyId)
    if (isOwner) {
      return { status: 'error', errors: "Owner can't review its owen property" }
    }
    const review = await prisma.review.create({
      data: {
        ...data,
        clerkId: user.id,
      },
    })
    return { status: 'success', data: review }
  } catch (error) {
    console.error(error)
    return { status: 'error', errors: 'something went wrong' }
  }
}

/**
 * check if property Owner
 * @param userId
 * @param propertyId
 * @returns
 */
export async function isPropertyOwner(propertyId: string): Promise<boolean> {
  try {
    const user = await isLogged()
    const owner = user
      ? await prisma.property.findUnique({
          where: {
            id: propertyId,
            profile: {
              clerkId: user.id,
            },
          },
        })
      : false

    return !!owner
  } catch (error) {
    throw error
  }
}

export async function deleteOneReview(fromValues: FormData) {
  try {
    console.log('-------deleteOneReview -------')
    console.log(fromValues)
    const propertyId = fromValues.get('propertyId') as string
    const clerkId = fromValues.get('clerkId') as string

    const user = await getLoggedUser()
    if (user.id === clerkId) {
      return prisma.review.delete({
        where: {
          clerkId_propertyId: {
            propertyId,
            clerkId: user.id,
          },
        },
      })
    } else {
      throw new Error(' You are not allowed to delete this review ')
    }
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    console.log('------- revalidatePath----------------')
    revalidatePath('/reviews')
  }
}
