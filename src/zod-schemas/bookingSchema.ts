import { z } from 'zod'

export const bookingSchema = z.object({
  totalNights: z.number(),
  cleaningFee: z.number(),
  serviceFee: z.number(),
  tax: z.number(),
  checkIn: z.date(),
  checkOut: z.date(),
  propertyId: z.string(),
  orderTotal: z.number(),
})

export type BookingSchema = z.infer<typeof bookingSchema>
