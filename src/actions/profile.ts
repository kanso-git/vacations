"use server"

import prisma from "@/utils/db"
import { clerkClient } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

import { ActionSubmissionResult } from "@/types"
import {
  imageSchema,
  profileSchema,
  ProfileSchema,
  updateSchema,
  UpdateSchema,
} from "@/zod-schemas/profileSchema"
import { getLoggedUser, hasProfile, isLogged } from "./clerk-utils"
import { Prisma, Profile } from "@prisma/client"
import { deleteImage, uploadImage } from "@/utils/supabase"
import { base64ToFile } from "@/lib/utils"

export async function getProfile(): Promise<Profile | null> {
  try {
    const user = await getLoggedUser()
    return prisma.profile.findFirst({
      where: {
        clerkId: user.id,
      },
    })
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function saveProfile(
  data: ProfileSchema
): Promise<ActionSubmissionResult<string>> {
  try {
    const user = await getLoggedUser()
    // check if user profile already in our db
    const isProfileCompleted = await hasProfile()
    if (!isProfileCompleted) {
      console.log(`[saveProfile] create the profile in our db`)
      const validated = profileSchema.safeParse(data)
      if (validated.error) {
        return { status: "error", errors: validated.error.errors }
      }

      const profileData: Prisma.ProfileCreateInput = {
        clerkId: user.id,
        firstName: validated.data.firstName,
        lastName: validated.data.lastName,
        username: validated.data.username,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl,
      }

      await prisma.profile.create({
        data: profileData,
      })

      await clerkClient.users.updateUserMetadata(user.id, {
        publicMetadata: {
          hasProfile: true,
        },
      })
      return { status: "success", data: "Profile has been created" }
    } else {
      console.log(`[saveProfile] profile already exist in our db`)
      return { status: "success", data: "Profile exist already" }
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 *
 * @param data
 * @returns
 */
export async function updateProfile(
  data: UpdateSchema
): Promise<ActionSubmissionResult<string>> {
  try {
    console.log(`[updateProfile] update the profile in our db `)
    const user = await getLoggedUser()
    const validated = updateSchema.safeParse(data)
    if (validated.error) {
      return { status: "error", errors: validated.error.errors }
    }

    const imgValidation = await validateProfileImage(
      user.id,
      validated.data.profileImage
    )
    // if provided image doesn't conform
    if (imgValidation.status === "error") {
      return imgValidation
    }
    const profileData: Prisma.ProfileUpdateInput = {
      firstName: validated.data.firstName,
      lastName: validated.data.lastName,
      username: validated.data.username,
      profileImage: imgValidation.data,
    }

    await prisma.profile.update({
      data: profileData,
      where: {
        clerkId: user.id,
      },
    })

    revalidatePath("/")
    return { status: "success", data: "Profile has been updated" }
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 * Returns the  profile image for the logged user, if user is not logged return null
 * @returns
 */
export async function getProfileImage(): Promise<string | null> {
  const logged = await isLogged()
  let imgUrl: null | string = null
  if (logged) {
    const user = await getLoggedUser()
    const data = await prisma.profile.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        profileImage: true,
      },
    })

    imgUrl = data ? data.profileImage : null
  }
  return imgUrl
}

/**
 * Used to validate the uploaded image if any
 * @param clerkUserId
 * @param dataImageUrl
 * @returns
 */
async function validateProfileImage(
  clerkUserId: string,
  dataImageUrl?: string
): Promise<ActionSubmissionResult<string | undefined>> {
  try {
    // delete unused image
    const savedProfileImage = await prisma.profile.findFirst({
      where: {
        clerkId: clerkUserId,
        profileImage: {
          startsWith: process.env.SUPABASE_URL,
        },
      },
      select: {
        profileImage: true,
      },
    })
    if (!dataImageUrl) {
      console.log(` validateProfileImage case 1`)
      // case 1: there is no image provided, delete saved profile image
      if (savedProfileImage?.profileImage) {
        await deleteImage(savedProfileImage.profileImage)
      }
      return { status: "success", data: undefined }
    } else if (dataImageUrl.startsWith(process.env.SUPABASE_URL!)) {
      console.log(` validateProfileImage case 2`)
      // case 2: image doesn't not changed
      return { status: "success", data: dataImageUrl }
    } else {
      console.log(` validateProfileImage case 3`)
      // case 3: a new base 64 image was uploaded
      const imageType = dataImageUrl.slice(5, dataImageUrl.indexOf(";"))
      const imageFile = base64ToFile(
        dataImageUrl,
        `profile-image.${imageType.slice("image/".length)}`
      )
      const imgValidation = imageSchema.safeParse(imageFile)
      if (imgValidation.error) {
        return {
          status: "error",
          errors: imgValidation.error.errors.map((e) => ({
            ...e,
            path: ["profileImage"],
          })),
        }
      }

      if (savedProfileImage?.profileImage) {
        console.log(
          `deleteImage supabase item url:${savedProfileImage.profileImage}`
        )
        await deleteImage(savedProfileImage.profileImage)
      }
      // upload image to supabase bucket
      const urlImage = await uploadImage(imageFile)
      return { status: "success", data: urlImage }
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
