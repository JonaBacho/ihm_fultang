'use client'

import  { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Calendar,
  FileText,
  Pill,
  Stethoscope,
  ClipboardList,
  Users
} from 'lucide-react';
import PatientSearch from './PatientSearch';
import {DashBoard} from "../../../GlobalComponents/DashBoard.jsx";
import {links} from "../Doctor.jsx";

const mockMedicalRecords = {
  1: [
    {
      id: 1,
      date: "2023-05-15",
      reason: "Maux de tête",
      diagnosis: "Migraine",
      treatment: "Ibuprofène",
      examResults: [
        { name: "Tension artérielle", value: "120/80 mmHg" },
        { name: "Fréquence cardiaque", value: "72 bpm" }
      ],
      prescription: "Ibuprofène 400mg, 1 comprimé toutes les 6 heures si nécessaire"
    },
    {
      id: 2,
      date: "2023-03-02",
      reason: "Toux persistante",
      diagnosis: "Bronchite",
      treatment: "Antibiotiques",
      examResults: [
        { name: "Auscultation pulmonaire", value: "Râles bronchiques" },
        { name: "Radiographie thoracique", value: "Opacités diffuses" }
      ],
      prescription: "Amoxicilline 500mg, 1 comprimé 3 fois par jour pendant 7 jours"
    },
  ],
  2: [
    {
      id: 3,
      date: "2023-06-01",
      reason: "Douleurs abdominales",
      diagnosis: "Gastrite",
      treatment: "Antiacides",
      examResults: [
        { name: "Palpation abdominale", value: "Sensibilité épigastrique" }
      ],
      prescription: "Oméprazole 20mg, 1 comprimé par jour pendant 14 jours"
    }
  ],
  3: [],
  4: [
    {
      id: 4,
      date: "2023-06-10",
      reason: "Fatigue chronique",
      diagnosis: "Anémie suspectée",
      treatment: "Examens complémentaires prescrits",
      examResults: [
        { name: "Hémoglobine", value: "En attente" }
      ],
      prescription: "Bilan sanguin complet à réaliser"
    }
  ]
};

const  ViewMedicalRecord2 = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [expandedConsultation, setExpandedConsultation] = useState(null);

  const toggleConsultation = (id) => {
    setExpandedConsultation(expandedConsultation === id ? null : id);
  };

  const consultations = selectedPatient ? mockMedicalRecords[selectedPatient.id] : [];

  return (
      <div className="container mx-auto p-4 md:p-6 bg-[#F9F9F9]">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#3A5FCD]">Carnet Médical</h1>

        <PatientSearch onSelectPatient={setSelectedPatient} />

        {selectedPatient && (
            <div className="bg-white p-4 rounded-md shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-2 text-[#333333]">Patient sélectionné</h2>
              <p>{selectedPatient.name}</p>
            </div>
        )}

        {selectedPatient && consultations.length === 0 ? (
            <div className="bg-[#B39DDB] text-white p-4 rounded-md mb-6 flex items-start">
              <AlertCircle className="mr-2 flex-shrink-0 mt-1" />
              <p>Ce patient n&#39;a pas de consultation enregistrée.</p>
            </div>
        ) : selectedPatient && (
            <>
              <h2 className="text-xl font-semibold mb-4 text-[#333333]">Historique des consultations</h2>
              {consultations.map((consultation) => (
                  <div key={consultation.id} className="mb-4 border border-[#B0BEC5] rounded-md overflow-hidden">
                    <button
                        onClick={() => toggleConsultation(consultation.id)}
                        className="w-full p-4 text-left bg-[#F0F0F0] hover:bg-[#E0E0E0] transition-colors flex justify-between items-center"
                    >
                      <span className="font-medium text-[#333333]">Consultation du {consultation.date}</span>
                      {expandedConsultation === consultation.id ? <ChevronUp /> : <ChevronDown />}
                    </button>
                    {expandedConsultation === consultation.id && (
                        <div className="p-4 bg-white">
                          <p><strong>Motif :</strong> {consultation.reason}</p>
                          <p><strong>Diagnostic :</strong> {consultation.diagnosis}</p>
                          <p><strong>Traitement :</strong> {consultation.treatment}</p>

                          <h3 className="font-semibold mt-4 mb-2">Résultats des examens</h3>
                          <ul className="list-disc list-inside">
                            {consultation.examResults.map((result, idx) => (
                                <li key={idx}>{result.name}: {result.value}</li>
                            ))}
                          </ul>

                          <h3 className="font-semibold mt-4 mb-2">Prescription médicale</h3>
                          <p>{consultation.prescription}</p>
                        </div>
                    )}
                  </div>
              ))}
            </>
        )}

        <button
            onClick={() => console.log("Redirection vers la modification du carnet médical")}
            className="mt-6 px-6 py-2 bg-[#4C8BF5] text-white rounded-md hover:bg-[#3A5FCD] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4C8BF5] flex items-center"
        >
          Modifier le carnet médical
        </button>
      </div>
  );
}

export default function ViewMedicalRecord()
{
  return(
      <DashBoard linkList={links} requiredRole="doctor">
        <ViewMedicalRecord2></ViewMedicalRecord2>
      </DashBoard>
  )
}