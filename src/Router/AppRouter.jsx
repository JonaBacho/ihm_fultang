import React from "react"
import { Route, Routes } from "react-router-dom";
import {Loading} from "../Components/Loading.jsx";
import {AppRoutesPaths} from "./appRouterPaths.js";



export function AppRoute()
{

    const LoginPage = React.lazy(async () => ({
        default: (await import("../Pages/Login/Login.jsx")).LoginPage
    }));

    const LandingPage = React.lazy(async () => ({
        default: (await import("../Pages/LandingPage/LandingPage.jsx")).LandingPage
    }));
    const NursePage = React.lazy(async () => ({
        default: (await import("../Pages/Nurse/Nurse.jsx")).Nurse
    }));
    const NotFound = React.lazy(async () => ({
        default: (await import("../Components/NotFound.jsx")).NotFound
    }));

    return (
        <React.Suspense fallback={<Loading />}>
            <Routes>
                <Route path={AppRoutesPaths.welcomePage} element={<LandingPage />}/>
                <Route path={AppRoutesPaths.loginPage} element={<LoginPage />}/>
                <Route path={AppRoutesPaths.nursePage} element={<NursePage />}/>



                <Route path={AppRoutesPaths.notFound} element={<NotFound />} />
            </Routes>
        </React.Suspense>
    )
}