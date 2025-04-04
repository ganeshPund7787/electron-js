import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth()
  console.log(user)
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">To-Do App</span>
        </Link>
        <div className="flex items-center space-x-4 ">
          {isAuthenticated && (
            <button
              onClick={() => logout()}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          )}

          {/* User Info / Login Button */}
          <div>
            {isAuthenticated ? (
              <span className="text-gray-300 text-sm">Welcome, {user?.name}!</span>
            ) : (
              <Link
                to="/sign-in"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
