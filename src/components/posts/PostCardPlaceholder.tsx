interface PostCardPlaceholderProps {
  numberOfPlaceholders?: number
}

function PostCardPlaceholder({
  numberOfPlaceholders = 1,
}: PostCardPlaceholderProps) {
  const placeholders = Array.from(
    { length: numberOfPlaceholders },
    (_, index) => index
  )

  return (
    <div className="post-list">
      {placeholders.map((_, index) => (
        <div key={index} className="post-card-placeholder">
          <div className="post-card-placeholder__item">esqueleto</div>
          <div className="post-card-placeholder__item">esqueleto</div>
          <div className="post-card-placeholder__item">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque,
            laudantium?
          </div>
          <div className="post-card-placeholder__item">esqueleto</div>
        </div>
      ))}
    </div>
  )
}

export default PostCardPlaceholder
