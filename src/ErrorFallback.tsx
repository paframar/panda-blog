interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div>
      <h1>Ups, something went wrong: {error.message} </h1>
      <button onClick={resetErrorBoundary}>Return to home page</button>
    </div>
  )
}

export default ErrorFallback
