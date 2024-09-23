import { Post } from '../../interfaces/interfaces'

export const CREATE_POST = 'create/post'
export const INIT_POSTS = 'set/post'
export const UPDATE_POST = 'update/post'
export const DELETE_POST = 'delete/post'

export const createPostAction = (post: Post) => {
  return {
    type: CREATE_POST,
    payload: post,
  }
}

export const initPostsAction = (posts: Post[]) => ({
  type: INIT_POSTS,
  payload: posts,
})

export const updatePostAction = (post: Post) => ({
  type: UPDATE_POST,
  payload: post,
})

export const deletePostAction = (postId: number) => ({
  type: DELETE_POST,
  payload: postId,
})
