import { useState } from 'react'
import useAuthContext from '../../context/AuthContext.tsx'
import usePosts from '../../hooks/usePosts.ts'
import SidebarLink from './SidebarLink.tsx'

function Sidebar() {
  const { activeUser } = useAuthContext()
  const { initPosts } = usePosts()
  const [activeLink, setActiveLink] = useState('')

  const handleActiveLink = (linkName: string) => setActiveLink(linkName)
  const getActiveClass = (activeLinkName: string) =>
    activeLink === activeLinkName ? 'sidebar__item--active' : ''

  return (
    <aside className="sidebar">
      <ul className="sidebar__list">
        <SidebarLink
          linkId="popular-link"
          linkTo="/posts"
          onClickHandler={() => handleActiveLink('popular')}
          activeClass={getActiveClass('popular')}
        >
          Most popular posts
        </SidebarLink>

        <SidebarLink
          linkId="topics-link"
          linkTo="/posts"
          onClickHandler={() => handleActiveLink('topics')}
          activeClass={getActiveClass('topics')}
        >
          Topics
        </SidebarLink>

        <SidebarLink
          linkId="new-post-link"
          linkTo="/create-post"
          onClickHandler={() => handleActiveLink('new')}
          activeClass={getActiveClass('new')}
          visible={!!activeUser}
        >
          New Post
        </SidebarLink>

        <SidebarLink isButton visible={!!activeUser}>
          <button
            id="reset-posts-button"
            className="sidebar__link button button--link"
            onClick={initPosts}
          >
            Reset Posts
          </button>
        </SidebarLink>
      </ul>
    </aside>
  )
}

export default Sidebar
