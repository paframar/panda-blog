import { useForm } from 'react-hook-form'
import { Post, StoreState } from '../../interfaces/interfaces.ts'
import FormRow from '../ui/FormRow.tsx'
import usePosts from '../../hooks/usePosts.ts'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import useAuthContext from '../../context/AuthContext.tsx'

type PostFormData = Omit<Post, 'id'>
interface PostFormProps {
  postToEdit?: Post
  onEditCallback?: () => void
}

function PostForm({ postToEdit, onEditCallback }: PostFormProps) {
  const { createPost, updatePost } = usePosts()
  const { activeUser } = useAuthContext()

  const isEditSession = !!postToEdit

  const disabled = false

  const users = useSelector((state: StoreState) => state.users)

  const getPostAuthor = (userId: number) =>
    users.filter((user) => user.id === userId)[0]

  const getDefaultValues = () => {
    if (isEditSession) {
      const { title, body, userId } = postToEdit
      return { title, body, userId }
    }
    return {}
  }

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: getDefaultValues(),
  })
  const { errors } = formState

  const handleOnSubmit = (formData: PostFormData) => {
    if (isEditSession) {
      updatePost({ ...formData, id: postToEdit.id })
      onEditCallback?.()
    } else {
      createPost(formData)
      reset()
    }
  }

  const handleOnError = () => toast.error('No se ha podido crear el post')

  return (
    <form
      className="form"
      onSubmit={handleSubmit(handleOnSubmit, handleOnError)}
    >
      <FormRow label="Title" error={errors?.title?.message}>
        <input
          className="form-row__input"
          type="text"
          id="new-post-title"
          disabled={disabled}
          {...register('title', { required: 'This field is required.' })}
        />
      </FormRow>

      <FormRow label="Content" error={errors?.body?.message}>
        <textarea
          className="form-row__input"
          id="new-post-body"
          disabled={disabled}
          {...register('body', { required: 'This field is required.' })}
        />
      </FormRow>

      <FormRow label="Author: ">
        <label id="author-label">
          {isEditSession
            ? getPostAuthor(postToEdit.userId).username
            : activeUser?.username}
          <input
            className="form-row__input"
            id="user-id-hidden-input"
            type="hidden"
            {...register('userId', { value: activeUser?.id })}
          />
        </label>
      </FormRow>

      <FormRow>
        <button
          id="post-form-button"
          disabled={disabled}
          className="button button--secondary"
        >
          {isEditSession ? 'Edit post' : 'Create post'}
        </button>
      </FormRow>
    </form>
  )
}

export default PostForm
