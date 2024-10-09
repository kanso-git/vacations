import { SearchRental } from '@/types'
import PropertiesList from './PropertiesList'
import PaginationBar from './PaginationBar'
import * as actions from '@/actions'

interface Props {
  searchParams: SearchRental
  screen?: 'home' | 'favorite'
}

export default async function PropertiesContainerPage({
  searchParams,
  screen,
}: Props) {
  const data = await actions.fetchProperties(searchParams, screen)
  const favoriteProperties = await actions.getFavoriteProperties()
  return (
    <>
      <PropertiesList
        data={data.properties}
        favoriteProperties={favoriteProperties}
      />
      <PaginationBar results={data?.count || 0} />
    </>
  )
}
