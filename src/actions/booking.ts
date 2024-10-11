'use server'

import { ActionSubmissionResult } from '@/types'
import { bookingSchema, BookingSchema } from '@/zod-schemas/bookingSchema'
import { Booking } from '@prisma/client'
import { getLoggedUser } from './clerk-utils'
import prisma from '@/utils/db'

export async function createOneBooking(
  data: BookingSchema
): Promise<ActionSubmissionResult<Booking>> {
  try {
    const user = await getLoggedUser()
    /**
     * validate the data
     */
    const validated = bookingSchema.safeParse(data)
    if (validated.error) {
      return { status: 'error', errors: validated.error.errors }
    }

    const booking = await prisma.booking.create({
      data: {
        propertyId: data.propertyId,
        totalNights: data.totalNights,
        orderTotal: data.orderTotal,
        checkIn: data.checkIn.toISOString(),
        checkOut: data.checkOut.toISOString(),
        clerkId: user.id,
      },
    })
    return { status: 'success', data: booking }
  } catch (error) {
    console.error(error)
    return { status: 'error', errors: 'something went wrong' }
  }
}

/**
 *
 * @param propertyId
 * @returns
 */
export async function getBookingHistoryByProperty(propertyId: string) {
  try {
    return prisma.booking.findMany({
      select: {
        checkIn: true,
        checkOut: true,
      },
      where: {
        propertyId,
        checkOut: {
          gte: new Date(),
        },
      },
      orderBy: {
        checkOut: 'asc',
      },
    })
  } catch (error) {
    console.error(error)
    throw error
  }
}
