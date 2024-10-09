import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Input } from '../ui/input'
import { imageSchema } from '@/zod-schemas/profileSchema'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

interface Props {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setError: any

  defaultValue?: string | StaticImport
  label?: string
  value: string
  error?: string
}
export function ImageView({
  name,
  setValue,
  defaultValue,
  error,
  value,
  setError,
}: Props) {
  const imgPickerRef = useRef<HTMLInputElement | null>(null)

  const [imageUrl, setImageUrl] = useState(value)
  const openImagePicker = () => {
    if (imgPickerRef.current) {
      imgPickerRef.current.click()
    }
  }

  useEffect(() => {
    setValue(name, value)
  }, [setValue, name, value])

  return (
    <div className='mb-2'>
      <Image
        onClick={openImagePicker}
        alt='Profile Image'
        src={imageUrl || defaultValue || ''}
        width={128}
        height={128}
        className='w-32 h-32 object-cover border rounded-xl'
        onLoad={() => {
          if (value && value.startsWith('blob')) {
            URL.revokeObjectURL(value)
          }
        }}
      />

      <Input
        ref={imgPickerRef}
        className=' hidden'
        type='file'
        onChange={(e) => {
          const reader = new FileReader()

          reader.onabort = () => console.log('file reading was aborted')
          reader.onerror = () => console.log('file reading has failed')
          reader.onload = () => {
            // Do whatever you want with the file contents
            const binaryStr = reader.result

            setValue(name, binaryStr, {
              shouldValidate: true,
            })
            setImageUrl(binaryStr as string)
          }
          // validate image on client side
          const validImg = imageSchema.safeParse(e.target.files![0])
          if (validImg.error) {
            const messages = validImg.error.errors.flatMap((f) => f.message)
            setError(name, {
              message: messages.join(', '),
            })
            setTimeout(() => {
              setError(name, {
                message: null,
              })
              setValue(name, imageUrl, {
                shouldValidate: true,
              })
            }, 3000)
          } else if (e.target.files && e.target.files.length > 0) {
            console.log(e.target.files![0])
            reader.readAsDataURL(e.target.files![0])
          }

          /*
          const previewUrl = URL.createObjectURL(e.target.files![0])
          console.log(previewUrl)
          setValue("profileImage", previewUrl, {
            shouldValidate: true,
          })
            */
        }}
      />
      {error && <p className=' text-red-700 text-sm'>{error}</p>}
      <div
        className='absolute  w-32 h-32 object-cover  rounded-xl bg-transparent opacity-0  -mt-32  text-center  justify-center items-center flex z-10 hover:opacity-100 cursor-pointer'
        onClick={openImagePicker}
      >
        <p className=' font-semibold text-primary '> Edit</p>
      </div>
    </div>
  )
}
