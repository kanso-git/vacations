'use client'

import clsx from 'clsx'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import FavoriteToggleForm from './FavoriteToggleForm'
import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'

import * as actions from '@/actions'
import { useRouter } from 'next/navigation'
import { FaSpinner } from 'react-icons/fa'

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
      <div
        onClick={(e) => {
          e.preventDefault()
          toggleFavorite()
        }}
        className=' relative hover:opacity-80 transition cursor-pointer'
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
      </div>
    </FavoriteToggleForm>
  )
}
