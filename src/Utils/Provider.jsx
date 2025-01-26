import constate from "constate";
import {useEffect, useMemo, useState} from "react";
import axios from "axios";





export const [FultangProvider, useAuthentication] = constate(useLogin, value => value.authMethods);



function useLogin() {

    const [isLogged, setIsLogged] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState({});
    const [userRole, setUserRole] = useState("");


    function saveAuthParameters(token, refreshToken) {
        localStorage.setItem("token_key_fultang", token);
        localStorage.setItem("refresh_token_fultang", refreshToken);
    }


    function clearLocalStorage()
    {
        localStorage.removeItem("token_key_fultang");
        localStorage.removeItem("refresh_token_fultang");
    }


    async function login (data)
    {
        try
        {
            const response = await axios.post("http://85.214.142.178:8009/api/v1/auth/login/", data);
            if (response.status === 200)
            {
                setIsLoading(false);
                //console.log(response);
                saveAuthParameters(response.data.access, response.data.refresh);
                setUserData(response.data.user);
                setUserRole(response.data.user.role);
                setIsLogged(true);
                return response.data.user.role;
            }
        }
        catch (error)
        {
            setIsLoading(false);
            console.error("Authentication error:", error);
            return error.status;
        }
    }



    useEffect(() => {
        const token = localStorage.getItem("token_key_fultang");
        if (token)
        {
            setIsLogged(true);
            async function getCurrentUserInfos  ()
            {
                try
                {
                    const response = await axios.get("http://85.214.142.178:8009/api/v1/auth/me/", {headers: {"Authorization": `Bearer ${token}`}});
                    if (response.status === 200)
                    {
                        console.log(response.data);
                        setIsLogged(true);
                        setUserData(response.data);
                        setUserRole(response.data.role);
                    }
                }
                catch (error)
                {
                    console.log(error);
                    setIsLogged(false);
                }
            }
            getCurrentUserInfos()
        }
        else
        {
            setIsLogged(false);
            setUserData({});
            setUserRole("");
            clearLocalStorage();
        }
    }, []);



    function isAuthenticated()
    {
        return isLogged;
    }




    function hasRole(requiredRole)
    {
        if(isLogged) return userRole === requiredRole;
        return false;
    }




    function logout()
    {
        clearLocalStorage();
        setIsLogged(false);
        setUserData({});
        setUserRole("");
        window.location.href = "/login";
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
        logout,
    }), [isLoading, userData, isLogged, userRole, logout]);
    return {authMethods}
}