import * as actions from '@/actions'
import DeleteBtnIcon from './DeleteIcon'

export default function DeleteIcon({
  propertyId,
  clerkId,
}: {
  propertyId: string
  clerkId: string
}) {
  return (
    <div className='bg-white  absolute right-1 top-1 cursor-pointer'>
      <form action={actions.deleteOneReview}>
        <input
          type='hidden'
          name='propertyId'
          id='propertyId'
          value={propertyId}
        />
        <input type='hidden' name='clerkId' id='clerkId' value={clerkId} />
        <DeleteBtnIcon />
      </form>
    </div>
  )
}
