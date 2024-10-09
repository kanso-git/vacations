import clsx from 'clsx'
import { FaStar } from 'react-icons/fa'

interface Props {
  propertyId: string
  inPage: boolean
}

export default function PropertyRating({ inPage }: Props) {
  // for testing
  const rating = 4.7
  const count = 100

  return (
    <span
      className={clsx(
        ' flex gap-1 items-center',
        inPage ? 'text-sm' : 'text-xs'
      )}
    >
      <FaStar className='w-3 h-3' />
      {rating} ({count}){inPage && (count > 1 ? 'reviews' : 'review')}
    </span>
  )
}
