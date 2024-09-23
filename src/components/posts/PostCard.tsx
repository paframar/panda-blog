import { useState } from 'react'
import { Post } from '../../interfaces/interfaces'
import usePosts from '../../hooks/usePosts'
import PostForm from './PostForm'
import useAuthContext from '../../context/AuthContext'
import useUsers from '../../hooks/useUsers'
import { Pencil, Trash2 } from 'lucide-react'

interface PostCardProps {
  post: Post
  index: number
}

function PostCard({ post, index }: PostCardProps) {
  const { id, userId, title, body } = post
  const [edit, setEdit] = useState(false)
  const { deletePost } = usePosts()
  const { activeUser } = useAuthContext()
  const { getUserById } = useUsers()
  const { username } = getUserById(userId)

  const handleOnDelete = () => {
    deletePost(id)
  }

  const toogleEdit = () => {
    setEdit(!edit)
  }

  return (
    <>
      {edit ? (
        <PostForm postToEdit={post} onEditCallback={toogleEdit} />
      ) : (
        <div className="post-card">
          <h3 className="post-card__title">{title}</h3>
          <p className="post-card__user roboto-regular-italic">
            Author: {username || `User #${userId}`}
          </p>
          <p className="post-card__description">{body}</p>

          {activeUser && (
            <div className="post-card__actions">
              <button
                className="button button--transparent"
                id={`edit-post-button-${index}`}
                onClick={toogleEdit}
              >
                <Pencil className="button__icon--secondary" />
              </button>
              <button
                className="button button--transparent"
                id={`delete-post-button-${index}`}
                onClick={handleOnDelete}
              >
                <Trash2 className="button__icon button__icon--primary" />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default PostCard
