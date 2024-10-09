import { PropertyCardProps } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { formatCurrency } from '@/utils/fromat'
import FavoriteToggleButton from './FavoriteToggleButton'
import PropertyRating from './PropertyRating'
import CountryFlagAndName from './CountryFlagAndName'
interface Props {
  property: PropertyCardProps
  isFavorite: boolean
}
export default function PropertyCard({ property, isFavorite }: Props) {
  return (
    <article className='group relative'>
      <Link href={`/properties/${property.id}`}>
        <div className=' relative h-[300px] mb-2 overflow-hidden rounded-md'>
          <Image
            src={property.image}
            fill
            sizes='(max-width:768px) 100vw, 50vw'
            alt={property.name}
            className=' rounded-md object-cover transform group-hover:scale-110 transition-transform duration-500'
          />
        </div>
        <div className='flex justify-between items-center'>
          <h3 className=' text-sm font-semibold mt-1'>
            {property.name.substring(0, 30)}
          </h3>
          {/** property rating */}
          <PropertyRating propertyId={property.id} inPage={false} />
        </div>
        <p className=' text-sm text-muted-foreground mt-1'>
          {property.tagline.substring(0, 40)}
        </p>
        <div className=' flex justify-between items-center mt-1'>
          <p className='text-sm mt-1'>
            <span className=' font-semibold'>
              {formatCurrency(property.price)}
            </span>
            &nbsp; night
          </p>
          <p className='text-sm mt-1'>
            <CountryFlagAndName code={property.country} />
          </p>
        </div>
      </Link>
      <div className='absolute top-5 right-5 z-5'>
        <FavoriteToggleButton
          propertyId={property.id}
          isFavorite={isFavorite}
        />
      </div>
    </article>
  )
}
