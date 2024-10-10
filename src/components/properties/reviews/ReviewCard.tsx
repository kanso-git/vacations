import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import clsx from "clsx"
import { FaStar } from "react-icons/fa"
import { Card } from "@/components/ui/card"
interface Props {
  image: string
  name: string
  text: string
  rate: number
}

const getRateNode = (v: number) => {
  const stars = [1, 2, 3, 4, 5].map((r) => ({ filled: r <= v }))
  return stars.map((v, i) => (
    <FaStar
      size={14}
      key={i}
      className={clsx("", { "text-primary": v.filled })}
    ></FaStar>
  ))
}

export default function ReviewCard({ image, name, rate, text }: Props) {
  return (
    <Card className=" flex gap-4 items-center p-8">
      <Avatar>
        <AvatarImage src={image} alt={name} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className=" flex flex-col ">
        <p className="flex items-center gap-1">
          <span className=" font-semibold">{name}</span>
          <span>&nbsp;</span>
          {getRateNode(rate)}
        </p>
        <p>{text}</p>
      </div>
    </Card>
  )
}
