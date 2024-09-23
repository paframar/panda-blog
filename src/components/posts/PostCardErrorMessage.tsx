interface PostCardErrorMessageProps {
  message: string
  emoji?: string
}

function PostCardErrorMessage({ message, emoji }: PostCardErrorMessageProps) {
  return (
    <div className="post-card">
      <p className="post-card__no-posts-message">
        {emoji && (
          <span className="post-card__no-posts-message__emoji"> {emoji} </span>
        )}
        {message}
      </p>
    </div>
  )
}

export default PostCardErrorMessage
