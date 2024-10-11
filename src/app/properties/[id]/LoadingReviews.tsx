import { Card } from '@/components/ui/card'
import { FaUserCircle } from 'react-icons/fa'

export default function LoadingReviews() {
  return (
    <section className='mt-4 grid grid-cols-2 gap-4'>
      {[1, 2, 3, 4].map((v) => (
        <Card key={v} className=' animate-pulse flex gap-4 items-center p-8'>
          <FaUserCircle className='h-12 w-12  opacity-40' />
          <div className=' flex flex-col '>
            <p className='flex items-center gap-1'>
              <span className='bg-primary h-3 w-24  opacity-40'></span>
              <span>&nbsp;</span>
              <span className='bg-primary h-3 w-24  opacity-40'></span>
            </p>
            <p className='bg-primary h-3 w-36  opacity-40'></p>
          </div>
        </Card>
      ))}
    </section>
  )
}
