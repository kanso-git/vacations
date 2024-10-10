import { formatQuantity } from "@/utils/fromat"
import React from "react"

interface Props {
  details: {
    bedrooms: number
    baths: number
    guests: number
    beds: number
  }
}
function PropertyDetails({
  details: { bedrooms, baths, guests, beds },
}: Props) {
  return (
    <p className="text-md font-light ">
      <span>{formatQuantity(bedrooms, "bedroom")} &middot; </span>
      <span>{formatQuantity(baths, "bath")} &middot; </span>
      <span>{formatQuantity(guests, "guest")} &middot; </span>
      <span>{formatQuantity(beds, "bed")}</span>
    </p>
  )
}
export default PropertyDetails
