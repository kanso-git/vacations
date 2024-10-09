import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "../ui/label"
import clsx from "clsx"
import { getFormattedCountries } from "@/utils/countries"

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: any
  label?: string
  placeholder?: string
  defaultValue?: string
  error?: string
}

export function CountryInput({ label, setValue, defaultValue, error }: Props) {
  function onCountryChange(c: string) {
    setValue("country", c)
  }

  React.useEffect(() => {
    setValue("country", defaultValue || getFormattedCountries()[0].code)
    return () => {
      //
    }
  }, [setValue, defaultValue])

  return (
    <div className="mb-2">
      <Label className={clsx("capitalize", { "text-red-700": error })}>
        {label}
      </Label>
      <Select
        defaultValue={defaultValue || getFormattedCountries()[0].code}
        onValueChange={onCountryChange}
        name="country"
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a country" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select a country</SelectLabel>

            {getFormattedCountries().map((c) => (
              <SelectItem key={c.code} value={c.code}>
                <div className="flex gap-2 items-center">
                  <label> {c.flag}</label>
                  <label> {c.name}</label>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
