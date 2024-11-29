
import constate from "constate";
import {useEffect, useMemo, useState} from "react";
import axios from "axios";



export const [FultangProvider, useAuthentication] = constate(useLogin, value => value.authMethods);


function useLogin() {


    const [isLogged, setIsLogged] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState({});
    const [userRole, setUserRole] = useState("");


    useEffect(() => {
        const token = localStorage.getItem("token_key_fultang");
        if (token) {
            setIsLogged(true);
            setUserRole(localStorage.getItem("role"));
            console.log("role" , userRole);
        }
    }, [userRole]);


    function saveAuthParameters(token, refreshToken, userRole) {
        localStorage.setItem("token_key_fultang", token);
        localStorage.setItem("refresh_token_fultang", refreshToken);
        localStorage.setItem("role", userRole)
    }



    /**
     * Log in the user and set the auth parameters.
     * @param {object} data - The data to send in the request body.
     * @returns {Promise<string | number>} The user's role if the login is
     * successful or the error status if the login fails.
     */
    async function login (data)
    {
        try
        {
            const response = await axios.post("http://localhost:8000/api/v1/login/", data);
            if (response.status === 200)
            {
                setIsLoading(false);
                console.log(response);
                saveAuthParameters(response.data.access, response.data.refresh, response.data.user.role);
                setUserData(response.data.user);
                setUserRole(response.data.user.role);
                setIsLogged(true);
                return response.data.user.role;
            }
        }
        catch (error)
        {
            setIsLoading(false);
            console.error("Login error:", error);
            return error.status;
        }
    }



    /**
     * Checks if the user is authenticated.
     * @returns {boolean} `true` if the user is authenticated, `false` otherwise.
     */
    function isAuthenticated() {
        return isLogged;
    }


    /**
     * Checks if the user is authenticated and has the given role.
     * @param {string} requiredRole - The role to check against.
     * @returns {boolean} `true` if the user is authenticated and has the given role, `false` otherwise.
     */
    function hasRole(requiredRole) {
        if(isLogged)
        {
            return userRole === requiredRole;
        }

    }


    /**
     * Logout the user by removing the token and role from local storage and
     * setting {@link isLogged} to `false`.
     */
    function logout()
    {
        localStorage.removeItem("token_key_fultang");
        localStorage.removeItem("refresh_token_fultang");
        localStorage.removeItem("role");
        setIsLogged(false);
        setUserRole("");
        window.location.href = "/";
    }





    const authMethods = useMemo(() => ({
        login,
        setIsLoading,
        isLoading,
        userData,
        isLogged,
        isAuthenticated,
        hasRole,
        userRole,
        logout
    }), [isLoading, userData, isLogged, isAuthenticated, hasRole, userRole]);
    return {authMethods}
}