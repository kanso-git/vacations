import { Textarea } from "@/components/ui/textarea"
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
export function TextareaInput({
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
      <Textarea
        id={name}
        rows={5}
        placeholder={placeholder}
        {...register}
        defaultValue={defaultValue}
        className={clsx("", { "text-red-700 border-red-700": error })}
      />
      {error && <p className=" text-red-700 text-sm">{error}</p>}
    </div>
  )
}
