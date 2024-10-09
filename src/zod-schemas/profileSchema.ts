import { z } from "zod"

export const profileSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  username: z.string().min(3),
})

export const updateSchema = profileSchema.and(
  z.object({
    profileImage: z.string().optional(),
  })
)
export type ProfileSchema = z.infer<typeof profileSchema>
export type UpdateSchema = z.infer<typeof updateSchema>

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3 // 3MB
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/svg+xml",
]

export const imageSchema = z
  .instanceof(File)
  .optional()
  .refine((file) => {
    return !file || file.size <= MAX_UPLOAD_SIZE
  }, "File size must be less than 3MB")
  .refine((file) => {
    return !file || ACCEPTED_FILE_TYPES.includes(file.type)
  }, "File must be a PNG")

export type ImageSchema = z.infer<typeof imageSchema>
