import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface SidebarLinkProps {
  children: ReactNode
  linkTo?: string
  activeClass?: string
  onClickHandler?: (linkName: string) => void
  isButton?: boolean
  visible?: boolean
  linkId?: string
}

function SidebarLink({
  children,
  linkTo = '/',
  onClickHandler = () => {},
  activeClass,
  isButton = false,
  visible = true,
  linkId,
}: SidebarLinkProps) {
  if (!visible) return null
  return (
    <li className={`sidebar__item ${activeClass}`}>
      {!isButton ? (
        <Link
          id={linkId}
          to={linkTo}
          className="sidebar__link"
          onClick={() => onClickHandler('topics')}
        >
          {children}
        </Link>
      ) : (
        children
      )}
    </li>
  )
}

export default SidebarLink
