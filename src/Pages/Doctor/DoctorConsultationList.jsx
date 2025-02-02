import { useState } from "react"
import { Search, Calendar} from "lucide-react"
import {DoctorDashboard} from "./DoctorComponents/DoctorDashboard.jsx";
import {doctorNavLink} from "./lib/doctorNavLink.js";
import {DoctorNavBar} from "./DoctorComponents/DoctorNavBar.jsx";
import ConsultationCard from "./DoctorComponents/ConsultationCard.jsx";



const mockConsultations = [
    {
        id: 1,
        patientName: "Sophie Martin",
        birthDate: "1990-05-15",
        age: 34,
        phoneNumber: "06 12 34 56 78",
        appointmentTime: "09:00",
        arrivalTime: "08:45",
        reason: "Consultation de suivi - Diabète",
        isUrgent: false,
    },
    {
        id: 2,
        patientName: "Lucas Bernard",
        age: 28,
        birthDate: "1990-05-15",
        phoneNumber: "06 98 76 54 32",
        appointmentTime: "09:30",
        arrivalTime: "09:20",
        reason: "Première consultation - Maux de tête",
        isUrgent: true,
    },
    {
        id: 3,
        patientName: "Emma Petit",
        age: 45,
        birthDate: "1990-05-15",
        phoneNumber: "06 23 45 67 89",
        appointmentTime: "10:00",
        arrivalTime: "09:45",
        reason: "Renouvellement ordonnance",
        isUrgent: false,
    },
    {
        id: 4,
        patientName: "Thomas Dubois",
        age: 52,
        birthDate: "1990-05-15",
        phoneNumber: "06 34 56 78 90",
        appointmentTime: "10:30",
        arrivalTime: "10:15",
        reason: "Douleurs lombaires",
        isUrgent: false,
    },
    {
        id: 5,
        patientName: "Julie Moreau",
        age: 39,
        birthDate: "1990-05-15",
        phoneNumber: "06 45 67 89 01",
        appointmentTime: "11:00",
        arrivalTime: "10:30",
        reason: "Suivi grossesse",
        isUrgent: false,
    },
    {
        id: 6,
        patientName: "Paul Lambert",
        age: 63,
        birthDate: "1990-05-15",
        phoneNumber: "06 56 78 90 12",
        appointmentTime: "11:30",
        arrivalTime: "11:15",
        reason: "Contrôle tension",
        isUrgent: true,
    },
]

export  function DoctorConsultationList() {
    const [searchTerm, setSearchTerm] = useState("");
    const currentDate = new Date().toLocaleDateString("en-EN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const filteredConsultations = mockConsultations
        .filter(
            (consultation) =>
                consultation?.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                consultation?.consultationReason.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        .sort((a, b) => a.arrivalTime.localeCompare(b.arrivalTime))





    return (

        <DoctorDashboard linkList={doctorNavLink} requiredRole={"Doctor"}>
            <DoctorNavBar/>
            <div className="mx-auto p-6">
                <div className="mb-8">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">Consultations of the day</h1>
                            <div className="flex items-center text-gray-600">
                                <Calendar className="h-5 w-5 mr-2" />
                                <span className="capitalize">{currentDate}</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Search for a patient or reason for consultation..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-2 focus:border-primary-end"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredConsultations.map((consultation) => (
                        <ConsultationCard key={consultation.id} consultation={consultation} />
                    ))}
                </div>
            </div>
        </DoctorDashboard>
    )
}

