import Image from "next/image"
import React from "react"

interface Props {
  profileImage: string
  profileName: string
  creationDate: Date
}
export default function HostInfo({
  profileImage,
  profileName,
  creationDate,
}: Props) {
  return (
    <section className=" mt-3 flex gap-2">
      <Image
        src={profileImage}
        alt={profileName}
        priority
        width="50"
        height="50"
        className=" rounded object-cover w-12 h-12"
      />
      <div className=" flex flex-col  justify-between ">
        <span> Hosted by {profileName}</span>
        <span className=" text-muted-foreground font-light">
          Superhost - {} hosting{" "}
        </span>
      </div>
    </section>
  )
}
