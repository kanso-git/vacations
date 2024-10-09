import { amenities, Amenity } from "@/utils/amenities"
import React, { useEffect, useState } from "react"
import { Label } from "../ui/label"
import { Checkbox } from "../ui/checkbox"

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: any
  defaultValue?: string
}
export default function AmenitiesArea({
  setValue,
  defaultValue = "[]",
}: Props) {
  const [selectedAmenities, setSelectedAmenities] = useState(defaultValue)

  const handleAmenityChange = (a: Amenity) => {
    const _amenities = (JSON.parse(selectedAmenities) as Amenity[]) || []
    const isFound = _amenities?.find((am) => am.name === a.name)

    if (isFound) {
      const t = _amenities.filter((am) => am.name !== a.name)
      setSelectedAmenities(JSON.stringify(t))
    } else {
      _amenities.push({
        name: a.name,
        icon: a.icon,
        selected: true,
      })
      setSelectedAmenities(JSON.stringify(_amenities))
    }
  }

  useEffect(() => {
    setValue("amenities", selectedAmenities)
    return () => {
      //second
    }
  }, [selectedAmenities, setValue])

  console.log(`selectedAmenities:`, selectedAmenities)
  return (
    <div className="mb-2">
      <div className="grid grid-cols-2 gap-4">
        {amenities.map((a) => (
          <div key={a.name} className="gap-2 flex items-center">
            <Checkbox
              className="w-4 h-4 text-primary"
              checked={selectedAmenities.includes(a.name)}
              onClick={() => handleAmenityChange(a)}
            />
            <Label onClick={() => handleAmenityChange(a)}>{a.name}</Label>
            <a.icon></a.icon>
          </div>
        ))}
      </div>
    </div>
  )
}
