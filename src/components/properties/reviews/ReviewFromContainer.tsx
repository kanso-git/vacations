import Title from '../Title'
import ReviewForm from './ReviewForm'
import * as actions from '@/actions'
export default async function ReviewFromContainer({
  propertyId,
}: {
  propertyId: string
}) {
  const isOwner = await actions.isPropertyOwner(propertyId)
  return (
    <section className='mt-4'>
      <Title text='What people think about this property?' />
      {!isOwner && <ReviewForm propertyId={propertyId} />}
    </section>
  )
}
