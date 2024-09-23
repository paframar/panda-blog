import { JSON_PLACEHOLDER_URL } from './constants'
import { Post } from '../interfaces/interfaces'
import { generateNumericId } from '../utils/helpers'

export async function createPostService(
  postData: Omit<Post, 'id'>
): Promise<Post> {
  const id = generateNumericId()

  try {
    const response = await fetch(`${JSON_PLACEHOLDER_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        ...postData,
      }),
    })

    if (!response.ok) throw new Error()

    const data: Post = await response.json()
    return data
  } catch (error) {
    throw error
  }
}

export async function readPostService(): Promise<Post[]> {
  try {
    const response = await fetch(`${JSON_PLACEHOLDER_URL}/posts`)
    if (!response.ok)
      throw new Error('readPostService: Error al fetchear posts.')
    const data = response.json()
    return data
  } catch (error) {
    console.error('Error readPostService.', error)
    throw error
  }
}

export async function updatePostService(post: Post): Promise<Post> {
  const { id } = post
  try {
    const response = await fetch(`${JSON_PLACEHOLDER_URL}/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(post),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    if (!response.ok) throw new Error()

    const data: Post = await response.json()
    return data
  } catch (error) {
    throw error
  }
}

export async function deletePostService(postId: Post['id']) {
  try {
    const response = await fetch(`${JSON_PLACEHOLDER_URL}/posts/${postId}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error()
  } catch (error) {
    throw error
  }
}
