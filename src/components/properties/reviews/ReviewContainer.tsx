import React from "react"
import * as actions from "@/actions"
import ReviewCard from "./ReviewCard"

interface Props {
  screen: "property" | "profile"
  id: string
}
export default async function ReviewContainer({ screen, id }: Props) {
  const reviews = await actions.fetchReviews(screen, id)
  return (
    <section className="mt-4 grid grid-cols-2 gap-4">
      {reviews.length > 0 ? (
        reviews.map((r) => (
          <ReviewCard
            name={r.target.name}
            rate={r.rate}
            text={r.text}
            key={r.target.id}
            image={r.target.image}
          />
        ))
      ) : (
        <>There is no reviews so far !!</>
      )}
    </section>
  )
}
