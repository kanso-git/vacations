import ReviewContainer from '@/components/properties/reviews/ReviewContainer'
import Title from '@/components/properties/Title'
import { auth } from '@clerk/nextjs/server'

async function ReviewsPage() {
  const authObj = auth()
  if (!authObj) return null
  return (
    <section>
      <Title text='Your Reviews' />
      <ReviewContainer screen='profile' id={authObj.userId!} />
    </section>
  )
}
export default ReviewsPage
