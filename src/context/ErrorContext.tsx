import { ReactNode, createContext, useContext, useState } from 'react'

interface Errors {
  posts: boolean
}

type SetErrorFeature = 'posts'

interface ErrorContextValue {
  errors: Errors
  setError: (feature: SetErrorFeature, value: boolean) => void
}

const initialValue = {
  postsError: false,
  setError: () => {},
}

const ErrorContext = createContext<ErrorContextValue>(initialValue)

export function ErrorProvider({ children }: { children: ReactNode }) {
  const [postsError, setPostsError] = useState(false)

  const setError = (feature: SetErrorFeature, value: boolean) => {
    if (feature === 'posts') setPostsError(value)
  }

  const errors = { posts: postsError }

  return (
    <ErrorContext.Provider value={{ errors, setError }}>
      {children}
    </ErrorContext.Provider>
  )
}

export default function useErrorContext() {
  const context = useContext(ErrorContext)
  if (!context)
    throw new Error('useErrorContext debe usarse dentro de ErrorProvider.')
  return context
}
