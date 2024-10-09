'use client'

import clsx from 'clsx'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'

import * as actions from '@/actions'
import { useRouter } from 'next/navigation'
import { FaSpinner } from 'react-icons/fa'
import FavoriteToggleForm from '../card/FavoriteToggleForm'
import { Button } from '../ui/button'

interface Props {
  propertyId: string
  isFavorite: boolean
}

export default function FavoriteToggleButton({
  isFavorite,
  propertyId,
}: Props) {
  const [isToggling, setToggling] = useState(false)
  const { refresh } = useRouter()
  const { isSignedIn } = useUser()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  async function toggleFavorite() {
    if (!isSignedIn || isToggling) {
      return null
    } else {
      setToggling(true)
      await actions.toggleFavorite(propertyId)
      refresh()
      setTimeout(() => setToggling(false), 300)
    }
  }
  return !isClient ? (
    <></>
  ) : (
    <FavoriteToggleForm>
      <Button
        type='button'
        className='w-14 h-14 relative hover:opacity-80 transition cursor-pointer'
        variant='outline'
        onClick={(e) => {
          e.preventDefault()
          toggleFavorite()
        }}
      >
        {isToggling ? (
          <FaSpinner size={28} className=' text-primary animate-spin' />
        ) : (
          <>
            <AiOutlineHeart
              size={28}
              className='fill-white absolute -top-[2px] -right-[2px]'
            ></AiOutlineHeart>
            <AiFillHeart
              size={24}
              className={clsx(
                '',
                isFavorite ? 'fill-primary' : 'fill-neutral-500/70'
              )}
            ></AiFillHeart>
          </>
        )}
      </Button>
    </FavoriteToggleForm>
  )
}
