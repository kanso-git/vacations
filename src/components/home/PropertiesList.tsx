import { PropertyCardProps } from '@/types'
import EmptyList from './EmptyList'
import PropertyCard from '../card/PropertyCard'

interface Props {
  data: PropertyCardProps[]
  favoriteProperties: { propertyId: string }[]
}
export default function PropertiesList({ data, favoriteProperties }: Props) {
  if (data.length === 0) {
    return (
      <EmptyList
        heading='No results'
        message='Try changing or removing some of your filters.'
        btnText='Clear Filters'
      />
    )
  }
  return (
    <div className='mt-10 gap-8 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 w-full  border'>
      {data.map((p) => (
        <PropertyCard
          key={p.id}
          property={p}
          isFavorite={!!favoriteProperties.find((lp) => lp.propertyId === p.id)}
        />
      ))}
    </div>
  )
}
