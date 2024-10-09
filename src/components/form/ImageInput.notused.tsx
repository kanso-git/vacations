import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import clsx from 'clsx'
import { UseFormRegisterReturn } from 'react-hook-form'

interface Props {
  name: string
  register: UseFormRegisterReturn
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: any
  label?: string
  placeholder?: string
  defaultValue?: string
  error?: string
}
export function ImageInput({
  name,
  label,
  placeholder,
  register,
  setValue,
  defaultValue,
  error,
}: Props) {
  return (
    <div className='mb-2'>
      <Label
        className={clsx('capitalize', { 'text-red-700': error })}
        htmlFor={name}
      >
        {label || name}
      </Label>
      <Input
        type='file'
        placeholder={placeholder}
        {...register}
        defaultValue={defaultValue}
        className={clsx('max-w-xs', { 'text-red-700 border-red-700': error })}
        onChange={(e) => {
          const reader = new FileReader()

          reader.onabort = () => console.log('file reading was aborted')
          reader.onerror = () => console.log('file reading has failed')
          reader.onload = () => {
            // Do whatever you want with the file contents
            const binaryStr = reader.result
            setValue('profileImage', binaryStr, {
              shouldValidate: true,
            })
            setValue(name, '')
          }
          reader.readAsDataURL(e.target.files![0])

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
    </div>
  )
}
