import clsx from 'clsx'
import { FaStar } from 'react-icons/fa'
import * as actions from '@/actions'

interface Props {
  propertyId: string
  inPage: boolean
}

export default async function PropertyRating({ inPage, propertyId }: Props) {
  const { rating, count } = await actions.fetchPropertyRating(propertyId)
  if (count === 0) return null
  return (
    <span
      className={clsx(
        ' flex gap-1 items-center',
        inPage ? 'text-sm' : 'text-xs'
      )}
    >
      <FaStar className='w-3 h-3' />
      {rating} ({count}){inPage && (count > 1 ? ' reviews' : ' review')}
    </span>
  )
}
