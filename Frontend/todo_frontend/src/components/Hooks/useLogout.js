import { useAuthContext } from "./useAuth"

export const useLogout = () => {
    const {dispatch} = useAuthContext()

    const logout = () => {
        //update the authentication context
        dispatch({type: "LOGOUT"})

        //remove user from localstorage to logout
        localStorage.removeItem("user")
    }

    return {logout}
}