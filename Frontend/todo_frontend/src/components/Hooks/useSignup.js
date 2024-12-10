import { useState } from "react";
import { useAuthContext } from "./useAuth";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(null);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate()

    const signup = async ({ name, email, password }) => {
        setIsLoading(true); // Set loading state to true
        setIsError(null); // Reset any previous error

        try {
            const response = await fetch('http://localhost:3000/api/auth/signup/', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const json = await response.json();

            if (!response.ok) {
                setIsLoading(false)
                throw new Error(json.error || "Signup failed");
            }

            if (response.ok) {
                // Save user email and token in localStorage
                localStorage.setItem("user", JSON.stringify(json));

                // Update the auth context
                dispatch({ type: "LOGIN", payload: json });

                setIsLoading(false); // Reset loading state
                navigate("/login")
                console.log(json)
                return json; // Return the user data
            }

        } catch (error) {
            setIsError(error.message); // Capture error message
            setIsLoading(false); // Reset loading state
        }
    };

    return { signup, isError, isLoading };
};
