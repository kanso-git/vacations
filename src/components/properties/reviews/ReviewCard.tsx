import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import clsx from 'clsx'
import { FaStar } from 'react-icons/fa'
import { Card } from '@/components/ui/card'
import { auth } from '@clerk/nextjs/server'
import DeleteIconForm from './DeleteIconForm'
interface Props {
  image: string
  name: string
  text: string
  rate: number
  propertyId: string
  clerkId: string
}

const getRateNode = (v: number) => {
  const stars = [1, 2, 3, 4, 5].map((r) => ({ filled: r <= v }))
  return stars.map((v, i) => (
    <FaStar
      size={14}
      key={i}
      className={clsx('', { 'text-primary': v.filled })}
    ></FaStar>
  ))
}

export default function ReviewCard({
  image,
  name,
  rate,
  text,
  propertyId,
  clerkId,
}: Props) {
  const authObj = auth()
  return (
    <>
      <Card className=' flex gap-4 items-center p-4 relative'>
        <Avatar className=' w-16 h-16'>
          <AvatarImage src={image} alt={name} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className=' flex flex-col justify-center h-16  '>
          <p className='flex items-center gap-1'>
            <span className=' font-semibold'>{name}</span>
            <span>&nbsp;</span>
            {getRateNode(rate)}
          </p>
          <p>{text}</p>
        </div>

        {authObj && authObj.userId === clerkId && (
          <DeleteIconForm propertyId={propertyId} clerkId={clerkId} />
        )}
      </Card>
    </>
  )
}
