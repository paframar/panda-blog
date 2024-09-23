import { ReactNode } from 'react'
import Logo from './Logo.tsx'

interface HeaderProps {
  children: ReactNode
}

function Header({ children }: HeaderProps) {
  return (
    <header className="header">
      <Logo />
      <p className="header__title">Panda Blog</p>
      {children}
    </header>
  )
}

export default Header
