import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout.tsx'
import PostList from './components/posts/PostList.tsx'
import PostForm from './components/posts/PostForm.tsx'
import AuthForm from './components/auth/AuthForm.tsx'

function AppRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="posts" element={<PostList />} />
            <Route path="create-post" element={<PostForm />} />
            <Route path="login" element={<AuthForm mode="login" />} />
            <Route path="signup" element={<AuthForm mode="signup" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default AppRouter
