import React from "react"
import { Route, Routes } from "react-router-dom";
import {Loading} from "../Components/Loading.jsx";
import {AppRoutesPaths} from "./appRouterPaths.js";



export function AppRoute()
{

    const LoginPage = React.lazy(async () => ({default: (await import("../Pages/Login/Login.jsx")).LoginPage}));
    const LandingPage = React.lazy(async () => ({default: (await import("../Pages/LandingPage/LandingPage.jsx")).LandingPage}));
    const NursePage = React.lazy(async () => ({default: (await import("../Pages/Nurse/Nurse.jsx")).Nurse}));
    const NotFoundPage = React.lazy(async () => ({default: (await import("../Components/NotFound.jsx")).NotFound}));
    const MedicalStaffsPage = React.lazy(async () => ({default: (await import("../Pages/Nurse/MedicalStaffs.jsx")).MedicalStaffs}));
    const ConsultationHistoryPage = React.lazy(async () => ({default: (await import("../Pages/Nurse/ConsultationHistory.jsx")).ConsultationHistory}));
    const HelpCenterPage = React.lazy(async () => ({default: (await import("../Pages/HelpCenter/HelpCenter.jsx")).HelpCenter}));
    const PatientDetailsPage = React.lazy(async () => ({default: (await import("../Pages/Nurse/PatientsDetails.jsx")).PatientsDetails}));


    return (
        <React.Suspense fallback={<Loading />}>
            <Routes>
                <Route path={AppRoutesPaths.welcomePage} element={<LandingPage />}/>
                <Route path={AppRoutesPaths.loginPage} element={<LoginPage />}/>
                <Route path={AppRoutesPaths.nursePage} element={<NursePage />}/>
                <Route path={AppRoutesPaths.medicalStaffsPage} element={<MedicalStaffsPage />}/>
                <Route path={AppRoutesPaths.consultationHistoryPage} element={<ConsultationHistoryPage/>}/>
                <Route path={AppRoutesPaths.helpCenterPage} element={<HelpCenterPage/>}/>
                <Route path={AppRoutesPaths.patientDetailsPage} element={<PatientDetailsPage />} />




                <Route path={AppRoutesPaths.notFound} element={<NotFoundPage />} />
            </Routes>
        </React.Suspense>
    )
}