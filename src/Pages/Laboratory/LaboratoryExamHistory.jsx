import { useState } from 'react';
import {
    MdHistory,

    MdPerson,
    MdLocalHospital,
    MdCalendarToday,
    MdFilterList,
    MdSearch
} from 'react-icons/md';
import {laboratoryNavLink} from "./LaboratoryNavLink.js";
import {LaboratoryNavBar} from "./LaboratoryNavBar.jsx";
import {LaboratoryDashBoard} from "./LaboratoryDashBoard.jsx";

const fakeExams = [
    { id: 1, examName: "Hémogramme", patientName: "Émilie Durand", doctorName: "Dr. Pierre Martin",
        status: "Terminé", date: "2023-12-15", type: "Sanguin" },
    { id: 2, examName: "IRM Cérébrale", patientName: "Jean Dupont", doctorName: "Dr. Sophie Leroy",
        status: "En attente", date: "2023-12-14", type: "Imagerie" },
    { id: 3, examName: "ECG", patientName: "Marie Lambert", doctorName: "Dr. Lucas Bernard",
        status: "Annulé", date: "2023-12-13", type: "Cardio" },
    // Ajouter plus d'examens...
];

function StatusBadge({ status }) {
    const statusConfig = {
        'Terminé': { color: 'bg-green-100 text-green-800', icon: '✅' },
        'En attente': { color: 'bg-yellow-100 text-yellow-800', icon: '⏳' },
        'Annulé': { color: 'bg-red-100 text-red-800', icon: '❌' }
    };

    return (
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${statusConfig[status].color}`}>
            <span className="mr-2">{statusConfig[status].icon}</span>
            {status}
        </div>
    );
}

function ExamHistoryCard({ exam }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                        {/* eslint-disable-next-line react/jsx-no-undef */}
                        <MdOutlineClinicalNotes className="text-teal-600 mr-2" />
                        {exam.examName}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{exam.type}</p>
                </div>
                <StatusBadge status={exam.status} />
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                    <MdPerson className="text-gray-400 mr-2" />
                    <span className="font-medium">Patient:</span>
                    <span className="ml-2 text-gray-600">{exam.patientName}</span>
                </div>

                <div className="flex items-center">
                    <MdLocalHospital className="text-gray-400 mr-2" />
                    <span className="font-medium">Médecin:</span>
                    <span className="ml-2 text-gray-600">{exam.doctorName}</span>
                </div>

                <div className="flex items-center">
                    <MdCalendarToday className="text-gray-400 mr-2" />
                    <span className="font-medium">Date:</span>
                    <span className="ml-2 text-gray-600">{new Date(exam.date).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
}

export function ExamHistory() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortBy, setSortBy] = useState('date');

    const filteredExams = fakeExams.filter(exam => {
        const matchesSearch = [exam.examName, exam.patientName, exam.doctorName].some(field =>
            field.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return matchesSearch && (filterStatus === 'all' || exam.status === filterStatus);
    });

    const sortedExams = [...filteredExams].sort((a, b) => {
        if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
        return a[sortBy].localeCompare(b[sortBy]);
    });

    return (
        <LaboratoryDashBoard linkList={laboratoryNavLink} requiredRole={"Labtech"}>
            <LaboratoryNavBar/>
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-7xl mx-auto">
                    {/* En-tête */}
                    <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl text-white p-8 mb-8 shadow-lg">
                        <div className="flex items-center space-x-4">
                            <MdHistory className="text-4xl" />
                            <div>
                                <h1 className="text-3xl font-bold">Historique des Examens</h1>
                                <p className="opacity-90 mt-2">Consultation complète de l'historique des analyses effectuées</p>
                            </div>
                        </div>
                    </div>

                    {/* Statistiques */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="text-2xl font-bold text-teal-600">{fakeExams.length}</div>
                            <div className="text-sm text-gray-500">Examens au total</div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="text-2xl font-bold text-green-600">
                                {fakeExams.filter(e => e.status === 'Terminé').length}
                            </div>
                            <div className="text-sm text-gray-500">Examens terminés</div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="text-2xl font-bold text-yellow-600">
                                {fakeExams.filter(e => e.status === 'En attente').length}
                            </div>
                            <div className="text-sm text-gray-500">En attente</div>
                        </div>
                    </div>

                    {/* Contrôles */}
                    <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-grow">
                                <input
                                    type="text"
                                    placeholder="Rechercher un examen..."
                                    className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <MdSearch className="absolute left-4 top-3.5 text-gray-400 text-xl" />
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <MdFilterList className="text-gray-500" />
                                    <select
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                        className="py-3 px-4 rounded-lg border-2 border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                                    >
                                        <option value="all">Tous les statuts</option>
                                        <option value="Terminé">Terminé</option>
                                        <option value="En attente">En attente</option>
                                        <option value="Annulé">Annulé</option>
                                    </select>
                                </div>

                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="py-3 px-4 rounded-lg border-2 border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                                >
                                    <option value="date">Trier par date</option>
                                    <option value="examName">Trier par nom</option>
                                    <option value="patientName">Trier par patient</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Liste des examens */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedExams.map(exam => (
                            <ExamHistoryCard key={exam.id} exam={exam} />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-8 flex justify-center space-x-2">
                        <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                            Précédent
                        </button>
                        <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
                            Suivant
                        </button>
                    </div>
                </div>
            </div>
        </LaboratoryDashBoard>
    );
}