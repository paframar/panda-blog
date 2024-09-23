import { Post } from '../../interfaces/interfaces'
import { generateNumericId } from '../../utils/helpers'

import { useSelector } from 'react-redux'
import { StoreState } from '../../interfaces/interfaces'

import PostCard from './PostCard'
import PostCardPlaceholder from './PostCardPlaceholder'
import PostCardErrorMessage from './PostCardErrorMessage'

import useErrorContext from '../../context/ErrorContext'

function PostList() {
  const posts = useSelector((state: StoreState) => state.posts)

  const { errors } = useErrorContext()

  if (posts.length === 0 && !errors.posts) {
    return <PostCardPlaceholder numberOfPlaceholders={3} />
  }

  if (errors.posts) {
    return (
      <PostCardErrorMessage message="No hay posts para mostrar" emoji="😥" />
    )
  }

  return (
    <div id="posts-list" className="post-list">
      {posts?.map((post: Post, index: number) => (
        <PostCard key={generateNumericId()} post={post} index={index} />
      ))}
    </div>
  )
}

export default PostList
