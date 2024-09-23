import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import usePosts from '../../hooks/usePosts.ts'
import useUsers from '../../hooks/useUsers.ts'

import Header from './Header.tsx'
import AuthComponent from './AuthComponent.tsx'
import Sidebar from './Sidebar.tsx'
import Navbar from './Navbar.tsx'
import MainContent from './MainContent.tsx'
import Footer from './Footer.tsx'
import Toasts from './Toasts.tsx'

import { useSelector } from 'react-redux'
import { StoreState } from '../../interfaces/interfaces.ts'
import useAuthContext from '../../context/AuthContext.tsx'

function AppLayout() {
  const navigate = useNavigate()
  const { initPosts } = usePosts()
  const { initUsers } = useUsers()
  const state = useSelector((state: StoreState) => state)
  const { activeUser } = useAuthContext()

  useEffect(() => {
    if (!activeUser) navigate('/login')
  }, [activeUser])

  useEffect(() => {
    const { users, posts } = state
    if (users.length === 0) initUsers()
    if (posts.length === 0) initPosts()
  }, [])

  return (
    <div className="layout-container roboto-regular">
      <Header>
        <Navbar />
        <AuthComponent />
      </Header>
      <Sidebar />
      <MainContent />
      <Footer />
      <Toasts />
    </div>
  )
}

export default AppLayout
