import { LuUser2 } from "react-icons/lu"

import Image from "next/image"

interface Props {
  profileImage: string | null
}
export default function UserIcon({ profileImage }: Props) {
  return profileImage ? (
    <Image
      width={24}
      height={24}
      className="w-6 h-6 bg-primary rounded-full text-white"
      src={profileImage}
      alt="Profile image"
    />
  ) : (
    <LuUser2 className="w-6 h-6 bg-primary rounded-full text-white" />
  )
}
