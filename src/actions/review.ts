"use server"
import prisma from "@/utils/db"
import { Prisma, Profile, Property, Review } from "@prisma/client"
import { getLoggedUser } from "./clerk-utils"
import { reviewSchema, ReviewSchema } from "@/zod-schemas/reviewSchema"
import { ActionSubmissionResult } from "@/types"

type ScreenReview = {
  text: string
  rate: number
  target: {
    id: string
    name: string
    image: string
  }
}
export async function fetchReviews(
  screen: "property" | "profile",
  id: string
): Promise<ScreenReview[]> {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        ...(screen === "property" ? { propertyId: id } : { clerkId: id }),
      },
      select: {
        text: true,
        rate: true,
        ...(screen === "profile"
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
        createdAt: "desc",
      },
    })

    return reviews.length > 0
      ? reviews.map((r: any) => ({
          text: r.text,
          rate: r.rate,
          target: {
            id: screen === "property" ? r.profile.id : r.property.id,
            image:
              screen === "property" ? r.profile.profileImage : r.property.image,
            name:
              screen === "property"
                ? r.profile.firstName + " " + r.profile.lastName
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
    console.log("--------- createOneReview ------ ")
    console.log(data)
    /**
     * validate the data
     */
    const validated = reviewSchema.safeParse(data)
    if (validated.error) {
      return { status: "error", errors: validated.error.errors }
    }

    const review = await prisma.review.create({
      data: {
        ...data,
        clerkId: user.id,
      },
    })
    return { status: "success", data: review }
  } catch (error) {
    console.error(error)
    return { status: "error", errors: "something went wrong" }
  }
}
