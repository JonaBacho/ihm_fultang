import constate from "constate";
import {useEffect, useMemo, useState} from "react";
import axios from "axios";
import axiosInstance from "./axiosInstance.js";




export const [FultangProvider, useAuthentication] = constate(useLogin, value => value.authMethods);


function useLogin() {


    const [isLogged, setIsLogged] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState({});
    const [userRole, setUserRole] = useState("");


    function saveAuthParameters(token, refreshToken) {
        localStorage.setItem("token_key_fultang", token);
        localStorage.setItem("refresh_token_fultang", refreshToken);
        localStorage.setItem("role", userRole)
    }


    function clearLocalStorage()
    {
        localStorage.removeItem("token_key_fultang");
        localStorage.removeItem("refresh_token_fultang");
        localStorage.removeItem("role");
    }


    async function login (data)
    {
        try
        {
            const response = await axios.post("http://localhost:8000/api/v1/login/", data);
            if (response.status === 200)
            {
                setIsLoading(false);
                console.log(response);
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
            console.error("Login error:", error);
            return error.status;
        }
    }


    async function getUserInfos()
    {
        try
        {
            const response = await axiosInstance.get("/medical-staff/me");
            if (response.status === 200)
            {
                console.log(response);
              //  setIsLogged(true);
               // setUserData(response.data);
              //  setUserRole(response.data.role);
            }
        }
        catch (error)
        {
            console.log(error);
           // setIsLogged(false);
        }
    }




    useEffect(() => {
        const token = localStorage.getItem("token_key_fultang");
        if (token) {
            if (isLogged)
            {
                const getCurrentUser = async () => {
                    await getUserInfos();
                }
                getCurrentUser()
            }
        }
        else
        {
            setIsLogged(false);
            clearLocalStorage();
        }
    }, [isLogged]);


    function isAuthenticated() {
        return isLogged;
    }


    function hasRole(requiredRole) {
        if(isLogged)
        {
            return userRole === requiredRole;
        }

    }

    useEffect(() => {
        const token = localStorage.getItem("token_key_fultang");
        const role = localStorage.getItem("role");
        if (token)
        {
            setIsLogged(true);
            if(role)
            {
                setUserRole(role);
            }
        }
    }, []);



    function logout()
    {
        clearLocalStorage();
        setIsLogged(false);
        setUserData({});
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
    }), [login,isLoading, userData, isLogged, isAuthenticated, hasRole, userRole]);
    return {authMethods}
}