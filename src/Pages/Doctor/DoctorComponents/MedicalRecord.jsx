'use client'

import React, { useState } from 'react';
import { AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import PatientSearch from './PatientSearch';

const mockMedicalRecords = {
  1: [
    { date: "2023-05-15", symptoms: "Maux de tête", diagnosis: "Migraine", treatment: "Ibuprofène" },
    { date: "2023-03-02", symptoms: "Toux persistante", diagnosis: "Bronchite", treatment: "Antibiotiques" },
  ],
  2: [
    { date: "2023-06-01", symptoms: "Douleurs abdominales", diagnosis: "Gastrite", treatment: "Antiacides" },
  ],
  3: [],
  4: [
    { date: "2023-06-10", symptoms: "Fatigue chronique", diagnosis: "Anémie suspectée", treatment: "Examens complémentaires prescrits" },
  ],
};

export default function MedicalRecord() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showNotification, setShowNotification] = useState(true);
  const [expandedConsultation, setExpandedConsultation] = useState(null);
  const [formData, setFormData] = useState({
    symptoms: "",
    diagnosis: "",
    treatment: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulaire soumis:", formData);
    // Ici, vous ajouteriez la logique pour envoyer les données au serveur
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

        {selectedPatient && showNotification && consultations.length > 0 && (
            <div className="bg-[#4C8BF5] text-white p-4 rounded-md mb-6 flex items-start">
              <AlertCircle className="mr-2 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold">Consultations antérieures disponibles</p>
                <p>Ce patient a des consultations antérieures. Veuillez les consulter avant de continuer.</p>
                <button
                    onClick={() => setShowNotification(false)}
                    className="mt-2 bg-white text-[#4C8BF5] px-3 py-1 rounded-md hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                >
                  Fermer
                </button>
              </div>
            </div>
        )}

        {selectedPatient && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-[#333333]">Antécédents médicaux</h2>
              {consultations.length === 0 ? (
                  <p className="text-[#333333] italic">Aucun antécédent médical enregistré pour ce patient.</p>
              ) : (
                  consultations.map((consultation, index) => (
                      <div key={index} className="mb-4 border border-[#B0BEC5] rounded-md overflow-hidden">
                        <button
                            onClick={() => setExpandedConsultation(expandedConsultation === index ? null : index)}
                            className="w-full p-4 text-left bg-[#F0F0F0] hover:bg-[#E0E0E0] transition-colors flex justify-between items-center"
                        >
                          <span className="font-medium text-[#333333]">Consultation du {consultation.date}</span>
                          {expandedConsultation === index ? <ChevronUp /> : <ChevronDown />}
                        </button>
                        {expandedConsultation === index && (
                            <div className="p-4 bg-white">
                              <p><strong>Symptômes :</strong> {consultation.symptoms}</p>
                              <p><strong>Diagnostic :</strong> {consultation.diagnosis}</p>
                              <p><strong>Traitement :</strong> {consultation.treatment}</p>
                            </div>
                        )}
                      </div>
                  ))
              )}
            </div>
        )}

        {selectedPatient && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-xl font-semibold mb-4 text-[#333333]">Nouvelle consultation</h2>
              <div>
                <label htmlFor="symptoms" className="block text-sm font-medium text-[#333333] mb-1">Symptômes</label>
                <textarea
                    id="symptoms"
                    name="symptoms"
                    rows={3}
                    className="w-full p-2 border border-[#B0BEC5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4C8BF5]"
                    value={formData.symptoms}
                    onChange={handleInputChange}
                ></textarea>
              </div>
              <div>
                <label htmlFor="diagnosis" className="block text-sm font-medium text-[#333333] mb-1">Diagnostic</label>
                <textarea
                    id="diagnosis"
                    name="diagnosis"
                    rows={3}
                    className="w-full p-2 border border-[#B0BEC5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4C8BF5]"
                    value={formData.diagnosis}
                    onChange={handleInputChange}
                ></textarea>
              </div>
              <div>
                <label htmlFor="treatment" className="block text-sm font-medium text-[#333333] mb-1">Traitement</label>
                <textarea
                    id="treatment"
                    name="treatment"
                    rows={3}
                    className="w-full p-2 border border-[#B0BEC5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4C8BF5]"
                    value={formData.treatment}
                    onChange={handleInputChange}
                ></textarea>
              </div>
              <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2 bg-[#4C8BF5] text-white rounded-md hover:bg-[#3A5FCD] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4C8BF5]"
              >
                Soumettre la consultation
              </button>
            </form>
        )}
      </div>
  );
}