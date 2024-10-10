import Image from "next/image"
import React from "react"

interface Props {
  imageUrl: string
  name: string
}
export default function ImageViewer({ imageUrl, name }: Props) {
  return (
    <section className="h-[300px] md:h-[500px] relative mt-8">
      <Image
        src={imageUrl}
        fill
        sizes="100vw"
        alt={name}
        className=" object-cover rounded-md"
        priority
      />
    </section>
  )
}
