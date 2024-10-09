import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import clsx from "clsx"

interface Props {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any
  label?: string
  placeholder?: string
  defaultValue?: string | number
  error?: string
}
export function InputWithLabel({
  name,
  label,
  placeholder,
  register,
  defaultValue,
  error,
}: Props) {
  return (
    <div className="mb-2">
      <Label
        className={clsx("capitalize", { "text-red-700": error })}
        htmlFor={name}
      >
        {label || name}
      </Label>
      <Input
        id={name}
        type="number"
        placeholder={placeholder}
        {...register}
        defaultValue={defaultValue}
        className={clsx("", { "text-red-700 border-red-700": error })}
      />
      {error && <p className=" text-red-700 text-sm">{error}</p>}
    </div>
  )
}
