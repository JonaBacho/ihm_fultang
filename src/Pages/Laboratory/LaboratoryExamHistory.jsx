"use client"

import { useState, useEffect, useCallback } from "react"
import { Search, Calendar, Eye, User, Stethoscope, Clock } from "lucide-react"
import { laboratoryNavLink } from "./LaboratoryNavLink.js"
import { LaboratoryNavBar } from "./LaboratoryNavBar.jsx"
import { LaboratoryDashBoard } from "./LaboratoryDashBoard.jsx"
import { useAuthentication } from "../../Utils/Provider.jsx"
import Loader from "../../GlobalComponents/Loader.jsx"
import ServerErrorPage from "../../GlobalComponents/ServerError.jsx"
import { formatDateOnly, formatDateToTime } from "../../Utils/formatDateMethods.js"
import {AppRoutesPaths} from "../../Router/appRouterPaths.js";
import {useNavigate} from "react-router-dom";

// Fake data for demonstration
const fakeExamData = [
    {
        id: 1,
        patientName: "NGOUPAYE THIERRY",
        examName: "Allergy Test",
        status: "Completed",
        date: "2023-06-15T09:30:00",
        doctorName: "Dr. Alain Davis",
    },


]

export function ExamHistory() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("")
    const [dateFilter, setDateFilter] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { userData } = useAuthentication()
    const [examHistoryList, setExamHistoryList] = useState([])
    const [errorStatus, setErrorStatus] = useState(null)
    const [errorMessage, setErrorMessage] = useState("")

    const loadExamHistory = useCallback(async (idLabTech) => {
        setIsLoading(true)
        try {
            // Simulating API call with setTimeout
            await new Promise((resolve) => setTimeout(resolve, 1000))
            setExamHistoryList(fakeExamData)
            setIsLoading(false)
            setErrorStatus(null)
            setErrorMessage("")
        } catch (error) {
            setIsLoading(false)
            setErrorStatus(500)
            setErrorMessage("Une erreur est survenue lors du chargement des données.")
            console.error(error)
        }
    }, [])

    useEffect(() => {
        loadExamHistory()
    }, [loadExamHistory])

    const filteredExams = examHistoryList.filter((exam) => {
        const fullName = exam?.patientName
        const matchesSearch =
            fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exam.examName.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesDate = !dateFilter || new Date(exam?.date || "").toISOString().split("T")[0] === dateFilter
        return matchesSearch && matchesDate
    })

    function getStatusStyle(status) {
        switch (status) {
            case "Terminé":
                return "bg-green-100 text-green-800 border-green-300"
            case "En attente":
                return "bg-yellow-100 text-yellow-800 border-yellow-300"
            case "Annulé":
                return "bg-red-100 text-red-800 border-red-300"
            default:
                return "bg-gray-100 text-gray-800 border-gray-300"
        }
    }

    return (
        <LaboratoryDashBoard linkList={laboratoryNavLink} requiredRole={"Labtech"}>
            <LaboratoryNavBar />
            <div className="mx-auto p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Historique des Examens</h1>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Rechercher un examen par nom de patient ou type d'examen..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:border-none rounded-lg focus:ring-2 focus:ring-primary-end focus:outline-none transition-all duration-300"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <Calendar className="text-gray-400 h-5 w-5" />
                        <input
                            type="date"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 focus:border-none rounded-lg focus:ring-2 focus:ring-primary-end focus:outline-none transition-all duration-300"
                        />
                    </div>
                </div>

                {/* Exam History List */}
                {isLoading ? (
                    <div className="h-[500px] w-full flex justify-center items-center">
                        <Loader size={"medium"} color={"primary-end"} />
                    </div>
                ) : errorStatus ? (
                    <ServerErrorPage errorStatus={errorStatus} message={errorMessage} />
                ) : filteredExams && filteredExams.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full border-separate border-spacing-y-2">
                            <thead>
                            <tr>
                                <th className="px-6 py-3 bg-primary-end rounded-l-xl text-center text-md text-white font-bold uppercase">
                                    Patient
                                </th>
                                <th className="px-6 py-3 bg-primary-end text-center text-md text-white font-bold uppercase">
                                    Date & Heure
                                </th>
                                <th className="px-6 py-3 bg-primary-end text-center text-md text-white font-bold uppercase">
                                    Nom de l'Examen
                                </th>
                                <th className="px-6 py-3 bg-primary-end text-center text-md text-white font-bold uppercase">
                                    Statut
                                </th>
                                <th className="px-6 py-3 bg-primary-end text-center text-md text-white font-bold uppercase">
                                    Médecin
                                </th>
                                <th className="px-6 py-3 text-center text-md text-white font-bold bg-primary-end rounded-r-xl uppercase">
                                    Action
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white border-separate">
                            {filteredExams.map((exam) => (
                                <tr key={exam.id}>
                                    <td className="px-6 py-5 rounded-l-xl bg-gray-100 border-l-4 border-primary-start">
                                        <div className="w-full flex items-center justify-center">
                                            <User className="h-6 w-6 text-gray-400 mr-2" />
                                            <div className="text-md font-medium text-gray-900">{exam.patientName}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 bg-gray-100">
                                        <div className="w-full flex justify-center items-center">
                                            <Clock className="h-5 w-5 text-gray-400 mr-2 mt-2" />
                                            <div>
                                                <div className="text-sm text-center text-gray-900">{formatDateOnly(exam.date)}</div>
                                                <div className="text-sm text-center text-gray-500">{formatDateToTime(exam.date)}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 bg-gray-100">
                                        <div className="text-sm text-center text-gray-900">{exam.examName}</div>
                                    </td>
                                    <td className="px-6 py-4 bg-gray-100">
                                        <div className="flex items-center justify-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(exam.status)}`}>
                          {exam.status}
                        </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 bg-gray-100">
                                        <div className="flex items-center justify-center text-sm text-gray-900">
                                            <Stethoscope className="h-5 w-5 text-gray-400 mr-2" />
                                            {exam.doctorName}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 bg-gray-100 rounded-r-xl">
                                        <button
                                            onClick={() => {
                                                navigate(`${AppRoutesPaths.laboratoryExamResultDetails}`);

                                                console.log("Navigating to exam details for ID:", exam.id)
                                            }}
                                            className="flex items-center text-primary-end hover:text-primary-start font-semibold hover:text-[17px] transition-all duration-500"
                                        >
                                            <Eye className="h-5 w-5" />
                                            <span className="ml-2">Détails</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-8 mt-24 flex items-center justify-center">
                        <div className="flex flex-col">
                            <Calendar className="h-16 w-16 text-primary-end mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-gray-800 mb-2 mx-auto">Aucun Historique d'Examen</h2>
                            <p className="text-gray-600 mb-4 mx-auto text-center">
                                Il n'y a pas encore d'examens enregistrés. Une fois les examens effectués, ils apparaîtront ici pour un
                                meilleur suivi.
                            </p>
                            <button
                                className="px-4 hover:bg-primary-start duration-300 mx-auto py-2 bg-primary-end text-white rounded-lg transition-all"
                                onClick={() => {
                                    window.location.reload()
                                }}
                            >
                                Rafraîchir
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </LaboratoryDashBoard>
    )
}

