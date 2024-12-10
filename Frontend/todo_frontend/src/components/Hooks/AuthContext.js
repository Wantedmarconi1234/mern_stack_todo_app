import React from 'react'
import { createContext, useReducer, useEffect } from 'react'

const initialState = {
    user: null
}

const authFunction = (state, action ) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state, 
                user: action.payload
            }
        case "LOGOUT":
            return {
                ...state,
                user: null
            }
        default:
            return state
    }
}

//create authentication context
export const UserContext = createContext()


function AuthProvider({children}) {
const [state, dispatch] = useReducer(authFunction, initialState)

useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
        dispatch({type: "LOGIN", payload: user})
    }
}, [])

  return (
    <UserContext.Provider value={{...state, dispatch}}>
        {children}
    </UserContext.Provider>
  )
}

export default AuthProvider