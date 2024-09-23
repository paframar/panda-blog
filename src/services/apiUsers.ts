import { JSON_PLACEHOLDER_URL } from './constants'
import { User } from '../interfaces/interfaces'
import { generateNumericId } from '../utils/helpers'

export async function createUserService(
  userData: Omit<User, 'id'>
): Promise<User> {
  const id = generateNumericId()

  try {
    const response = await fetch(`${JSON_PLACEHOLDER_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        ...userData,
      }),
    })

    if (!response.ok) throw new Error()

    const data: User = await response.json()

    return data
  } catch (error) {
    throw error
  }
}

export async function readUserService(): Promise<User[]> {
  try {
    const response = await fetch(`${JSON_PLACEHOLDER_URL}/users`)
    if (!response.ok)
      throw new Error('readUserService: Error al fetchear users.')
    const data = response.json()
    return data
  } catch (error) {
    console.error('Error readUserService.', error)
    throw error
  }
}

export async function updateUserService(user: User) {
  const { id } = user
  try {
    const response = await fetch(`${JSON_PLACEHOLDER_URL}/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    if (!response.ok) throw new Error()

    const data: User = await response.json()
    return data
  } catch (error) {
    throw error
  }
}

export async function deleteUserService(userId: User['id']) {
  try {
    const response = await fetch(`${JSON_PLACEHOLDER_URL}/users/${userId}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error()
  } catch (error) {
    throw error
  }
}
