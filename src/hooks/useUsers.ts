import { useDispatch, useSelector } from 'react-redux'

import { StoreState, User } from '../interfaces/interfaces'
import {
  createUserAction,
  initUsersAction,
  updateUserAction,
  deleteUserAction,
} from '../store/actions/usersActions'

import {
  readUserService,
  createUserService,
  deleteUserService,
  updateUserService,
} from '../services/apiUsers'

import toast from 'react-hot-toast'

import { AppDispatch } from '../store/store'

export default function useUsers() {
  const dispatch = useDispatch<AppDispatch>()
  const users = useSelector((state: StoreState) => state.users)

  const getUserById = (userId: number) => {
    return users.filter((u) => u.id === userId)[0]
  }

  const initUsers = async () => {
    try {
      dispatch(initUsersAction([]))
      const fetchedUsers = await readUserService()
      dispatch(initUsersAction(fetchedUsers))
      toast.success('🫙 Usuarios Inicializados.')
    } catch (error) {
      toast.error('☁️ Se produjo un error al inicializar los usuarios.')
    }
  }

  const createUser = async (userData: User) => {
    try {
      const newUser: User = userData
      dispatch(createUserAction(newUser))
      toast.success(
        `🫙 Usuario #${userData.id} crado en el almacenamiento local.`
      )
      const fakeResponse = await createUserService(newUser)
      toast.success(`☁️ Usuario #${fakeResponse.id} creado en la nube.`)
    } catch (error) {
      toast.error('☁️ Se produjo un error al crexar el usuario.')
    }
  }

  const updateUser = async (post: User) => {
    try {
      dispatch(updateUserAction(post))
      toast.success(
        `🫙 Post #${post.id} actualizado en el almacenamiento local.`
      )
      const fakeResponse = await updateUserService(post)
      toast.success(`☁️ Usuario #${fakeResponse.id} actualizado en la nube.`)
    } catch (error) {
      toast.error('☁️ Este usuario no ha sido actualizado en la nube.')
    }
  }

  const deleteUser = async (postId: User['id']) => {
    try {
      dispatch(deleteUserAction(postId))
      toast.success(`🫙 Usuario #${postId} eliminado del almacenamiento local.`)
      await deleteUserService(postId)
      toast.success(`☁️ Usuario #${postId} eliminado en la nube.`)
    } catch (error) {
      toast.error('☁️ El post no ha sido eliminado de la nube.')
    }
  }

  return { getUserById, initUsers, createUser, updateUser, deleteUser }
}
