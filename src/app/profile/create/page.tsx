import { redirect } from "next/navigation"
import ProfileForm from "./CreateForm"
import * as actions from "@/actions"
export default async function ProfilePage() {
  /**
   * Whenever a user navigates to this route  we need to:
   *  1 - Check if the user has already completed his profile,
   *  2 - If isCompletedProfile is true then redirect  him to home page else let him complete his profile
   */
  const isCompletedProfile = await actions.hasProfile()
  if (isCompletedProfile) {
    console.log(
      `[ProfilePage] Profile already exist  redirect user to HomePage`
    )
    redirect("/")
  }
  return <ProfileForm />
}
