import { DashBoard } from '../../GlobalComponents/DashBoard.jsx';
import {Users, Calendar, ClipboardList, Pill, FileText, Stethoscope} from 'lucide-react';

const links = [
    { name: 'Rendez-vous', link: '/appointments', icon: Calendar }, //route pour afficher le formulaire de rendez-vous Appointment.jsx
    { name: 'Résultats d\'examens', link: '/exam-results', icon: FileText }, //route pour afficher la liste des examens ExamResults.jsx
    { name: 'Prescriptions médicales', link: '/medical-prescriptions', icon: Pill }, //route pour PrescriptionForm.jsx
    { name: 'Prescriptions d\'examens', link: '/exam-prescriptions', icon: Stethoscope }, //ExamPrescription.jsx
    { name: 'Dossiers médicaux', link: '/medical-records', icon: ClipboardList }, // MedicalRecord.jsx
    { name: 'Liste des patients', link: '/patient-list', icon: Users }, // PatientList.jsx
];

export function Doctor()
{
    return(
        <DashBoard linkList={links} requiredRole="doctor">
            <h2>Bienvenue dans le tableau de bord du médecin !</h2>
        </DashBoard>
    )
}