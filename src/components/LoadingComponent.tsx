import { FaSpinner } from 'react-icons/fa'

export default function LoadingComponent({ label }: { label?: string }) {
  return (
    <div className=' flex justify-center items-center vertical-center'>
      <FaSpinner className='w-4 h-4 text-primary' /> {label}
    </div>
  )
}
