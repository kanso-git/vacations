'use client'
import { useResetValues } from '@/zustand/search-store'
import { Button } from '../ui/button'

interface Props {
  heading: string
  message: string
  btnText: string
}
export default function EmptyList({
  heading = 'No items in the list.',
  message = 'Keep exploring our properties',
  btnText = 'back home',
}: Props) {
  const resetValues = useResetValues()
  return (
    <div className='mt-4'>
      <h2 className=' text-xl font-bold'> {heading}</h2>
      <p className='text-lg'>{message}</p>
      <Button className='mt-4 capitalize' size='lg' onClick={resetValues}>
        {btnText}
      </Button>
    </div>
  )
}
