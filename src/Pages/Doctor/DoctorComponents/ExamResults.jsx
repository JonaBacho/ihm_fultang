import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

// Mock data for exam results
const examData = [
  { id: 1, name: "Analyse de sang", date: "2023-05-15", status: "available", results: "Taux de fer: 12 μmol/L (Normal)\nGlycémie: 5.2 mmol/L (Normal)" },
  { id: 2, name: "Radiographie pulmonaire", date: "2023-05-20", status: "available", results: "Pas d'anomalies détectées. Poumons clairs." },
  { id: 3, name: "IRM du genou", date: "2023-05-25", status: "unavailable" },
];

export default function ExamResults() {
  const [expandedExam, setExpandedExam] = useState(null);

  const toggleExam = (id) => {
    setExpandedExam(expandedExam === id ? null : id);
  };

  return (
      <div className="container mx-auto p-4 md:p-6 bg-[#F9F9F9]">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#3A5FCD]">Résultats d'Examens</h1>

        {examData.length === 0 ? (
            <div className="bg-[#B39DDB] text-white p-4 rounded-md mb-6 flex items-start">
              <AlertCircle className="mr-2 flex-shrink-0 mt-1" />
              <p>Aucun examen n'a été prescrit pour ce patient.</p>
            </div>
        ) : (
            <div className="space-y-4">
              {examData.map((exam) => (
                  <div key={exam.id} className="border border-[#B0BEC5] rounded-md overflow-hidden">
                    <button
                        onClick={() => toggleExam(exam.id)}
                        className="w-full p-4 text-left bg-[#F0F0F0] hover:bg-[#E0E0E0] transition-colors flex justify-between items-center"
                    >
                      <div className="flex items-center">
                        {exam.status === 'available' ? (
                            <CheckCircle className="text-green-500 mr-2" />
                        ) : (
                            <XCircle className="text-red-500 mr-2" />
                        )}
                        <span className="font-medium text-[#333333]">{exam.name} - {exam.date}</span>
                      </div>
                      {expandedExam === exam.id ? <ChevronUp /> : <ChevronDown />}
                    </button>
                    {expandedExam === exam.id && (
                        <div className="p-4 bg-white">
                          {exam.status === 'available' ? (
                              <div>
                                <h3 className="font-semibold mb-2">Résultats :</h3>
                                <pre className="whitespace-pre-wrap font-sans text-[#333333]">{exam.results}</pre>
                              </div>
                          ) : (
                              <p className="text-[#333333] italic">Les résultats ne sont pas encore disponibles pour cet examen.</p>
                          )}
                        </div>
                    )}
                  </div>
              ))}
            </div>
        )}
      </div>
  );
}