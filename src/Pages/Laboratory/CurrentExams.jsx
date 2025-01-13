import React from 'react';
import { currentExams } from './mockData';

export function CurrentExams({ searchQuery }) {
    const filteredExams = currentExams.filter(exam => 
        exam.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.examDetails.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.notes.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="min-w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details of exam</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Validation</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {filteredExams.map((exam) => (
                        <tr key={exam.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{exam.patientName}</td>
                            <td className="px-6 py-4">{exam.examDetails}</td>
                            <td className="px-6 py-4">{exam.notes}</td>
                            <td className="px-6 py-4">
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                    Modifier
                                </button>
                            </td>
                            <td className="px-6 py-4">
                                <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                                    Valider
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}