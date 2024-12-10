import React from 'react'
import { NavLink } from 'react-router-dom'
import { useLogout } from '../Hooks/useLogout'
import { useAuthContext } from '../Hooks/useAuth'
import { useNavigate } from "react-router-dom"

function Navbar() {
  const { user } = useAuthContext()
  const { logout } = useLogout()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      // Call logout to clear user session
      await logout()
      // Redirect to login after successful logout
      navigate('/login')
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  return (
    <div className='h-full flex justify-between items-center mx-[100px]'>
      <NavLink to='/' className='font-bold text-3xl text-blue-900'>Todo_App</NavLink>
      <nav>
        {user ? (
          <div>
            <span>{user.email}</span>
            <NavLink
              onClick={handleLogout} 
              className="font-bold bg-blue-500 py-1 px-4 mx-5 shadow-md rounded-md text-base text-white"
            >
              Logout
            </NavLink>
          </div>
        ) : (
          <div>
            <NavLink to='login' className="font-bold bg-blue-500 py-1 px-4 mx-5 shadow-md rounded-md text-base text-white">Login</NavLink>
            <NavLink to='signup' className="font-bold bg-blue-500 py-1 px-4 mx-5 shadow-md rounded-md text-base text-white">Signup</NavLink>
          </div>
        )}
      </nav>
    </div>
  )
}

export default Navbar
