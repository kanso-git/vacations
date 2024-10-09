import { getCountryByCode } from '@/utils/countries'
import { Label } from '../ui/label'

interface Props {
  code: string
}
export default function CountryFlagAndName({ code }: Props) {
  const country = getCountryByCode(code)
  return (
    <span className=' font-semibold'>
      <Label className=' flex items-center gap-2'>
        {country?.flag} {country?.name}
      </Label>
    </span>
  )
}
