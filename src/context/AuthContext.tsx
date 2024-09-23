import { createContext, useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { UserLoginData } from '../components/auth/AuthForm'
import { ReactNode } from 'react'
import { StoreState } from '../interfaces/interfaces'
import useUsers from '../hooks/useUsers'
import toast from 'react-hot-toast'
import { UserSignUpData } from '../components/auth/AuthForm'
import { generateNumericId } from '../utils/helpers'

export interface AuthUser {
  id: number
  username: string
  email: string
  password: string
}

const emptyAuthUser: AuthUser = {
  id: 0,
  username: '',
  email: '',
  password: '',
}

const initialValue = {
  activeUser: emptyAuthUser,
  login: () => {},
  logout: () => {},
  signUp: () => {},
}

interface AuthContextValue {
  activeUser: AuthUser | null
  login: (loginData: UserLoginData) => void
  logout: () => void
  signUp: (signUpData: UserSignUpData) => void
}

const AuthContext = createContext<AuthContextValue>(initialValue)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [activeUser, setActiveUser] = useState<AuthUser | null>(null)
  const users = useSelector((state: StoreState) => state.users)
  const { createUser } = useUsers()

  const _userRegistered = (data: UserSignUpData) => {
    const { email } = data
    return !!users.find((u) => u.email === email)
  }

  const login = (loginData: UserLoginData) => {
    const { email, password } = loginData
    const user = users.find(
      (u) => u.email === email && (!u.password || u.password === password)
    )
    if (user) {
      setActiveUser(user)
      toast.success('Login exitoso.')
    } else {
      toast.error('Login fallido.')
    }
  }

  const signUp = (signUpData: UserSignUpData) => {
    const { name, username, email, password, password2 } = signUpData
    if (_userRegistered(signUpData)) {
      toast.error('Usuario ya registrado.')
      return
    }
    if (password !== password2) {
      toast.error('Las contraseñas deben coincidir.')
      return
    }
    const id = generateNumericId()
    createUser({ id, ...signUpData })
    toast.success('Usuario registrado con éxito.')
    setActiveUser({ id, username, email, password })
  }

  const logout = () => {
    setActiveUser(null)
    toast.success('Logout exitoso.')
  }

  return (
    <AuthContext.Provider value={{ activeUser, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context)
    throw new Error('useAuthContext debe usarse dentro de AuthProvider.')
  return context
}
