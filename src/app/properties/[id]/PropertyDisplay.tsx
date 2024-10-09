import BreadCrumbs from '@/components/properties/BreadCrumbs'
import FavoriteToggleButton from '@/components/properties/FavoriteToggleButton'
import ShareButton from '@/components/properties/ShareButton'
import { Favorite, Profile } from '@prisma/client'

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
  }
}
export default function PropertyDisplay({ data }: Props) {
  return (
    <section>
      <BreadCrumbs name={data.name || ''} />
      <div className=' mt-6 flex justify-between items-center'>
        <h1 className=' text-2xl font-semibold mb-8 capitalize'>
          {data.description}
        </h1>
        <div className=' flex justify-between gap-2 items-center'>
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
    </section>
  )
}
