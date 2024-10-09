import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import clsx from 'clsx'
import { Button } from '../ui/button'
import { PiMinusBold, PiPlusBold } from 'react-icons/pi'
import { useEffect, useState } from 'react'

interface Props {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: any
  label?: string
  description?: string
  placeholder?: string
  defaultValue?: string | number
  error?: string
}
export function AccommodationInput({
  name,
  label,
  description,
  placeholder,
  register,
  setValue,
  defaultValue,
  error,
}: Props) {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    setValue(name, counter)
    return () => {
      //
    }
  }, [counter, setValue, name])

  // set initial value
  useEffect(() => {
    setValue(name, defaultValue)
  }, [defaultValue, name, setValue])

  return (
    <div className='mb-2'>
      <div className=' flex flex-row justify-between items-center border p-8 rounded-xl '>
        <div className=' flex flex-col gap-2'>
          <Label
            className={clsx('capitalize text-2xl', { 'text-red-700': error })}
            htmlFor={name}
          >
            {label || name}
          </Label>

          <Label
            className={clsx(' text-sm text-muted-foreground', {
              'text-red-700': error,
            })}
          >
            {description}
          </Label>
        </div>

        <div className=' flex flex-row items-center'>
          <Button
            type='button'
            variant='outline'
            onClick={() =>
              setCounter((prev) => {
                if (prev > 0) {
                  return prev - 1
                }
                return prev
              })
            }
          >
            <PiMinusBold className=' text-primary w-5 h-5' />
          </Button>
          <Input
            id={name}
            type='text'
            readOnly
            placeholder={placeholder}
            {...register}
            defaultValue={defaultValue}
            className={clsx(
              ' w-14 mx-2 border-none  font-bold text-2xl text-center visible  ',
              {
                'text-red-700 border-red-700': error,
              }
            )}
          />

          <Button
            type='button'
            variant='outline'
            onClick={() => setCounter((prev) => prev + 1)}
          >
            <PiPlusBold className='w-5 h-5 text-primary' />
          </Button>
        </div>

        {error && <p className=' text-red-700 text-sm'>{error}</p>}
      </div>
    </div>
  )
}
