import {
    Stethoscope,
    Weight,
    Thermometer,
    Activity,
    Heart,
    FileText,
    ClipboardList,
    Ruler,
    AlertTriangle,
    PillIcon as Pills,
    Hospital,
    UserPlus,
    CalendarCheck,
    MinusCircle,
    PlusCircle
} from 'lucide-react';
import {useNavigate} from "react-router-dom";
import { DoctorDashboard } from './DoctorDashboard.jsx';
import {doctorNavLink} from "./doctorNavLink.js";
import { DoctorNavBar } from './DoctorNavBar.jsx';
import {useState} from "react";



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



const consultationData = {
    id: 1,
    patientName: "Jean Dupont",
    patientAge: 45,
    doctorName: "Dr. Marie Claire",
    date: "2024-01-28",
    time: "09:00",
    status: "Finished",
    price: 25000,
    parameters: {
        temperature: 37.2,
        bloodPressure: "120/80",
        heartRate: 72,
        respiratoryRate: 16,
        weight: 70,
        height: 1.89,
    },
    diagnosis: "Grippe saisonnière",
    prescriptions: [
        { medication: "Paracétamol", dosage: "1000mg", frequency: "3 fois par jour", duration: "5 jours" },
        { medication: "Ibuprofène", dosage: "400mg", frequency: "2 fois par jour", duration: "3 jours" }
    ],
    notes: "Le patient présente des symptômes typiques de la grippe. Repos recommandé pendant 3-5 jours. Suivi téléphonique dans une semaine si les symptômes persistent."
};


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
        name: 'referral',
        label: 'Transfer to a specialist',
        icon: UserPlus
    },
    {
        id:4,
        name: 'followup',
        label: 'Schedule an appointment',
        icon: CalendarCheck
    }
];


export function DoctorConsultationDetails() {



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
    const [doctorNotes, setDoctorNotes] = useState("");




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
            ? 'border-b-4 border-blue-500 text-blue-600 font-bold'
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


    async function handleSubmit (e) {
        e.preventDefault()
        console.log("Soumission de la consultation:", {
            diagnostic,
            doctorNotes,
            prescriptions,
            exams,
        })
    }


    const navigate = useNavigate();


    return (

        <DoctorDashboard linkList={doctorNavLink} requiredRole={"Doctor"}>
            < DoctorNavBar/>
            <div className="flex flex-col min-h-screen p-8 ">
                <div className="bg-gradient-to-r from-primary-end to-primary-start rounded-lg p-6 text-white mb-5">
                    <h1 className="text-3xl font-bold mb-2">Consultation of NGOUPAYE Thierry - 2025/06/23</h1>
                    <p className="opacity-90 font-semibold text-md">
                        This summary details the consultation of Mr NGOUPAYE Thierry with Dr. Tchassi Daniel, including
                        the diagnosis established, the examinations performed and the treatment prescribed.
                    </p>
                </div>



                {/*
                <div className="bg-gray-100 shadow-md rounded-lg mb-5 p-4 ">
                    <div className="flex justify-between items-center ">
                        <div className="flex justify-start">
                            <button onClick={() => navigate(-1)}
                                    className="text-secondary text-xl hover:text-primary-end transition-all duration-300 font-bold flex items-center">
                                <ArrowLeft/>
                                Back To Consultation List
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
                */}



                <div className="w-full mx-auto">
                    {/* En-tête du patient */}
                    <div className="bg-gray-100 flex flex-col w-full rounded-lg  p-6">
                       <p className="font-bold text-xl ml-5 text-secondary">Patient Parameters</p>
                        {/* Paramètres vitaux */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                            <div className="bg-white p-3 rounded-lg">
                                <div className="flex items-center text-gray-600">
                                    <Weight className="h-5 w-5 mr-2 text-blue-500"/>
                                    <span className="text-sm">Poids</span>
                                </div>
                                <p className="text-lg font-semibold mt-1">70 Kg</p>
                            </div>

                            <div className="bg-white p-3 rounded-lg">
                                <div className="flex items-center text-gray-600">
                                    <Ruler className="h-5 w-5 mr-2 text-blue-500"/>
                                    <span className="text-sm">Taille</span>
                                </div>
                                <p className="text-lg font-semibold mt-1">1.89 m²</p>
                            </div>

                            <div className="bg-white p-3 rounded-lg">
                                <div className="flex items-center text-gray-600">
                                    <Thermometer className="h-5 w-5 mr-2 text-blue-500"/>
                                    <span className="text-sm">Température</span>
                                </div>
                                <p className="text-lg font-semibold mt-1">37.2°C</p>
                            </div>

                            <div className="bg-white p-3 rounded-lg">
                                <div className="flex items-center text-gray-600">
                                    <Activity className="h-5 w-5 mr-2 text-blue-500"/>
                                    <span className="text-sm">Tension</span>
                                </div>
                                <p className="text-lg font-semibold mt-1">120/80 mmHg</p>
                            </div>

                            <div className="bg-white p-3 rounded-lg">
                                <div className="flex items-center text-gray-600">
                                    <Heart className="h-5 w-5 mr-2 text-blue-500"/>
                                    <span className="text-sm">Pouls</span>
                                </div>
                                <p className="text-lg font-semibold mt-1">72 bpm</p>
                            </div>

                            <div className="bg-white p-3 rounded-lg">
                                <div className="flex items-center text-gray-600">
                                    <AlertTriangle className="h-5 w-5 mr-2 text-blue-500"/>
                                    <span className="text-sm">Allergies</span>
                                </div>
                                <p className="text-lg font-semibold mt-1">Poussière</p>
                            </div>

                            <div className="bg-white p-3 rounded-lg">
                                <div className="flex items-center text-gray-600">
                                    <Pills className="h-5 w-5 mr-2 text-blue-500"/>
                                    <span className="text-sm">Médicaments</span>
                                </div>
                                <p className="text-lg font-semibold mt-1">Ventoline</p>
                            </div>

                            <div className="bg-white p-3 rounded-lg">
                                <div className="flex items-center text-gray-600">
                                    <FileText className="h-5 w-5 mr-2 text-blue-500"/>
                                    <span className="text-sm">Antécédents</span>
                                </div>
                                <p className="text-lg font-semibold mt-1">Asthme</p>
                            </div>
                        </div>


                        {/* Notes infirmière */}
                        <div className="mt-20">
                            <h3 className="mb-2 flex items-center font-bold text-xl ml-5 text-secondary">
                                <ClipboardList className="h-5 w-5 mr-2 text-blue-500"/>
                                Nurse Notes
                            </h3>
                            <p className="text-sm text-gray-600">
                                Patient se plaint de fièvre et de toux depuis 2 jours. Pas de difficultés
                                respiratoires notables.
                            </p>
                        </div>

                    </div>

                    {/* Formulaire de consultation */}
                    <div className="mt-14">

                        <div className="flex space-x-4 mb-6 border-b">
                            {consultationSteps.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.name)}
                                    className={`pb-4 px-2 text-md transition-all duration-500 ease-in-out ${getConsultationStepsStyles(activeTab === tab.name)}`}
                                >
                                    <div className="flex items-center">
                                        <tab.icon className="h-5 w-5 mr-2"/>
                                        {tab.label}
                                    </div>
                                </button>
                            ))}
                        </div>

                        <form onSubmit={handleSubmit}>
                            {/* Diagnostic */}
                            {activeTab === "diagnostic" && (
                                <div className="space-y-6">
                                    <div>
                                        <label
                                            className="block text-sm font-medium text-gray-700 mb-2">Diagnostic</label>
                                        <input
                                            required
                                            type="text"
                                            value={diagnostic}
                                            onChange={(e) => setDiagnostic(e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Entrez le diagnostic"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Doctor Notes</label>
                                        <textarea
                                            value={doctorNotes}
                                            required
                                            onChange={(e) => setDoctorNotes(e.target.value)}
                                            rows={3}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Ajoutez vos observations"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Prescriptions */}
                            {activeTab === "prescriptions" && (
                                <div className="space-y-6">
                                    {prescriptions.map((prescription, index) => (
                                        <div key={prescription.id || index} className="bg-gray-50 p-4 rounded-lg relative">
                                            <button
                                                type="button"
                                                onClick={() => removePrescription(prescription.id)}
                                                className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                                            >
                                                <MinusCircle className="h-5 w-5"/>
                                            </button>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label
                                                        className="block text-sm font-medium text-gray-700 mb-2">Medicine</label>
                                                    <select
                                                        value={prescription.medication}
                                                        onChange={(e) => updatePrescription(prescription.id, "medication", e.target.value)}
                                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    >
                                                        <option value="">Select a medication</option>
                                                        {availableMedications.map((med) => (
                                                            <option key={med.id} value={med.name}>
                                                                {med.name}
                                                            </option>
                                                        ))}
                                                        <option value={"Other"}>Other Medication</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label
                                                        className="block text-sm font-medium text-gray-700 mb-2">Dosage</label>
                                                    <input
                                                        type="text"
                                                        value={prescription.dosage}
                                                        onChange={(e) => updatePrescription(prescription.id, "dosage", e.target.value)}
                                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                        placeholder="Eg: 1000mg"
                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                                                    <input
                                                        type="text"
                                                        value={prescription.frequency}
                                                        onChange={(e) => updatePrescription(prescription.id, "frequency", e.target.value)}
                                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                        placeholder="Eg: 3 times per day"
                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                                                    <input
                                                        type="text"
                                                        value={prescription.duration}
                                                        onChange={(e) => updatePrescription(prescription.id, "duration", e.target.value)}
                                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                        placeholder="Ex: 5 jours"
                                                    />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label
                                                        className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
                                                    <textarea
                                                        value={prescription.instructions}
                                                        onChange={(e) => updatePrescription(prescription.id, "instructions", e.target.value)}
                                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                        placeholder="Instructions spéciales"
                                                        rows={2}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addPrescription}
                                        className="flex items-center text-blue-600 hover:text-blue-700"
                                    >
                                        <PlusCircle className="h-5 w-5 mr-2"/>
                                        Add a medication
                                    </button>
                                </div>
                            )}

                            {/* Exams */}
                            {activeTab === "exams" && (
                                <div className="space-y-6">
                                    {exams.map((exam, index) => (
                                        <div key={exam.id || index} className="bg-gray-100 p-4 rounded-lg relative">
                                            <button
                                                type="button"
                                                onClick={() => removeExam(exam.id)}
                                                className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                                            >
                                                <MinusCircle className="h-5 w-5"/>
                                            </button>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Exam Type</label>
                                                    <select
                                                        value={exam.exam}
                                                        onChange={(e) => {
                                                            const isCustom = e.target.value === "another"
                                                            setExams(exams.map((ex) => (ex.id === exam.id ? {
                                                                ...ex,
                                                                exam: e.target.value,
                                                                isCustom: isCustom,
                                                            } : ex)))
                                                        }}
                                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    >
                                                        <option value="">Select an exam</option>
                                                        {availableExams.map((e) => (
                                                            <option key={e.id} value={e.name}>
                                                                {e.name} - {e.price} FCFA
                                                            </option>
                                                        ))}
                                                        <option value={"another"}>Another Exam</option>
                                                    </select>
                                                </div>
                                                {exam.isCustom && (
                                                    <div className="col-span-2">
                                                        <input
                                                            type="text"
                                                            placeholder="Specify the exam"
                                                            onChange={(e)=> setExams(exams.map((ex) => (ex.id === exam.id ? {...ex, exam: e.target.value} : ex)))}
                                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                        />
                                                    </div>
                                                )}
                                                <div className="col-span-2">
                                                    <label
                                                        className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
                                                    <textarea
                                                        value={exam.instructions}
                                                        onChange={(e) =>
                                                            setExams(
                                                                exams.map((ex) => (ex.id === exam.id ? {
                                                                    ...ex,
                                                                    instructions: e.target.value
                                                                } : ex)),
                                                            )
                                                        }
                                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                        placeholder="Special instructions for the exam"
                                                        rows={2}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <button type="button" onClick={addExam}
                                            className="flex items-center text-blue-600 hover:text-blue-700">
                                        <PlusCircle className="h-5 w-5 mr-2"/>
                                        Add an exam
                                    </button>
                                </div>
                            )}

                            {/* Specialist Prescription */}
                            {activeTab === "referral" && (
                                <div className="space-y-6">
                                    <div>
                                        <label
                                            className="block text-sm font-medium text-gray-700 mb-2">Specialist</label>
                                        <select
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                            <option value="">Select a specialist</option>
                                            {availableSpecialists.map((specialist) => (
                                                <option key={specialist.id} value={specialist.id}>
                                                    {specialist.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Reason for prescription</label>
                                        <textarea
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            rows={2}
                                            placeholder="Raison du transfert vers le spécialiste"
                                        />
                                    </div>
                                    {/*
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Hospitalisation
                                            requise ?</label>
                                        <div className="flex items-center space-x-4">
                                            <label className="flex items-center">
                                                <input type="radio" name="hospitalization" value="no" className="mr-2"/>
                                                Non
                                            </label>
                                            <label className="flex items-center">
                                                <input type="radio" name="hospitalization" value="yes"
                                                       className="mr-2"/>
                                                Oui
                                            </label>
                                        </div>
                                    </div>
                                    */}
                                </div>
                            )}

                            {/* Appointment */}
                            {activeTab === "followup" && (
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Date of next appointment</label>
                                        <input
                                            type="date"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Appointment time</label>
                                        <input
                                            type="time"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Instructions for tracking</label>
                                        <textarea
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            rows={2}
                                            placeholder="Instructions spéciales pour le prochain rendez-vous"
                                        />
                                    </div>
                                </div>
                            )}


                            <div className="mt-6 flex justify-end space-x-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 border rounded-lg border-red-300 bg-red-500 transition-all duration-500rounded-lg text-white font-bold hover:bg-red-700"
                                >
                                    Cancel
                                </button>
                                <button type="submit"
                                        className="px-4 py-2 bg-primary-end text-white rounded-lg">
                                    End consultation
                                </button>
                            </div>


                        </form>
                    </div>
                </div>


            </div>
        </DoctorDashboard>
    );
}

