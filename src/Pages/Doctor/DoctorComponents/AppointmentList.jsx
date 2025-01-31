import { useState } from "react"
import { Search, Calendar, Clock, MapPin, Phone, ChevronLeft, ChevronRight, CheckCircle, Eye } from "lucide-react"
import AppointmentCard from "./AppointmentCard.jsx";
import {useAuthentication} from "../../../Utils/Provider.jsx";
import {DoctorDashboard} from "./DoctorDashboard.jsx";
import {doctorNavLink} from "./doctorNavLink.js";
import {DoctorNavBar} from "./DoctorNavBar.jsx";

// Données simulées
const mockAppointments = [
    {
        id: 1,
        patientName: "Sophie Martin",
        patientId: "P12345",
        date: "2024-02-15",
        time: "09:00",
        reason: "Suivi diabète",
        status: "upcoming",
        location: "Cabinet 3",
        phoneNumber: "06 12 34 56 78",
    },
    {
        id: 2,
        patientName: "Lucas Bernard",
        patientId: "P12346",
        date: "2024-02-15",
        time: "10:30",
        reason: "Consultation grippe",
        status: "upcoming",
        location: "Cabinet 2",
        phoneNumber: "06 23 45 67 89",
    },
    {
        id: 3,
        patientName: "Emma Petit",
        patientId: "P12347",
        date: "2024-01-28",
        time: "14:00",
        reason: "Contrôle annuel",
        status: "completed",
        location: "Cabinet 1",
        phoneNumber: "06 34 56 78 90",
    },
    {
        id: 4,
        patientName: "Thomas Dubois",
        patientId: "P12348",
        date: "2024-01-27",
        time: "11:15",
        reason: "Suivi post-opératoire",
        status: "completed",
        location: "Cabinet 3",
        phoneNumber: "06 45 67 89 01",
    },
]

export  function AppointmentList() {
    const [filter, setFilter] = useState("upcoming")
    const [searchTerm, setSearchTerm] = useState("")
    const [dateFilter, setDateFilter] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const appointmentsPerPage = 5

    const filteredAppointments = mockAppointments.filter((appointment) => {
        const matchesFilter = filter === "all" || appointment.status === filter
        const matchesSearch =
            appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.patientId.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesDate = dateFilter ? appointment.date === dateFilter : true
        return matchesFilter && matchesSearch && matchesDate
    })


    const indexOfLastAppointment = currentPage * appointmentsPerPage
    const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage
    const currentAppointments = filteredAppointments.slice(indexOfFirstAppointment, indexOfLastAppointment)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const {userData} = useAuthentication();


    return (
        <DoctorDashboard linkList={doctorNavLink} requiredRole={"Doctor"}>
            <DoctorNavBar/>
            <div className="mx-auto p-6 h-fit">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">{`Appointments of Dr. ${userData?.first_name + " " + userData?.last_name}`}</h1>
                {/* Filtres et recherche */}
                <div className="mb-8 space-y-4">
                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={() => setFilter("upcoming")}
                            className={`px-4 py-2 rounded-md hover:bg-primary-start duration-300 transition-all ${filter === "upcoming" ? "bg-primary-end text-white font-bold " : "bg-gray-100 text-gray-800 hover:bg-gray-200"} transition-colors`}
                        >
                            Upcoming appointments
                        </button>
                        <button
                            onClick={() => setFilter("completed")}
                            className={`px-4 py-2 rounded-md hover:bg-primary-start duration-300 transition-all  hover:text-white ${
                                filter === "completed" ? "bg-primary-end text-white font-bold " : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            } transition-colors`}
                        >
                            Honored appointments
                        </button>
                        <button
                            onClick={() => setFilter("all")}
                            className={`px-4 py-2 rounded-md  hover:bg-primary-start duration-300 transition-all hover:text-white ${filter === "all" ? "bg-primary-end text-white font-bold" : "bg-gray-100 text-gray-800 hover:bg-gray-200"} transition-colors`}
                        >
                            All appointments
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search for a patient..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-0 focus:outline-none focus:border-2 focus:border-primary-end"
                            />
                        </div>
                        <div className="flex items-center">
                            <Calendar className="text-gray-400 mr-2" />
                            <input
                                type="date"
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-md  focus:ring-0 focus:outline-none focus:border-2 focus:border-primary-end "
                            />
                        </div>
                    </div>
                </div>

                {/* Liste des rendez-vous */}
                <div className="space-y-6">
                    {currentAppointments.map((appointment) => (
                        <AppointmentCard key={appointment.id} appointment={appointment} />
                    ))}
                </div>

                {/* Pagination */}
                {filteredAppointments.length > appointmentsPerPage && (
                    <div className="mt-8 flex justify-center">
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                                <span className="sr-only">Précédent</span>
                                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                            </button>
                            {Array.from({ length: Math.ceil(filteredAppointments.length / appointmentsPerPage) }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => paginate(index + 1)}
                                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                                        currentPage === index + 1
                                            ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                                            : "text-gray-500 hover:bg-gray-50"
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === Math.ceil(filteredAppointments.length / appointmentsPerPage)}
                                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRight className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </nav>
                    </div>
                )}
            </div>
        </DoctorDashboard>
    )
}

