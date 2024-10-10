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
import { FaStar } from "react-icons/fa"

const rates = [
  {
    value: 1,
  },
  {
    value: 2,
  },
  {
    value: 3,
  },
  {
    value: 4,
  },
  {
    value: 5,
  },
]
interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: any
  label?: string
  placeholder?: string
  error?: string
}

export function RateInput({ label, setValue, error }: Props) {
  function onRateChange(c: string) {
    setValue("rate", parseInt(c))
  }

  React.useEffect(() => {
    setValue("rate", rates[0].value)
    return () => {
      //
    }
  }, [setValue])

  const getRateNode = (v: number) => {
    const stars = rates.map((r) => ({ filled: r.value <= v }))
    return stars.map((v, i) => (
      <FaStar
        size={14}
        key={i}
        className={clsx("", { "text-primary": v.filled })}
      ></FaStar>
    ))
  }

  return (
    <div className="mb-2">
      <Label className={clsx("capitalize", { "text-red-700": error })}>
        {label}
      </Label>
      <Select
        defaultValue={rates[0].value + ""}
        onValueChange={onRateChange}
        name="rate"
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a rate" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select a rate</SelectLabel>

            {rates.map((c) => (
              <SelectItem key={c.value} value={c.value + ""}>
                <label className="flex gap-2 items-center">
                  {getRateNode(c.value)}
                </label>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
