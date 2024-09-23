import { useDispatch } from 'react-redux'

import { Post } from '../interfaces/interfaces'
import {
  createPostAction,
  initPostsAction,
  updatePostAction,
  deletePostAction,
} from '../store/actions/postsActions'

import {
  readPostService,
  createPostService,
  deletePostService,
  updatePostService,
} from '../services/apiPosts'

import { generateNumericId } from '../utils/helpers'

import toast from 'react-hot-toast'

import { AppDispatch } from '../store/store'

import useErrorContext from '../context/ErrorContext'

export default function usePosts() {
  const dispatch = useDispatch<AppDispatch>()
  const { setError } = useErrorContext()

  const initPosts = async () => {
    try {
      setError('posts', false)
      dispatch(initPostsAction([]))
      const fetchedPosts = await readPostService()
      dispatch(initPostsAction(fetchedPosts))
      toast.success('🫙 Posts Inicializados.')
    } catch (error) {
      setError('posts', true)
      toast.error('☁️ Se produjo un error al inicializar los posts.')
    }
  }

  const createPost = async (postData: Omit<Post, 'id'>) => {
    try {
      const id = generateNumericId()
      const newPost: Post = { id, ...postData }
      dispatch(createPostAction(newPost))
      toast.success(`🫙 Post #${id} crado en el almacenamiento local.`)
      const fakeResponse = await createPostService(newPost)
      toast.success(`☁️ Post #${fakeResponse.id} creado en la nube.`)
    } catch (error) {
      toast.error('☁️ Se produjo un error al crear el post.')
    }
  }

  const updatePost = async (post: Post) => {
    try {
      dispatch(updatePostAction(post))
      toast.success(
        `🫙 Post #${post.id} actualizado en el almacenamiento local.`
      )
      const fakeResponse = await updatePostService(post)
      toast.success(`☁️ Post #${fakeResponse.id} actualizado en la nube.`)
    } catch (error) {
      toast.error('☁️ Este post no ha sido actualizado en la nube.')
    }
  }

  const deletePost = async (postId: Post['id']) => {
    try {
      dispatch(deletePostAction(postId))
      toast.success(`🫙 Post #${postId} eliminado del almacenamiento local.`)
      await deletePostService(postId)
      toast.success(`☁️ Post #${postId} eliminado en la nube.`)
    } catch (error) {
      toast.error('☁️ El post no ha sido eliminado de la nube.')
    }
  }

  return { initPosts, createPost, updatePost, deletePost }
}
