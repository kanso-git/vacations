import * as actions from '@/actions'
import PropertyDisplay from './PropertyDisplay'

interface Props {
  params: {
    id: string
  }
}
export default async function PropertyEditPage({ params: { id } }: Props) {
  const propertyData = await actions.fetchOneProperty(id)
  if (propertyData) return <PropertyDisplay data={propertyData} />
  return <></>
}
