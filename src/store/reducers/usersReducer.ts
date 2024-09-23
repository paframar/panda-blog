import {
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  INIT_USERS,
} from '../actions/usersActions'
import { PayloadAction } from '@reduxjs/toolkit'

import { User } from '../../interfaces/interfaces'


export default function usersReducer(
  state: User[]=[],
  action: PayloadAction<User[] | User | number>
) {
  switch (action.type) {
    case INIT_USERS:
      const users = action.payload as User[]
      return [...users]
    case CREATE_USER:
      const user = action.payload as User
      return [...state, user]
    case UPDATE_USER:
      const editedUser = action.payload as User
      return state.map((user) =>
        user.id === editedUser.id ? editedUser : user
      )
    case DELETE_USER:
      const userId = action.payload as number
      return state.filter((user) => user.id !== userId)
    default:
      return state
  }
}
