import { FaSpinner } from 'react-icons/fa'
import { Button } from '../ui/button'
import clsx from 'clsx'

interface Props {
  isValid: boolean
  isSubmitting: boolean
  label: string
  onActionLabel: string
}
export default function SubmitBtn({
  isSubmitting,
  isValid,
  label,
  onActionLabel,
}: Props) {
  return (
    <Button disabled={!isValid}>
      <FaSpinner
        className={clsx('mr-2 h-4 w-4 ', {
          'animate-spin': isSubmitting,
          hidden: !isSubmitting,
        })}
      />
      {isSubmitting ? onActionLabel : label}
    </Button>
  )
}
