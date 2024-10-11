'use client'

import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'
import { FaSpinner } from 'react-icons/fa'
import { ImBin } from 'react-icons/im'

export default function DeleteBtnIcon() {
  const { pending } = useFormStatus()
  return (
    <Button
      size='icon'
      variant='outline'
      className=' shadow-none border-none w-12 h-12 hover:text-primary'
    >
      {pending ? (
        <FaSpinner size={12} className='w-6 h-6 text-primary animate-spin' />
      ) : (
        <ImBin size={12} className='w-6 h-6' />
      )}
    </Button>
  )
}
