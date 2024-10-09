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
import { categories } from "@/utils/categories"
import { Label } from "../ui/label"
import clsx from "clsx"

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: any
  label?: string
  placeholder?: string
  defaultValue?: string
  error?: string
}

export function CategoryInput({ label, setValue, defaultValue, error }: Props) {
  function onCategoryChange(c: string) {
    setValue("category", c)
  }

  React.useEffect(() => {
    setValue("category", defaultValue || categories[0].label)
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
        defaultValue={defaultValue || categories[0].label}
        onValueChange={onCategoryChange}
        name="category"
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select a category</SelectLabel>

            {categories.map((c) => (
              <SelectItem key={c.label} value={c.label}>
                <label className="flex gap-2 items-center">
                  <c.icon></c.icon>
                  {c.label}
                </label>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
