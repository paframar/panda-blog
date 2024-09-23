import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar__ulist">
        <li>
          <Link id="view-posts-button" to="/posts" className="navbar__link">
            Posts
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
