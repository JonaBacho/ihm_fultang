import {
    Stethoscope,
    Weight,
    Thermometer,
    Activity,
    Heart,
    FileText,
    Ruler,
    AlertTriangle,
    PillIcon as Pills,
    Hospital,
    UserPlus,
    CalendarCheck,
    User, Calendar, MapPin, Phone, Printer, ArrowLeft
} from 'lucide-react';
import {useLocation, useNavigate} from "react-router-dom";
import { DoctorDashboard } from './DoctorComponents/DoctorDashboard.jsx';
import {doctorNavLink} from "./lib/doctorNavLink.js";
import { DoctorNavBar } from './DoctorComponents/DoctorNavBar.jsx';
import {useState} from "react";
import {useCalculateAge} from "../../Utils/compute.js";
import {formatDateOnly} from "../../Utils/formatDateMethods.js";
import MedicalParametersCard from "./DoctorComponents/MedicalParametersCard.jsx";
import MedicationPrescriptionCard from "./DoctorComponents/MedicationPrescriptionCard.jsx";
import ExamPrescriptionCard from "./DoctorComponents/ExamPrescriptionCard.jsx";
import SpecialistPrescriptionCard from "./DoctorComponents/SpecialistPrescriptionCard.jsx";
import AppointmentPrescriptionCard from "./DoctorComponents/AppointmentPrescriptionCard.jsx";
import DiagnosticCard from "./DoctorComponents/DiagnosticCard.jsx";



const availableExams = [
    { id: 1, name: "Radiographie pulmonaire", price: 15000 },
    { id: 2, name: "Analyse de sang complète", price: 25000 },
    { id: 3, name: "Scanner thoracique", price: 45000 },
]

const availableMedications = [
    { id: 1, name: "Paracétamol 1000mg" },
    { id: 2, name: "Ibuprofène 400mg" },
    { id: 3, name: "Amoxicilline 500mg" },
]

const availableSpecialists = [
    { id: 1, name: "Dr. Martin - Cardiologie" },
    { id: 2, name: "Dr. Dubois - Pneumologie" },
    { id: 3, name: "Dr. Bernard - Neurologie" },
]




const consultationSteps = [
    {
        id:0,
        name: 'diagnostic',
        label: 'Diagnostic',
        icon: Stethoscope
    },
    {
        id:1,
        name: 'prescriptions',
        label: 'Prescriptions',
        icon: Pills
    },
    {
        id:2,
        name: 'exams',
        label: 'Exams',
        icon: Hospital
    },
    {
        id:3,
        name: 'specialist prescription',
        label: 'Transfer to a specialist',
        icon: UserPlus
    },
    {
        id:4,
        name: 'appointment',
        label: 'Schedule an appointment',
        icon: CalendarCheck
    }
];


export function DoctorConsultationDetails() {



    const {state} = useLocation();
    const consultation = state?.consultation || {};
    const patientInfo = consultation?.idPatient;
    const medicalPageInfo = consultation?.idMedicalFolderPage;


    const [activeTab, setActiveTab] = useState("diagnostic");
    const [prescriptions, setPrescriptions] = useState([
        {
            id: Date.now(),
            medication: "",
            dosage: "",
            frequency: "",
            duration: "",
            instructions: "",
        },
    ]);
    const [exams, setExams] = useState([
        {
            id: Date.now(),
            exam: "",
            instructions: "",
            isCustom: false,
        },
    ]);
    const [diagnostic, setDiagnostic] = useState("");
    const [doctorNote, setDoctorNote] = useState("");
    const {calculateAge} = useCalculateAge();
    const { value: ageValue, unit: ageUnit } = calculateAge('2000-01-01');
    const MedicalParametersInfos = [
        {
            icon: Weight,
            label: 'Weight',
            value: medicalPageInfo?.parameters?.weight || '-',
            unit:  medicalPageInfo?.parameters?.weight && ' Kg'
        },
        {
            icon: Ruler,
            label: 'Height',
            value: medicalPageInfo?.parameters?.height || '-',
            unit: medicalPageInfo?.parameters?.height && ' m²'
        },
        {
            icon: Thermometer,
            label: 'Temperature',
            value: medicalPageInfo?.parameters?.temperature || '-',
            unit:  medicalPageInfo?.parameters?.temperature && '°C'
        },
        {
            icon: Activity,
            label: 'Blood Pressure',
            value: medicalPageInfo?.parameters?.bloodPressure || '-',
            unit: medicalPageInfo?.parameters?.bloodPressure && ' mmHg'
        },
        {
            icon: Heart,
            label: 'Heart Rate',
            value: medicalPageInfo?.parameters?.heartRate || '-',
            unit: medicalPageInfo?.parameters?.heartRate && ' bpm'
        },
        {
            icon: AlertTriangle,
            label: 'Allergies',
            value: medicalPageInfo?.parameters?.allergies || '-'
        },
        {
            icon: Pills,
            label: 'Family Medical History',
            value: medicalPageInfo?.parameters?.familyMedicalHistory || '-'
        },
        {
            icon: FileText,
            label: 'Current Medication',
            value: medicalPageInfo?.parameters?.currentMedication || '-'
        }
    ];




    function addPrescription (){
        setPrescriptions([
            ...prescriptions,
            {
                id: Date.now(),
                medication: "",
                dosage: "",
                frequency: "",
                duration: "",
                instructions: "",
            },
        ])
    }

    function getConsultationStepsStyles (isActive)  {
        return isActive
            ? 'border-b-4 border-primary-end text-primary-end font-bold'
            : 'text-gray-500 hover:text-gray-700';
    }


    function removePrescription (id) {
        setPrescriptions(prescriptions.filter((prescription) => prescription.id !== id))
    }


    function updatePrescription (id, field, value) {
        setPrescriptions(prescriptions.map((prescription) =>
            (
                prescription.id === id ?
                    {
                        ...prescription,
                        [field]: value
                    } :
                    prescription
            )
        ))
    }


    function addExam () {
        setExams([
            ...exams,
            {
                id: Date.now(),
                exam: "",
                instructions: "",
                isCustom: false,
            },
        ])
    }


    function removeExam (id)  {
        setExams(exams.filter((e) => e.id !== id))
    }


    function applyInputStyle ()
    {
        return "w-full p-3 border-2 border-gray-300 bg-white rounded-lg focus:outline-none  focus:border-primary-end focus:border-2 transition-all duration-500";
    }



    async function handleSubmit (e) {
        e.preventDefault()
        console.log("Soumission de la consultation:", {
            diagnostic,
            doctorNote,
            prescriptions,
            exams,
        })
    }



    const navigate = useNavigate();


    return (

        <DoctorDashboard linkList={doctorNavLink} requiredRole={"Doctor"}>
            < DoctorNavBar/>
            <div className="flex flex-col min-h-screen p-8 ">

                {/* Patient Infos */}
                <div className="bg-gradient-to-br from-primary-end to-primary-start rounded-lg shadow-lg p-6 mb-6">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                            <User className="w-12 h-12 text-black"/>
                        </div>
                        <div className="flex-1 flex flex-col gap-3">
                            <div className="flex justify-between">
                                <h1 className="text-3xl font-bold text-white">CONSULTATION
                                    OF {patientInfo?.firstName || 'NGOUPAYE DJIO'} {patientInfo?.lastName || 'Thierry'}</h1>

                                <p className="text-white font-bold text-xl">
                                    {formatDateOnly(new Date())}
                                </p>
                            </div>
                            <div className="mt-3.5 grid grid-cols-3 gap-4 font-semibold">
                                <div className="flex items-center gap-2 text-white">
                                    <Calendar className="w-6 h-6"/>
                                    <div className="flex">
                                        <span>Born on {patientInfo?.birthDate && formatDateOnly(patientInfo?.birthDate) || 'Not Specified'}</span>
                                        <div className="flex gap-1 mt-0.5 ">
                                            <span className="ml-2 text-white text-sm">({ageValue}</span>
                                            <span className="text-white text-sm">{ageUnit})</span>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-white">
                                        <MapPin className="w-6 h-6"/>
                                        <span>{patientInfo?.address || 'Not specified'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white">
                                        <Phone className="w-6 h-6"/>
                                        <span>{patientInfo?.phoneNumber || 'Not Specified'}</span>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>


                {/* Go back */}
                <div className="bg-gray-100 shadow-md rounded-lg mb-5 p-4 ">
                    <div className="flex justify-between items-center ">
                        <div className="flex justify-start">
                            <button onClick={() => navigate(-1)}
                                    className="text-secondary text-xl transition-all duration-300 font-bold flex gap-2 items-center">
                                <div className="w-8 h-8 border-2 rounded-full flex justify-center items-center border-secondary">
                                    <ArrowLeft/>
                                </div>
                                <p className="text-[17px] mt-0.5">Back To Consultation List</p>
                            </button>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={() => {
                                    alert("implementing print function")
                                }}
                                className="bg-secondary font-bold duration-300  text-white px-4 py-2 rounded-md hover:bg-primary-end hover:text-white transition-all mr-2">
                                <Printer size={20} className="inline mr-2"/>
                                Print
                            </button>
                        </div>
                    </div>
                </div>



                {/* Patient Parameters */}
                <div className="w-full mx-auto">
                    <div className="bg-gray-100 flex flex-col w-full rounded-lg  p-6">
                        <p className="font-bold text-xl ml-5 text-secondary">Patient Parameters</p>
                        <div className="grid grid-cols-4 gap-4 mt-6">
                            {MedicalParametersInfos.map((info, index) => (
                                <MedicalParametersCard
                                    key={index}
                                    icon={info.icon}
                                    label={info.label}
                                    value={info.value}
                                    unit={info.unit}
                                />
                            ))}
                        </div>
                    </div>


                    {/* Nurse Notes */}
                    <div className="mt-5 bg-gray-100 flex flex-col w-full rounded-lg  p-6 hover:shadow-lg hover:-translate-y-1.5 duration-500 transition-all">
                        <h3 className="mb-2 flex items-center font-bold text-xl ml-5 text-secondary">
                            Nurse Notes
                        </h3>
                        <p className="text-md text-gray-600">
                            {medicalPageInfo?.nurseNote || 'No note from the nurse'}
                        </p>
                    </div>


                    {/* Consultation Steps */}
                    <div className="mt-14">
                        <div className="flex space-x-14 mb-6 border-b">
                            {consultationSteps.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.name)}
                                    className={`pb-2 px-2 text-md transition-all duration-500 ease-in-out ${getConsultationStepsStyles(activeTab === tab.name)}`}
                                >
                                    <div className="flex items-center">
                                        <tab.icon className="h-5 w-5 mr-2"/>
                                        {tab.label}
                                    </div>
                                </button>
                            ))}
                        </div>
                        <form onSubmit={handleSubmit}>
                            {activeTab === "diagnostic" && <DiagnosticCard applyInputStyle={applyInputStyle} setDiagnostic={setDiagnostic} setDoctorNotes={setDoctorNote} diagnostic={diagnostic} doctorNotes={doctorNote}/>}
                            {activeTab === "prescriptions" && <MedicationPrescriptionCard prescriptions={prescriptions} availableMedications={availableMedications} updatePrescription={updatePrescription} removePrescription={removePrescription} addPrescription={addPrescription} applyInputStyle={applyInputStyle}/>}
                            {activeTab === "exams" && <ExamPrescriptionCard exams={exams} availableExams={availableExams} setExams={setExams} removeExam={removeExam} addExam={addExam} applyInputStyle={applyInputStyle}/>}
                            {activeTab === "specialist prescription" && <SpecialistPrescriptionCard availableSpecialists={availableSpecialists} applyInputStyle={applyInputStyle}/>}
                            {activeTab === "appointment" && <AppointmentPrescriptionCard applyInputStyle={applyInputStyle}/>}
                            <div className="mt-6 flex justify-end space-x-4">
                                <button type="submit"
                                        className="px-4 py-2 bg-primary-end hover:bg-primary-start transition-all duration-300 text-white font-bold rounded-lg">
                                    End consultation
                                </button>
                                <button
                                    type="button"
                                    className="px-4 py-2 border rounded-lg border-red-300 bg-red-500 transition-all duration-500  text-white font-bold hover:bg-red-700"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </DoctorDashboard>
    );
}

