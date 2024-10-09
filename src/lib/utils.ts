import { clsx, type ClassValue } from "clsx"
import { FieldValues, Path, UseFormSetError } from "react-hook-form"
import { twMerge } from "tailwind-merge"
import { ZodIssue } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function handleFormServerErrors<T extends FieldValues>(
  errors: string | ZodIssue[],
  setError: UseFormSetError<T>
) {
  if (typeof errors === "string") {
    setError(`root.serverError`, { message: errors })
  } else {
    errors.forEach((err) => {
      const name = err.path[0] as Path<T>
      setError(name, { message: err.message })
    })
  }
}

export function base64ToFile(base64String: string, fileName: string): File {
  // Split the base64 string to remove the data URL part (if present)
  const arr = base64String.split(",")
  const mime = arr[0].match(/:(.*?);/)?.[1] || ""
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  // Create a new File object using the binary data
  return new File([u8arr], fileName, { type: mime })
}
