import React from 'react';
import { examHistory } from './mockData1';
import {laboratoryNavLink} from "./LaboratoryNavLink.js";
import {DashBoard} from "../../GlobalComponents/DashBoard.jsx";

export function ExamHistory({ searchQuery }) {
    const filteredHistory = examHistory.filter(exam => 
        exam.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.examName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <DashBoard linkList={laboratoryNavLink} requiredRole={"Labtech"}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Exam Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Exam
                            Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Exam Cost</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date and Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Result</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {filteredHistory.map((exam) => (
                        <tr key={exam.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{exam.patientName}</td>
                            <td className="px-6 py-4">{exam.examName}</td>
                            <td className="px-6 py-4">{exam.description}</td>
                            <td className="px-6 py-4">{exam.cost}</td>
                            <td className="px-6 py-4">{exam.dateTime}</td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded-full ${
                                    exam.result === 'Normal' ? 'bg-green-100 text-green-800' :
                                        exam.result === 'Élevé' ? 'bg-red-100 text-red-800' :
                                            'bg-yellow-100 text-yellow-800'
                                }`}>
                                    {exam.result}
                                </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </DashBoard>

    );
}