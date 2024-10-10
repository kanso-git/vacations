import PropertyRating from "@/components/card/PropertyRating"
import { BookingCalendar } from "@/components/properties/BookingCalendar"
import BreadCrumbs from "@/components/properties/BreadCrumbs"
import FavoriteToggleButton from "@/components/properties/FavoriteToggleButton"
import HostInfo from "@/components/properties/HostInfo"
import ImageViewer from "@/components/properties/ImageViewer"
import PropertyAmenities from "@/components/properties/PropertyAmenities"
import PropertyDescription from "@/components/properties/PropertyDescription"
import PropertyDetails from "@/components/properties/PropertyDetails"
import ReviewContainer from "@/components/properties/reviews/ReviewContainer"
import ReviewForm from "@/components/properties/reviews/ReviewForm"

import ShareButton from "@/components/properties/ShareButton"

import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Favorite, Profile } from "@prisma/client"

interface Props {
  data: {
    id: string
    name: string
    description: string
    tagline: string
    image: string
    country: string
    price: number
    profile: Profile
    targetFavorites: Favorite[]
    bedrooms: number
    beds: number
    baths: number
    guests: number
    amenities: string
  }
}

import dynamic from "next/dynamic"
export default function PropertyDisplay({ data }: Props) {
  const PropertyMap = dynamic(
    () => import("@/components/properties/PropertyMap"),
    {
      ssr: false,
      loading: () => <Skeleton className="h-[400px] w-full" />,
    }
  )

  return (
    <section>
      <BreadCrumbs name={data.name || ""} />
      <div className=" mt-6 flex justify-between items-center">
        <h1 className=" text-2xl font-semibold mb-8 capitalize">
          {data.description}
        </h1>
        <div className=" flex justify-between gap-2 items-center">
          <ShareButton />
          <FavoriteToggleButton
            propertyId={data.id}
            isFavorite={
              !!data.targetFavorites &&
              !!data.targetFavorites.find((t) => t.propertyId === data.id)
            }
          />
        </div>
      </div>
      <ImageViewer imageUrl={data.image} name={data.name} />
      <section className="lg:grid lg:grid-cols-12 gap-x-12 mt-12">
        <div className=" lg:col-span-8">
          <div className="flex gap-x-4 items-center">
            <h1 className=" text-xl font-bold">{data.name}</h1>
            <PropertyRating inPage propertyId={data.id} />
          </div>
          <PropertyDetails
            details={{
              bedrooms: data.bedrooms,
              baths: data.baths,
              beds: data.beds,
              guests: data.guests,
            }}
          />
          <HostInfo
            profileImage={data.profile.profileImage}
            profileName={data.profile.lastName}
            creationDate={new Date()}
          />
          <Separator className="mt-4" />
          <PropertyDescription description={data.description} />
          <PropertyAmenities amenities={data.amenities} />
          <PropertyMap countryCode={data.country} />
          <ReviewForm propertyId={data.id} />
          <ReviewContainer screen="property" id={data.id} />
        </div>

        <div className=" lg:col-span-4 flex flex-col items-center">
          {/** calendar */}
          <div className="flex w-full  justify-end ">
            <BookingCalendar />
          </div>
        </div>
      </section>
    </section>
  )
}
