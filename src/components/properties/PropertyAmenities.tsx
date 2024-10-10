import { Amenity } from "@/utils/amenities"
import React from "react"
import Title from "./Title"
import { LuFolderCheck } from "react-icons/lu"

type AmenityOnly = Omit<Amenity, "icon">
export default function PropertyAmenities({
  amenities,
}: {
  amenities: string
}) {
  const amenitiesArr = amenities ? JSON.parse(amenities) : []
  return (
    <section className="mt-4">
      <Title text="What this place offers" />
      <div className="grid grid-cols-2 gap-4">
        {amenitiesArr.map((a: AmenityOnly) => (
          <div key={a.name} className=" flex gap-2 items-center">
            <LuFolderCheck className="h-6 w-6 text-primary" />
            <p className=" capitalize  text-sm font-light text-muted-foreground">
              {a.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
