import { redirect } from 'next/navigation'
import ProfileForm from './ProfileForm'
import * as actions from '@/actions'

export default async function ProfilePage() {
  const profile = await actions.getProfile()
  /**
   * Before let user to navigate to profile, perform the below
   * Check if profile exist in our DB, because for newly created user the profile is not defined
   * If the profile doesn't exist redirect the user to create profile route
   */
  if (!profile) {
    redirect('/profile/create')
  }
  return <ProfileForm profile={profile} />
}
