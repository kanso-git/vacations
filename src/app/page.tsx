import SearchBarContent from '@/components/home/SearchBar'
import { Suspense } from 'react'
import PropertiesContainerPage from '@/components/home/PropertiesContainer'
import { SearchRental } from '@/types'
import LoadingCard from '@/components/card/LoadingCard'

interface Props {
  searchParams: SearchRental
}

export default function HomePge({ searchParams }: Props) {
  return (
    <div>
      <SearchBarContent />
      <Suspense fallback={<LoadingCard />}>
        <PropertiesContainerPage searchParams={searchParams} />
      </Suspense>
    </div>
  )
}
