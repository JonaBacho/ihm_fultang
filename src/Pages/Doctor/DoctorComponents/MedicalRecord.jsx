'use client'

import React, { useState } from 'react';
import {
  Search, User, ChevronDown, ChevronUp, AlertCircle, Calendar, DollarSign, FileText, Heart, History, Activity
} from 'lucide-react';
import PatientSearch from './PatientSearch';
import {DashBoard} from "../../../GlobalComponents/DashBoard.jsx";
import {links} from "../Doctor.jsx";



const patients = [
  { id: 1, name: "Jean Dupont", age: 45, email: "jean@email.com", phone: "0123456789" },
  { id: 2, name: "Marie Martin", age: 32, email: "marie@email.com", phone: "0123456788" },
  { id: 3, name: "Pierre Durant", age: 28, email: "pierre@email.com", phone: "0123456787" },
];

// Mock data for medical records
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

const consultationTypes = [
  "Consultation générale",
  "Suivi",
  "Urgence",
  "Spécialiste",
  "Téléconsultation"
];

export const MedicalRecord2 = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchPatient, setSearchPatient] = useState('');
  const [expandedConsultation, setExpandedConsultation] = useState(null);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    cost: '',
    reason: '',
    notes: '',
    allergies: '',
    medicalHistory: '',
    consultationType: consultationTypes[0]
  });

  const filteredPatients = patients.filter(patient =>
      patient.name.toLowerCase().includes(searchPatient.toLowerCase())
  );

  const consultations = selectedPatient ? mockMedicalRecords[selectedPatient.id] || [] : [];

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

  if (!selectedPatient) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-center mb-8">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                  <FileText className="w-8 h-8 text-indigo-600" />
                </div>
              </div>

              <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
                Carnet Médical
              </h1>
              <p className="text-center text-gray-600 mb-8">
                Sélectionnez un patient pour commencer la consultation
              </p>

              <div className="bg-white rounded-xl">
                <div className="relative mb-4">
                  <input
                      type="text"
                      placeholder="Rechercher un patient..."
                      value={searchPatient}
                      onChange={(e) => setSearchPatient(e.target.value)}
                      className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>

                <div className="mt-4 max-h-96 overflow-y-auto">
                  {filteredPatients.map(patient => (
                      <button
                          key={patient.id}
                          onClick={() => setSelectedPatient(patient)}
                          className="w-full p-4 flex items-center space-x-4 hover:bg-indigo-50 rounded-lg transition-all group"
                      >
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center group-hover:bg-indigo-200 transition-all">
                          <User className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="font-medium text-gray-800">{patient.name}</h3>
                          <div className="text-sm text-gray-500 space-x-4">
                            <span>{patient.age} ans</span>
                            <span>•</span>
                            <span>{patient.phone}</span>
                          </div>
                        </div>
                      </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-indigo-100">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-6 text-white">
            <h1 className="text-3xl font-bold">
              Carnet Médical
            </h1>
          </div>
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-800">
                Consultation
              </h2>
              <button
                  onClick={() => setSelectedPatient(null)}
                  className="text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <ChevronDown size={24} />
              </button>
            </div>

            <div className="mb-8 p-6 bg-indigo-50 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-lg font-medium text-gray-800">
                    {selectedPatient.name}
                  </h2>
                  <div className="text-sm text-gray-600 space-x-4">
                    <span>{selectedPatient.age} ans</span>
                    <span>•</span>
                    <span>{selectedPatient.phone}</span>
                    <span>•</span>
                    <span>{selectedPatient.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {consultations.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Consultations précédentes</h3>
                  <div className="space-y-4">
                    {consultations.map((consultation, index) => (
                        <div key={index} className="border border-gray-200 rounded-md overflow-hidden">
                          <button
                              onClick={() => setExpandedConsultation(expandedConsultation === index ? null : index)}
                              className="w-full p-4 text-left bg-white hover:bg-indigo-50 transition-colors flex justify-between items-center"
                          >
                            <span className="font-medium text-gray-800">Consultation du {consultation.date}</span>
                            {expandedConsultation === index ? <ChevronUp className="text-indigo-600" /> : <ChevronDown className="text-indigo-600" />}
                          </button>
                          {expandedConsultation === index && (
                              <div className="p-4 bg-white">
                                <p><strong>Symptômes :</strong> {consultation.symptoms}</p>
                                <p><strong>Diagnostic :</strong> {consultation.diagnosis}</p>
                                <p><strong>Traitement :</strong> {consultation.treatment}</p>
                              </div>
                          )}
                        </div>
                    ))}
                  </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Nouvelle consultation</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date de consultation
                  </label>
                  <div className="relative">
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 pl-10 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  </div>
                </div>

                <div>
                  <label htmlFor="cost" className="block text-sm font-medium text-gray-700 mb-1">
                    Coût
                  </label>
                  <div className="relative">
                    <input
                        type="number"
                        id="cost"
                        name="cost"
                        value={formData.cost}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 pl-10 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                        placeholder="0.00"
                    />
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="consultationType" className="block text-sm font-medium text-gray-700 mb-1">
                  Type de consultation
                </label>
                <select
                    id="consultationType"
                    name="consultationType"
                    value={formData.consultationType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                >
                  {consultationTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                  Raison de la consultation
                </label>
                <textarea
                    id="reason"
                    name="reason"
                    rows={3}
                    value={formData.reason}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                    placeholder="Décrivez la raison de la consultation..."
                ></textarea>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Notes du médecin
                </label>
                <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                    placeholder="Ajoutez vos notes ici..."
                ></textarea>
              </div>

              <div>
                <label htmlFor="allergies" className="block text-sm font-medium text-gray-700 mb-1">
                  Allergies
                </label>
                <textarea
                    id="allergies"
                    name="allergies"
                    rows={2}
                    value={formData.allergies}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                    placeholder="Listez les allergies du patient..."
                ></textarea>
              </div>

              <div>
                <label htmlFor="medicalHistory" className="block text-sm font-medium text-gray-700 mb-1">
                  Antécédents médicaux
                </label>
                <textarea
                    id="medicalHistory"
                    name="medicalHistory"
                    rows={4}
                    value={formData.medicalHistory}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                    placeholder="Résumez les antécédents médicaux importants..."
                ></textarea>
              </div>

              <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center"
              >
                <FileText className="mr-2" />
                Enregistrer la consultation
              </button>
            </form>
          </div>
        </div>
      </div>
  );
}

export default function MedicalRecord()
{
  return(
      <DashBoard linkList={links} requiredRole="doctor">
        <MedicalRecord2></MedicalRecord2>
      </DashBoard>
  )
}