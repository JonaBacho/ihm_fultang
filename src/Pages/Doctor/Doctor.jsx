import { DashBoard } from '../../GlobalComponents/DashBoard.jsx';
import {Users, Calendar, ClipboardList, Pill, FileText, Stethoscope} from 'lucide-react';
import {AppointmentForm2} from "./DoctorComponents/AppointmentForm.jsx";
import {ExamPrescriptionForm2} from "./DoctorComponents/ExamPrescriptionForm.jsx";
import {ExamResults2} from "./DoctorComponents/ExamResults.jsx";
import {PatientList2} from "./DoctorComponents/PatientList.jsx";
import {MedicalRecord2} from "./DoctorComponents/MedicalRecord.jsx";
import {PrescriptionForm2} from "./DoctorComponents/PrescriptionForm.jsx";

// eslint-disable-next-line react-refresh/only-export-components
export const links = [
    { name: 'Rendez-vous', link: '/appointments', icon: Calendar }, //route pour afficher le formulaire de rendez-vous Appointment.jsx
    { name: 'Résultats d\'examens', link: '/exam-results', icon: FileText }, //route pour afficher la liste des examens ExamResults.jsx
    { name: 'Prescriptions médicales', link: '/medical-prescriptions', icon: Pill }, //route pour PrescriptionForm.jsx
    { name: 'Prescriptions d\'examens', link: '/exam-prescriptions', icon: Stethoscope }, //ExamPrescription.jsx
    { name: 'Dossiers médicaux', link: '/medical-records', icon: ClipboardList }, // MedicalRecord.jsx
];

export function Doctor()
{
    return(
        <DashBoard linkList={links} requiredRole="Doctor">

            <PrescriptionForm2/>

        </DashBoard>
    )
}