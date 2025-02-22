"use client"

import { useState, useEffect } from "react"
import { Search, ChevronUp, ChevronDown, Filter, Calendar, User, Stethoscope } from "lucide-react"
import { laboratoryNavLink } from "./LaboratoryNavLink.js"
import { LaboratoryNavBar } from "./LaboratoryNavBar.jsx"
import { LaboratoryDashBoard } from "./LaboratoryDashBoard.jsx"
import { AppRoutesPaths } from "../../Router/appRouterPaths.js"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../Utils/axiosInstance.js"

function ExamCard({ exam }) {
    const navigate = useNavigate()
    const { id, idExam, idPatient, idMedicalStaff, examStatus, addDate } = exam
    const examName = idExam && idExam.examName ? idExam.examName : "Unnamed Exam"
    const patientName = idPatient ? `${idPatient.firstName} ${idPatient.lastName}` : "Unknown Patient"
    const doctorName = idMedicalStaff ? `${idMedicalStaff.first_name} ${idMedicalStaff.last_name}` : "Unknown Doctor"

    const statusConfig = {
        Completed: { color: "bg-green-100 text-green-800", icon: "✅" },
        Pending: { color: "bg-yellow-100 text-yellow-800", icon: "⏳" },
        Cancelled: { color: "bg-red-100 text-red-800", icon: "❌" },
    }

    const { color, icon } = statusConfig[examStatus] || statusConfig["Pending"]

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-2xl transition-all duration-300">
            <h3 className="text-xl font-bold text-primary-end mb-4">{examName}</h3>
            <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                    <User className="w-5 h-5 mr-2 text-primary-start" />
                    <span>{patientName}</span>
                </div>
                <div className="flex items-center text-gray-600">
                    <Stethoscope className="w-5 h-5 mr-2 text-primary-start" />
                    <span>{doctorName}</span>
                </div>
                <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-2 text-primary-start" />
                    <span>{new Date(addDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
            {icon} {examStatus}
          </span>
                </div>
            </div>
            <div className="mt-4 text-right">
                <button
                    className="text-white px-4 py-2 rounded-lg bg-gradient-to-r from-primary-end to-primary-start font-bold text-sm hover:from-primary-start hover:to-primary-end transition-all duration-300"
                    onClick={() => navigate(`${AppRoutesPaths.laboratoryExamenDetail.replace(":id", id)}`)}
                >
                    View Details
                </button>
            </div>
        </div>
    )
}

export function ExamenList() {
    const [exams, setExams] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [showFilters, setShowFilters] = useState(false)
    const [filterStatus, setFilterStatus] = useState("all")
    const [sortBy, setSortBy] = useState("date")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchExamRequest() {
            setIsLoading(true)
            try {
                const response = await axiosInstance.get("/exam-request/")
                setIsLoading(false)
                if (response.status === 200) {
                    const examsArray = Array.isArray(response.data) ? response.data : response.data.results || []
                    const transformedExams = examsArray.map((exam) => ({
                        id: exam.id,
                        idExam: exam.idExam,
                        idPatient: exam.idPatient,
                        idMedicalStaff: exam.idMedicalStaff,
                        examStatus: exam.examStatus,
                        addDate: exam.addDate,
                        notes: exam.notes,
                    }))
                    setExams(transformedExams)
                }
            } catch (error) {
                setIsLoading(false)
                console.error("Error loading exams:", error)
            }
        }
        fetchExamRequest()
    }, [])

    const filteredExams = exams.filter(
        (exam) =>
            (filterStatus === "all" || exam.examStatus === filterStatus) &&
            ((exam.idExam && exam.idExam.examName && exam.idExam.examName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (exam.idPatient &&
                    `${exam.idPatient.firstName} ${exam.idPatient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (exam.idMedicalStaff &&
                    `${exam.idMedicalStaff.first_name} ${exam.idMedicalStaff.last_name}`
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()))),
    )

    const sortedExams = [...filteredExams].sort((a, b) => {
        if (sortBy === "date") return new Date(b.addDate) - new Date(a.addDate)
        if (sortBy === "examName") {
            const nameA = a.idExam?.examName?.toLowerCase() || ""
            const nameB = b.idExam?.examName?.toLowerCase() || ""
            return nameA.localeCompare(nameB)
        }
        if (sortBy === "patientName") {
            const patientA = a.idPatient ? `${a.idPatient.firstName} ${a.idPatient.lastName}`.toLowerCase() : ""
            const patientB = b.idPatient ? `${b.idPatient.firstName} ${b.idPatient.lastName}`.toLowerCase() : ""
            return patientA.localeCompare(patientB)
        }
        if (sortBy === "doctorName") {
            const doctorA = a.idMedicalStaff
                ? `${a.idMedicalStaff.first_name} ${a.idMedicalStaff.last_name}`.toLowerCase()
                : ""
            const doctorB = b.idMedicalStaff
                ? `${b.idMedicalStaff.first_name} ${b.idMedicalStaff.last_name}`.toLowerCase()
                : ""
            return doctorA.localeCompare(doctorB)
        }
        return 0
    })

    return (
        <LaboratoryDashBoard linkList={laboratoryNavLink} requiredRole={"Labtech"}>
            <LaboratoryNavBar />
            <div className="min-h-screen bg-gray-100 p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-gradient-to-r from-primary-end to-primary-start rounded-xl text-white p-8 mb-8 shadow-lg">
                        <h1 className="text-3xl font-bold mb-2">Examination List</h1>
                        <p className="opacity-90">Find the complete examination history of the laboratory here.</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-grow">
                                <input
                                    type="text"
                                    placeholder="Search by exam, patient, or doctor"
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-end focus:border-primary-end transition-all duration-300"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                            </div>
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center px-4 py-2 bg-secondary text-white rounded-lg hover:bg-primary-end transition-colors duration-300"
                            >
                                <Filter size={20} className="mr-2" />
                                Filters
                                {showFilters ? <ChevronUp size={20} className="ml-2" /> : <ChevronDown size={20} className="ml-2" />}
                            </button>
                        </div>

                        {showFilters && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <div className="flex flex-wrap gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                        <select
                                            value={filterStatus}
                                            onChange={(e) => setFilterStatus(e.target.value)}
                                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-end focus:border-primary-end sm:text-sm rounded-lg"
                                        >
                                            <option value="all">All</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-end focus:border-primary-end sm:text-sm rounded-lg"
                                        >
                                            <option value="date">Date</option>
                                            <option value="examName">Exam Name</option>
                                            <option value="patientName">Patient Name</option>
                                            <option value="doctorName">Doctor Name</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {isLoading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-end"></div>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {sortedExams.map((exam) => (
                                <ExamCard key={exam.id} exam={exam} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </LaboratoryDashBoard>
    )
}

