import { User } from '../../interfaces/interfaces'

export const CREATE_USER = 'create/user'
export const INIT_USERS = 'init/user'
export const UPDATE_USER = 'update/user'
export const DELETE_USER = 'delete/user'

export const initUsersAction = (users: User[]) => {
  return {
    type: INIT_USERS,
    payload: users,
  }
}

export const createUserAction = (user: User) => {
  return {
    type: CREATE_USER,
    payload: user,
  }
}

export const updateUserAction = (user: User) => ({
  type: UPDATE_USER,
  payload: user,
})

export const deleteUserAction = (userId: number) => ({
  type: DELETE_USER,
  payload: userId,
})
