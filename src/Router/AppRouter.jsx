import React from "react"
import { Route, Routes } from "react-router-dom";
import {Loading} from "../GlobalComponents/Loading.jsx";
import {AppRoutesPaths} from "./appRouterPaths.js";



export function AppRoute()
{

    const LoginPage = React.lazy(async () => ({default: (await import("../Pages/Login/Login.jsx")).LoginPage}));
    const LandingPage = React.lazy(async () => ({default: (await import("../Pages/LandingPage/LandingPage.jsx")).LandingPage}));
    const NursePage = React.lazy(async () => ({default: (await import("../Pages/Nurse/Nurse.jsx")).Nurse}));
    const NotFoundPage = React.lazy(async () => ({default: (await import("../GlobalComponents/NotFound.jsx")).NotFound}));
    const NurseMedicalStaffsPage = React.lazy(async () => ({default: (await import("../Pages/Nurse/MedicalStaffs.jsx")).MedicalStaffs}));
    const ConsultationHistoryPage = React.lazy(async () => ({default: (await import("../Pages/Nurse/ConsultationHistory.jsx")).ConsultationHistory}));
    const HelpCenterPage = React.lazy(async () => ({default: (await import("../Pages/HelpCenter/HelpCenter.jsx")).HelpCenter}));
    const PatientDetailsPage = React.lazy(async () => ({default: (await import("../Pages/Nurse/PatientsDetails.jsx")).PatientsDetails}));
    const PharmacyPage = React.lazy(async () => ({default: (await import("../Pages/Pharmacy/Pharmacy.jsx")).Pharmacy}));
    const ReceptionistPage = React.lazy(async () => ({default: (await import("../Pages/Receptionist/Receptionist.jsx")).Receptionist}));
    const DoctorPage = React.lazy(async () => ({default: (await import("../Pages/Doctor/Doctor.jsx")).Doctor}));
    const LaboratoryAssistantPage = React.lazy(async () => ({default: (await import("../Pages/Laboratory/LaboratoryAssistant.jsx")).LaboratoryAssistant}));
    const SpecialistPage = React.lazy(async () => ({default: (await import("../Pages/Doctor/Specialist.jsx")).Specialist}));
    const CashierPage = React.lazy(async () => ({default: (await import("../Pages/Cashier/Cashier.jsx")).Cashier}));
    const AdminHomePage = React.lazy(async () => ({default: (await import("../Pages/AdminViews/adminHomePage.jsx")).AdminHomePage}));
    const ReceptionistMedicalStaffsPage = React.lazy(async () => ({default: (await import("../Pages/Receptionist/ReceptionistMedicalStaffs.jsx")).ReceptionistMedicalStaffs}));
    const ReceptionistAppointmentsPage = React.lazy(async () => ({default: (await import("../Pages/Receptionist/Appointments.jsx")).Appointments}));



    return (
        <React.Suspense fallback={<Loading />}>
            <Routes>
                <Route path={AppRoutesPaths.welcomePage} element={<LandingPage />}/>
                <Route path={AppRoutesPaths.loginPage} element={<LoginPage />}/>
                <Route path={AppRoutesPaths.nursePage} element={<NursePage />}/>
                <Route path={AppRoutesPaths.pharmacyPage} element={<PharmacyPage />}/>
                <Route path={AppRoutesPaths.nurseMedicalStaffsPage} element={<NurseMedicalStaffsPage />}/>
                <Route path={AppRoutesPaths.consultationHistoryPage} element={<ConsultationHistoryPage/>}/>
                <Route path={AppRoutesPaths.helpCenterPage} element={<HelpCenterPage/>}/>
                <Route path={AppRoutesPaths.patientDetailsPage} element={<PatientDetailsPage />} />
                <Route path={AppRoutesPaths.cashierPage} element={<CashierPage />} />
                <Route path={AppRoutesPaths.receptionistPage} element={<ReceptionistPage />} />
                <Route path={AppRoutesPaths.doctorPage} element={<DoctorPage />} />
                <Route path={AppRoutesPaths.laboratoryAssistantPage} element={<LaboratoryAssistantPage />} />
                <Route path={AppRoutesPaths.specialistPage} element={<SpecialistPage />} />
                <Route path={AppRoutesPaths.adminHomePage} element={<AdminHomePage />} />
                <Route path={AppRoutesPaths.receptionistMedicalStaffsPage} element={<ReceptionistMedicalStaffsPage />} />
                <Route path={AppRoutesPaths.appointmentsPage} element={<ReceptionistAppointmentsPage />} />




                <Route path={AppRoutesPaths.notFound} element={<NotFoundPage />} />
            </Routes>
        </React.Suspense>
    )
}