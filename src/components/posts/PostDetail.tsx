import React from 'react'
import { Post } from '../../interfaces/interfaces'
import { useParams } from 'react-router-dom'
import { getPost } from '../../hooks/usePosts'

interface PostDetailParams {
  id: string
  [key: string]: string | undefined
}

const PostDetail = () => {
  const { id } = useParams<PostDetailParams>()
  const post = getPost(id)
  return (
    <div>
      <p> {post.title} </p>
    </div>
  )
}

export default PostDetail
