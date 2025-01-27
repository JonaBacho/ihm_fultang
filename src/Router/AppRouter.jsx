import React from "react"
import { Route, Routes } from "react-router-dom";
import {Loading} from "../GlobalComponents/Loading.jsx";
import {AppRoutesPaths} from "./appRouterPaths.js";



export function AppRoute()
{
    const LoginPage = React.lazy(async () => ({default: (await import("../Pages/Authentication/Login.jsx")).LoginPage}));
    const ForgottenPage = React.lazy(async () => ({default: (await import("../Pages/Authentication/ForgottenPassword.jsx")).ForgottenPassword}));
    const LandingPage = React.lazy(async () => ({default: (await import("../Pages/LandingPage/LandingPage.jsx")).LandingPage}));
    const NursePage = React.lazy(async () => ({default: (await import("../Pages/Nurse/Nurse.jsx")).Nurse}));
    const NotFoundPage = React.lazy(async () => ({default: (await import("../GlobalComponents/NotFound.jsx")).NotFound}));
    const NurseMedicalStaffsPage = React.lazy(async () => ({default: (await import("../Pages/Nurse/MedicalStaffs.jsx")).MedicalStaffs}));
    const ConsultationHistoryPage = React.lazy(async () => ({default: (await import("../Pages/Nurse/ConsultationHistory.jsx")).ConsultationHistory}));
    const HelpCenterPage = React.lazy(async () => ({default: (await import("../Pages/HelpCenter/HelpCenter.jsx")).HelpCenter}));
    const PatientDetailsPage = React.lazy(async () => ({default: (await import("../Pages/Nurse/PatientParameters.jsx")).PatientParameters}));
    const PharmacyPage = React.lazy(async () => ({default: (await import("../Pages/Pharmacy/Pharmacy.jsx")).Pharmacy}));
    const ReceptionistPage = React.lazy(async () => ({default: (await import("../Pages/Receptionist/Receptionist.jsx")).Receptionist}));
    const DoctorPage = React.lazy(async () => ({default: (await import("../Pages/Doctor/Doctor.jsx")).Doctor}));
    const LaboratoryAssistantPage = React.lazy(async () => ({default: (await import("../Pages/Laboratory/LaboratoryAssistant.jsx")).LaboratoryAssistant}));
    const SpecialistPage = React.lazy(async () => ({default: (await import("../Pages/Doctor/Specialist.jsx")).Specialist}));
    const CashierPage = React.lazy(async () => ({default: (await import("../Pages/Cashier/Cashier.jsx")).Cashier}));
    const ExamsList = React.lazy(async () => ({default: (await import("../Pages/Cashier/ExamsList.jsx")).ExamsList}));
    const FinancialReport = React.lazy(async () => ({default: (await import("../Pages/Cashier/FinancialReport.jsx")).FinancialReport}));
    const AdminHomePage = React.lazy(async () => ({default: (await import("../Pages/AdminViews/AdminHomePage.jsx")).AdminHomePage}));
    const ReceptionistMedicalStaffsPage = React.lazy(async () => ({default: (await import("../Pages/Receptionist/ReceptionistMedicalStaffs.jsx")).ReceptionistMedicalStaffs}));
    const ReceptionistAppointmentsPage = React.lazy(async () => ({default: (await import("../Pages/Receptionist/Appointments.jsx")).Appointments}));
    const AdminPatientListPage = React.lazy(async () => ({default: (await import("../Pages/AdminViews/AdminPatientList.jsx")).AdminPatientList}));
    const AddMedicalStaffPage = React.lazy(async () => ({default: (await import("../Pages/AdminViews/AddMedicalStaff.jsx")).AddMedicalStaff}));
    const AdminMedicalStaffListPage = React.lazy(async () => ({default: (await import("../Pages/AdminViews/AdminMedicalStaffList.jsx")).AdminMedicalStaffList}));
    const AdminConsultationListPage = React.lazy(async () => ({default: (await import("../Pages/AdminViews/AdminConsultationList.jsx")).AdminConsultationList}));
    const AdminAppointmentsListPage = React.lazy(async () => ({default: (await import("../Pages/AdminViews/AdminAppointmentsList.jsx")).AdminAppointmentsList}));
    const AdminExamsListPage = React.lazy(async () => ({default: (await import("../Pages/AdminViews/AdminExamsList.jsx")).AdminExamsList}));
    const AdminHospitalRoomPage = React.lazy(async () => ({default: (await import("../Pages/AdminViews/AdminHospitalRooms.jsx")).AdminHospitalRooms}));
    const AdminFinancialReportsPage = React.lazy(async () => ({default: (await import("../Pages/AdminViews/AdminFinancialReports.jsx")).AdminFinancialReports}));
    const AccountantPage = React.lazy(async () => ({default: (await import("../Pages/Accountant/Accountant.jsx")).Accountant}));
    const AdminConsultationDetails = React.lazy(async () => ({default: (await import("../Pages/AdminViews/ConsultationDetails.jsx")).ConsultationDetails}));
    const CurrentExamsLaboratoryPage = React.lazy(async () => ({default: (await import("../Pages/Laboratory/CurrentExams.jsx")).CurrentExams}));
    const ExamsHistoryLaboratoryPage = React.lazy(async () => ({default: (await import("../Pages/Laboratory/ExamsHistory.jsx")).ExamHistory}));
    const FinancialHistory = React.lazy(async () => ({default: (await import("../Pages/Cashier/FinancialHistory.jsx")).FinancialHistory}));
    const AccountDetailsPage = React.lazy(async () => ({default: (await import("../Pages/Accountant/AccountDetailsPage.jsx")).AccountDetailsPage}));
    const AccountList = React.lazy(async () => ({default: (await import("../Pages/Accountant/AccountList.jsx")).AccountList}));


    return (
        <React.Suspense fallback={<Loading />}>
            <Routes>
                <Route path={AppRoutesPaths.welcomePage} element={<LandingPage />}/>
                <Route path={AppRoutesPaths.loginPage} element={<LoginPage />}/>
                <Route path={AppRoutesPaths.forgottenPasswordPage} element={<ForgottenPage />}/>
                <Route path={AppRoutesPaths.nursePage} element={<NursePage />}/>
                <Route path={AppRoutesPaths.pharmacyPage} element={<PharmacyPage />}/>
                <Route path={AppRoutesPaths.nurseMedicalStaffsPage} element={<NurseMedicalStaffsPage />}/>
                <Route path={AppRoutesPaths.consultationHistoryPage} element={<ConsultationHistoryPage/>}/>
                <Route path={AppRoutesPaths.helpCenterPage} element={<HelpCenterPage/>}/>
                <Route path={AppRoutesPaths.patientDetailsPage} element={<PatientDetailsPage />} />
                <Route path={AppRoutesPaths.cashierPage} element={<CashierPage />} />
                <Route path={AppRoutesPaths.examsList} element={<ExamsList/>} />
                <Route path={AppRoutesPaths.financialReport} element={<FinancialReport/>} />
                <Route path={AppRoutesPaths.receptionistPage} element={<ReceptionistPage />} />
                <Route path={AppRoutesPaths.doctorPage} element={<DoctorPage />} />
                <Route path={AppRoutesPaths.laboratoryAssistantPage} element={<LaboratoryAssistantPage />} />
                <Route path={AppRoutesPaths.specialistPage} element={<SpecialistPage />} />
                <Route path={AppRoutesPaths.adminHomePage} element={<AdminHomePage />} />
                <Route path={AppRoutesPaths.receptionistMedicalStaffsPage} element={<ReceptionistMedicalStaffsPage />} />
                <Route path={AppRoutesPaths.appointmentsPage} element={<ReceptionistAppointmentsPage />} />
                <Route path={AppRoutesPaths.adminPatientListPage} element={<AdminPatientListPage />} />
                <Route path={AppRoutesPaths.addMedicalStaff} element={<AddMedicalStaffPage />} />
                <Route path={AppRoutesPaths.adminMedicalStaffListPage} element={<AdminMedicalStaffListPage />} />
                <Route path={AppRoutesPaths.adminConsultationListPage} element={<AdminConsultationListPage />} />
                <Route path={AppRoutesPaths.adminAppointmentsListPage} element={<AdminAppointmentsListPage />} />
                <Route path={AppRoutesPaths.adminExamsListPage} element={<AdminExamsListPage />} />
                <Route path={AppRoutesPaths.adminHospitalRoomPage} element={<AdminHospitalRoomPage />} />
                <Route path={AppRoutesPaths.adminFinancialReportsPage} element={<AdminFinancialReportsPage />} />
                <Route path={AppRoutesPaths.accountantPage} element={<AccountantPage />} />
                <Route path={AppRoutesPaths.adminConsultationDetailsPage} element={<AdminConsultationDetails />} />
                <Route path={AppRoutesPaths.laboratoryHistory} element={<ExamsHistoryLaboratoryPage />} />
                <Route path={AppRoutesPaths.laboratoryCurrent} element={<CurrentExamsLaboratoryPage />} />
                <Route path={AppRoutesPaths.financialHistory} element={<FinancialHistory />} />
                <Route  path={AppRoutesPaths.accountDetails}   element={<AccountDetailsPage />} />
                <Route path={AppRoutesPaths.accountList} element={<AccountList />} />
                <Route path={AppRoutesPaths.notFound} element={<NotFoundPage />} />
            </Routes>
        </React.Suspense>
    )
}