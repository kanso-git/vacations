import countries from "world-countries"

interface MyCountry {
  code: string
  name: string
  flag: string
  location: [number, number]
}

export function getCountryByCode(code: string): MyCountry | undefined {
  return getFormattedCountries().find((c) => c.code === code)
}

export function getFormattedCountries(): MyCountry[] {
  return countries.map((country) => ({
    code: country.cca3,
    name: country.name.common,
    flag: country.flag,
    location: country.latlng,
  }))
}
