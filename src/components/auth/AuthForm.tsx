import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import useUsers from '../../hooks/useUsers'
import FormRow from '../ui/FormRow'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { StoreState } from '../../interfaces/interfaces'
import useAuthContext from '../../context/AuthContext'
interface AuthFormProps {
  mode: 'signup' | 'login'
}

export interface UserLoginData {
  email: string
  password: string
}

export interface UserSignUpData extends UserLoginData {
  name: string
  username: string
  password2: string
}

function AuthForm({ mode }: AuthFormProps) {
  const { initUsers } = useUsers()
  const { activeUser, login, signUp } = useAuthContext()
  const users = useSelector((state: StoreState) => state.users)
  const navigate = useNavigate()

  useEffect(() => {
    if (activeUser) navigate('/posts')
  }, [activeUser])

  useEffect(() => {
    if (users.length === 0) initUsers()
  }, [])

  const getDefaultValues = () =>
    mode === 'signup'
      ? {
          name: '',
          username: '',
          email: '',
          password: '',
          password2: '',
        }
      : {
          email: '',
          password: '',
        }

  const handleOnSubmit = (formData: UserLoginData | UserSignUpData) => {
    let data
    if (mode === 'login') {
      data = formData as UserLoginData
      login(data)
    } else if (mode === 'signup') {
      data = formData as UserSignUpData
      signUp(data)
    }
  }

  const handleOnError = () =>
    toast.error('Error: Datos inválidos o insuficientes.')

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: getDefaultValues(),
  })
  const { errors } = formState

  const linkToRoute = mode === 'signup' ? '/login' : '/signup'
  const linkText =
    mode === 'login'
      ? '¿No tienes una cuenta?, registrate aquí.'
      : '¿Ya estas registrado?, ingresa aquí.'
  const buttonText = mode === 'login' ? 'Ingresar' : 'Registrarse'
  const requiredForSignUp = mode === 'signup' ? 'Campo requerido' : false

  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit, handleOnError)}
      className="form"
    >
      <FormRow
        label="Name"
        error={errors?.name?.message}
        visible={mode === 'signup'}
      >
        <input
          className="form-row__input"
          id="name"
          {...register('name', { required: requiredForSignUp })}
        />
      </FormRow>

      <FormRow
        label="User Name"
        error={errors?.username?.message}
        visible={mode === 'signup'}
      >
        <input
          className="form-row__input"
          type="text"
          id="username"
          {...register('username', { required: requiredForSignUp })}
        />
      </FormRow>

      <FormRow label="Email" error={errors?.email?.message}>
        <input
          className="form-row__input"
          type="text"
          id="email"
          {...register('email', { required: 'Campo requerido' })}
        />
      </FormRow>

      <FormRow label="Password" error={errors?.password?.message}>
        <input
          className="form-row__input"
          type="password"
          id="password"
          {...register('password', { required: 'Campo requerido' })}
        />
      </FormRow>

      <FormRow
        label="Repeat password"
        error={errors?.password2?.message}
        visible={mode === 'signup'}
      >
        <input
          className="form-row__input"
          type="password"
          id="password2"
          {...register('password2', { required: requiredForSignUp })}
        />
      </FormRow>

      <FormRow>
        <button id="login-button" className="button button--secondary">
          {buttonText}
        </button>
      </FormRow>

      <FormRow>
        <Link id="link-signin-mode" to={linkToRoute} className="form-row__link">
          {linkText}
        </Link>
      </FormRow>
    </form>
  )
}

export default AuthForm
