'use client'
import { MdOutlineShare } from 'react-icons/md'
import { Button } from '../ui/button'

export default function ShareButton() {
  return (
    <Button
      type='button'
      className='w-14 h-14'
      variant='outline'
      onClick={() => {}}
    >
      <MdOutlineShare size={28} className=''></MdOutlineShare>
    </Button>
  )
}
