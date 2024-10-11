import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}
export default function ControllerForm({ children }: Props) {
  return (
    <>
      <SignedOut>
        <SignInButton mode='modal'>{children}</SignInButton>
      </SignedOut>
      <SignedIn>{children}</SignedIn>
    </>
  )
}
