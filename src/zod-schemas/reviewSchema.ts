import { z } from "zod"

export const reviewSchema = z.object({
  text: z.string().min(2),
  rate: z.number(),
  propertyId: z.string(),
})

export type ReviewSchema = z.infer<typeof reviewSchema>
