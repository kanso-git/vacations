import { createClient } from "@supabase/supabase-js"

const bucket = "home-away-draft"

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
)

export const uploadImage = async (image: File) => {
  try {
    console.log(`uploadImage  image:`, image)
    const timestamp = Date.now()
    // const newName = `/users/${timestamp}-${image.name}`;
    const newName = `${timestamp}-${image.name}`

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(newName, image, {
        cacheControl: "3600",
      })
    if (!data) {
      console.error(error)
      throw new Error("Image upload failed, check log for more details")
    }
    return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl
  } catch (error) {
    console.error(`Image upload failed,imageName:${image.name}`)
    console.error(error)
  }
}

export const deleteImage = async (imageFile: string) => {
  const filename = imageFile.split("/").pop()
  const { data, error } = await supabase.storage
    .from(bucket)
    .remove([filename!])
  if (!data) {
    console.error(error)
    throw new Error("Image delete failed, check log for more details")
  }
}
