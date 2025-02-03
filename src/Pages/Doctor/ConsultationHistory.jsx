import { useState } from "react"
import { Search, Calendar, Eye, User, Clock, DollarSign } from "lucide-react"
import {DoctorDashboard} from "./DoctorComponents/DoctorDashboard.jsx";
import {doctorNavLink} from "./lib/doctorNavLink.js";
import {DoctorNavBar} from "./DoctorComponents/DoctorNavBar.jsx";
import {useCalculateAge} from "../../Utils/compute.js";
import {formatDateOnly, formatDateToTime} from "../../Utils/formatDateMethods.js";
import {getStateStyles} from "./lib/applyStyleFunction.js";
import {useNavigate} from "react-router-dom";


// Données simulées
const mockConsultations = [
    {
        id: 1,
        patientName: "Jean Dupont",
        patientId: "P12345",
        date: "2024-01-28",
        time: "09:00",
        reason: "Consultation de suivi - Diabète",
        status: "completed",
        price: 25000,
        diagnostic: "Diabète de type 2 bien contrôlé",
        vitals: {
            weight: "75 Kg",
            height: "1.75 m",
            temperature: "36.8°C",
            bloodPressure: "130/85 mmHg",
            heartRate: "72 bpm",
        },
        prescriptions: [
            {
                medication: "Metformine",
                dosage: "1000mg",
                frequency: "2 fois par jour",
                duration: "3 mois",
            },
        ],
        exams: [
            {
                name: "Glycémie à jeun",
                instructions: "À faire le matin à jeun",
            },
        ],
        nurseNotes: "Patient stable. Pas de plaintes particulières.",
        doctorNotes: "Bon contrôle glycémique. Continuer le traitement actuel.",
    },
    {
        id: 2,
        patientName: "Marie Lambert",
        patientId: "P12346",
        date: "2024-01-28",
        time: "10:30",
        reason: "Grippe saisonnière",
        status: "completed",
        price: 15000,
        diagnostic: "Syndrome grippal",
        vitals: {
            weight: "62 Kg",
            height: "1.65 m",
            temperature: "38.5°C",
            bloodPressure: "120/80 mmHg",
            heartRate: "88 bpm",
        },
        prescriptions: [
            {
                medication: "Paracétamol",
                dosage: "1000mg",
                frequency: "3 fois par jour",
                duration: "5 jours",
            },
        ],
        nurseNotes: "Fièvre et courbatures depuis 2 jours",
        doctorNotes: "Repos recommandé. Surveillance de la température.",
    },
]

export function ConsultationHistory() {
    const [searchTerm, setSearchTerm] = useState("")
    const [dateFilter, setDateFilter] = useState("")


    const filteredConsultations = mockConsultations.filter((consultation) => {
        const matchesSearch =
            consultation.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            consultation.patientId.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesDate = dateFilter ? consultation.date === dateFilter : true
        return matchesSearch && matchesDate
    })

    const navigate = useNavigate();

    const {calculateAge} = useCalculateAge();
    const { value: ageValue, unit: ageUnit } = calculateAge('2000-01-01');


    return (
        <DoctorDashboard linkList={doctorNavLink} requiredRole={"Doctor"}>
            <DoctorNavBar/>
            <div className="mx-auto p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">History of Consultations</h1>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Rechercher un patient..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <Calendar className="text-gray-400 h-5 w-5" />
                        <input
                            type="date"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                </div>

                {/* consultation List */}
                <div className="bg-white">
                    <div className>
                        <table className="w-full border-separate border-spacing-y-2 ">
                            <thead >
                            <tr>
                                <th className="px-6 py-5  bg-primary-end rounded-l-xl text-center text-md text-white font-bold uppercase   ">
                                    Patient
                                </th>
                                <th className="px-6 py-5 bg-primary-end text-center text-md text-white font-bold uppercase ">
                                    Date & Time
                                </th>
                                <th className="px-6 py-5 bg-primary-end text-center text-md text-white font-bold uppercase ">
                                    Reason for consultation
                                </th>
                                <th className="px-6 py-5 bg-primary-end text-center text-md text-white font-bold uppercase ">
                                    patient condition
                                </th>
                                <th className="px-6 py-5 bg-primary-end text-center text-md text-white font-bold uppercase ">Price</th>
                                <th className="px-6 py-5 text-center text-md text-white font-bold bg-primary-end rounded-r-xl uppercase ">
                                    Action
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white  border-separate ">
                            {filteredConsultations.map((consultation) =>
                            {
                                const patientInfo = consultation?.idPatient;
                                return(
                                    <tr key={consultation.id} className="">
                                        <td className={`px-6 py-5 rounded-l-xl bg-gray-100  border-l-4  ${getStateStyles(consultation?.statePatient).container}`}>
                                            <div className="w-full flex items-center justify-center">
                                                <User className="h-6 w-6 text-gray-400 mr-2"/>
                                                <div>
                                                    <div
                                                        className="text-md font-medium text-gray-900">{patientInfo?.firstName + " " + patientInfo?.lastName}</div>
                                                    <div className="text-md text-gray-500">{ageValue + " "+ ageUnit }</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 bg-gray-100 ">
                                            <div className="w-full flex justify-center items-center ">
                                                <Clock className="h-5 w-5 text-gray-400 mr-2 mt-2"/>
                                                <div>
                                                    <div className="text-sm text-center text-gray-900">{ consultation?.consultationDate ? formatDateOnly(consultation?.consultationDate) : 'Not Specified'}</div>
                                                    <div className="text-sm  text-center text-gray-500">{consultation?.consultationDate ? formatDateToTime(consultation?.consultationDate) : 'Not Specified'} </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 bg-gray-100">
                                            <div className="text-sm text-center text-gray-900">{consultation?.consultationReason || 'Not Specified'}</div>
                                        </td>
                                        <td className="px-6 py-4 bg-gray-100 ">
                                            <div className="flex items-center justify-center text-sm text-gray-900">
                                                <span className={`px-2 py-1 rounded-full border-2 text-sm font-medium ${getStateStyles(consultation?.statePatient).badge}`}>
                                                     {consultation?.statePatient || 'Not Critical'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 bg-gray-100 ">
                                            <div className="flex items-center justify-center text-sm text-gray-900">
                                                <DollarSign className="h-5 w-5 text-gray-400 mr-1"/>
                                                {consultation?.consultationPrice ? consultation?.consultationPrice.toLocaleString() + ' FCFA' : ' - '}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5  bg-gray-100 rounded-r-xl">
                                            <button
                                                onClick={()=>{navigate(`/doctor/consultation-history/details/${consultation?.id}`, {state: consultation})}}
                                                className="flex items-center text-primary-end hover:text-primary-start font-bold hover:text-[17px] transition-all duration-500"
                                            >
                                                <Eye className="h-5 w-5 mr-1"/>
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </DoctorDashboard>
    )
}

