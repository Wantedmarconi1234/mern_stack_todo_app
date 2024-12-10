import { useState } from "react";
import { useAuthContext } from "./useAuth";
import {json, useNavigate} from "react-router-dom"


export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(null);
    const { dispatch } = useAuthContext()
    const navigate = useNavigate()

    const login = async ({email, password}) => {
        setIsError(null)
        setIsLoading(true)

        try {
            const response = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password})
            })
            const json = await response.json()
    
            //if fetch request fails
            if (!response.ok) {
                throw new Error (json.error || "Login failed")
            }
    
            //if fetch request is successful
            if (response.ok) {

                //set user to local storage
                localStorage.setItem("user", JSON.stringify(json))

                //update the context 
                dispatch({type: "LOGIN", payload: json})

                setIsLoading(false)
                
                //navigate to the homepage
                navigate('/')
    
                return json
            }
            
        } catch (error) {
            setIsError(error.message)
            setIsLoading(false)
        }
       
    }

    return {login ,isError, isLoading, json}
}