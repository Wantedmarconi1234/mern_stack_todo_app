import { useContext } from 'react'
import { UserContext } from './AuthContext'

export const useAuthContext = () => {
const context = useContext(UserContext)

if (!context) {
    throw new Error("useAuth must be used within an AuthContext")
}
  return context;
}

