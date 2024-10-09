'use server'

import { currentUser, User } from '@clerk/nextjs/server'

/**
 * Returns the logged user or throw an error if user is not logged in
 * @returns
 */
export async function getLoggedUser(): Promise<User> {
  try {
    const _user = await currentUser()
    if (!_user) {
      throw new Error('User not logged in')
    }
    return _user
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 *  Returns connected user if user is logged and null if not logged
 * @returns
 */
export async function isLogged(): Promise<null | User> {
  try {
    return await currentUser()
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 * check if user has completed his profile
 * TODO change publicMetadata to privateMetadata
 * @returns
 */
export async function hasProfile(): Promise<boolean> {
  try {
    const user = await getLoggedUser()
    const _hasProfile = user.publicMetadata.hasProfile ? true : false
    return _hasProfile
  } catch (error) {
    console.error(error)
    throw error
  }
}
