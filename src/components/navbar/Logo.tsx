import { TbTent } from 'react-icons/tb'
import { Button } from '../ui/button'
import Link from 'next/link'
export default function Logo() {
  return (
    <Button size='icon' asChild>
      <Link href='/'>
        <TbTent className='w-6 h-6' />
      </Link>
    </Button>
  )
}
