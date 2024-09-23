import { useNavigate } from 'react-router-dom'
import useAuthContext from '../../context/AuthContext.tsx'

function AuthComponent() {
  const navigate = useNavigate()
  const { activeUser, logout } = useAuthContext()

  const handleSignIn = () => navigate('login')
  const handleLogout = () => logout()

  return (
    <div>
      {activeUser === null ? (
        <div className="auth-component">
          <button
            id="signin-button"
            onClick={handleSignIn}
            className="button button--primary"
          >
            Sign In
          </button>
        </div>
      ) : (
        <div className="auth-component">
          <p className="auth-component__welcome">
            <em>Bienvenido </em>
            <b>{activeUser.username}</b>
          </p>

          <button
            id="logout-button"
            onClick={handleLogout}
            className="button button--secondary"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default AuthComponent
