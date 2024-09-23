import {
  INIT_POSTS,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
} from '../actions/postsActions'
import { PayloadAction } from '@reduxjs/toolkit'

import { Post } from '../../interfaces/interfaces'

export default function postsReducer(
  state: Post[] = [],
  action: PayloadAction<Post[] | Post | number>
) {
  switch (action.type) {
    case INIT_POSTS:
      const posts = action.payload as Post[]
      return [...posts]
    case CREATE_POST:
      const post = action.payload as Post
      return [post, ...state]
    case UPDATE_POST:
      const editedPost = action.payload as Post
      return state.map((post) =>
        post.id === editedPost.id ? editedPost : post
      )
    case DELETE_POST:
      const postId = action.payload as number
      return state.filter((post) => post.id !== postId)
    default:
      return state
  }
}
