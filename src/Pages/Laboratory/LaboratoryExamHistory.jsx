"use client"

import { useState } from "react"
import { Search, Filter, Calendar, User, Stethoscope } from "lucide-react"
import { laboratoryNavLink } from "./LaboratoryNavLink.js"
import { LaboratoryNavBar } from "./LaboratoryNavBar.jsx"
import { LaboratoryDashBoard } from "./LaboratoryDashBoard.jsx"

const fakeExams = [
    {
        id: 1,
        examName: "Hémogramme",
        patientName: "Émilie Durand",
        doctorName: "Dr. Pierre Martin",
        status: "Terminé",
        date: "2023-12-15",
        type: "Sanguin",
    },
    {
        id: 2,
        examName: "IRM Cérébrale",
        patientName: "Jean Dupont",
        doctorName: "Dr. Sophie Leroy",
        status: "En attente",
        date: "2023-12-14",
        type: "Imagerie",
    },
    {
        id: 3,
        examName: "ECG",
        patientName: "Marie Lambert",
        doctorName: "Dr. Lucas Bernard",
        status: "Annulé",
        date: "2023-12-13",
        type: "Cardio",
    },
    // Ajouter plus d'examens...
]

function StatusBadge({ status }) {
    const statusConfig = {
        Terminé: { color: "bg-green-100 text-green-800", icon: "✅" },
        "En attente": { color: "bg-yellow-100 text-yellow-800", icon: "⏳" },
        Annulé: { color: "bg-red-100 text-red-800", icon: "❌" },
    }

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[status].color}`}
        >
      {statusConfig[status].icon} {status}
    </span>
    )
}

function ExamCard({ exam }) {
    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-200">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{exam.examName}</h3>
                <StatusBadge status={exam.status} />
            </div>
            <p className="text-sm text-gray-500 mb-4">{exam.type}</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center text-gray-600">
                    <User className="w-4 h-4 mr-2 text-primary-start" />
                    <span>{exam.patientName}</span>
                </div>
                <div className="flex items-center text-gray-600">
                    <Stethoscope className="w-4 h-4 mr-2 text-primary-start" />
                    <span>{exam.doctorName}</span>
                </div>
                <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-primary-start" />
                    <span>{new Date(exam.date).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    )
}

export function ExamHistory() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterStatus, setFilterStatus] = useState("all")
    const [sortBy, setSortBy] = useState("date")

    const filteredExams = fakeExams.filter((exam) => {
        const matchesSearch = [exam.examName, exam.patientName, exam.doctorName].some((field) =>
            field.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        return matchesSearch && (filterStatus === "all" || exam.status === filterStatus)
    })

    const sortedExams = [...filteredExams].sort((a, b) => {
        if (sortBy === "date") return new Date(b.date) - new Date(a.date)
        return a[sortBy].localeCompare(b[sortBy])
    })

    return (
        <LaboratoryDashBoard linkList={laboratoryNavLink} requiredRole={"Labtech"}>
            <LaboratoryNavBar />
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg p-6 text-white mb-6">
                        <h1 className="text-3xl font-bold mb-2">Historique des Examens</h1>
                        <p className="opacity-90">Consultez l'historique complet des examens réalisés dans notre établissement.</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-grow">
                                <input
                                    type="text"
                                    placeholder="Rechercher un examen, patient ou médecin..."
                                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-primary-start focus:ring-2 focus:ring-primary-start focus:ring-opacity-50"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Search className="absolute left-3 top-2.5 text-gray-400" />
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <select
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                        className="appearance-none pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-primary-start focus:ring-2 focus:ring-primary-start focus:ring-opacity-50"
                                    >
                                        <option value="all">Tous les statuts</option>
                                        <option value="Terminé">Terminé</option>
                                        <option value="En attente">En attente</option>
                                        <option value="Annulé">Annulé</option>
                                    </select>
                                    <Filter className="absolute left-3 top-2.5 text-gray-400" />
                                </div>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="appearance-none px-4 py-2 rounded-lg border border-gray-300 focus:border-primary-start focus:ring-2 focus:ring-primary-start focus:ring-opacity-50"
                                >
                                    <option value="date">Trier par date</option>
                                    <option value="examName">Trier par nom</option>
                                    <option value="patientName">Trier par patient</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedExams.map((exam) => (
                            <ExamCard key={exam.id} exam={exam} />
                        ))}
                    </div>

                    <div className="mt-8 flex justify-center space-x-2">
                        <button className="px-4 py-2 bg-white text-primary-start border border-primary-start rounded-lg hover:bg-primary-start hover:text-white transition-colors duration-300">
                            Précédent
                        </button>
                        <button className="px-4 py-2 bg-primary-start text-white rounded-lg hover:bg-primary-end transition-colors duration-300">
                            Suivant
                        </button>
                    </div>
                </div>
            </div>
        </LaboratoryDashBoard>
    )
}

