import { useState } from 'react';
import { Search, ChevronUp,Stethoscope, ChevronDown, Filter } from 'lucide-react';
import {laboratoryNavLink} from "./LaboratoryNavLink.js";
import {LaboratoryNavBar} from "./LaboratoryNavBar.jsx";
import {LaboratoryDashBoard} from "./LaboratoryDashBoard.jsx";
import {AppRoutesPaths} from "../../Router/appRouterPaths.js";
import {useNavigate} from "react-router-dom";


const fakeExams = [
    { id: 1, examName: "Blood Test", patientName: "John Doe", doctorName: "Dr. Smith", status: "Completed", date: "2023-05-15" },
    { id: 2, examName: "X-Ray", patientName: "Jane Smith", doctorName: "Dr. Johnson", status: "Pending", date: "2023-05-18" },
    { id: 3, examName: "MRI Scan", patientName: "Alice Brown", doctorName: "Dr. Williams", status: "Cancelled", date: "2023-05-20" },
    { id: 4, examName: "ECG", patientName: "Bob Wilson", doctorName: "Dr. Davis", status: "Completed", date: "2023-05-16" },
    { id: 5, examName: "CT Scan", patientName: "Carol Taylor", doctorName: "Dr. Anderson", status: "Pending", date: "2023-05-22" },
];

function ExamCard({ examName, patientName, doctorName, status }) {
    const statusColor =
        status === 'Completed'
            ? 'text-green-600'
            : status === 'Pending'
                ? 'text-yellow-600'
                : 'text-red-600';

    const navigate = useNavigate();
    return (
        <div
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-2xl transition-shadow duration-300">

            <h3 className="text-xl font-bold text-teal-700 mb-4">{examName}</h3>
            <div className="space-y-3">
                <p className="text-gray-700">
                    <span className="font-semibold">Patient :</span> {patientName}
                </p>
                <p className="text-gray-700">
                    <span className="font-semibold">Prescrit par :</span> {doctorName}
                </p>
                <p className="text-gray-700">
                    <span className="font-semibold">Status :</span> <span className={statusColor}>{status}</span>
                </p>
            </div>
            <div className="px-4 py-3 text-right">
                <button
                    className="text-white px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-primary-end to-primary-start font-bold text-sm hover:text-md transition-all duration-300"
                    onClick={() => {
                        navigate(AppRoutesPaths.laboratoryExamenDetail)
                    }}>
                    View Details
                </button>
            </div>
        </div>
    );
}


export function ExamenList() {

    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortBy, setSortBy] = useState('date');

    const filteredExams = fakeExams.filter(exam =>
        (filterStatus === 'all' || exam.status === filterStatus) &&
        (exam.examName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exam.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exam.doctorName.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const sortedExams = [...filteredExams].sort((a, b) => {
        if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
        return a[sortBy].localeCompare(b[sortBy]);
    });

    return (

        <LaboratoryDashBoard linkList={laboratoryNavLink} requiredRole={"Labtech"}>
            <LaboratoryNavBar/>
        <div className="container mx-auto px-4 py-8">
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg p-6 text-white mb-6">
                <h1 className="text-3xl font-bold mb-2">Examination List</h1>
                <p className="opacity-90">
                    Find the clinic&#39;s complete examination history here. You can view prescribed exams, check exam details, and access information about patients and prescribing doctors.
                </p>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            placeholder="Search by exam, patient, or doctor"
                            className="w-full pl-10 pr-4 py-2 rounded-md border-2 border-gray-300 focus:border-teal-500 focus:outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={20}/>
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors duration-300"
                    >
                        <Filter size={20} className="mr-2"/>
                        Filters
                        {showFilters ? <ChevronUp size={20} className="ml-2"/> : <ChevronDown size={20} className="ml-2"/>}
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
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
                                >
                                    <option value="all">All</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
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

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sortedExams.map(exam => (
                    <ExamCard
                        key={exam.id}
                        examName={exam.examName}
                        patientName={exam.patientName}
                        doctorName={exam.doctorName}
                        status={exam.status}
                    />
                ))}
            </div>
        </div>
        </LaboratoryDashBoard>
    );

}
