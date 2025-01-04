'use client'

import  { useState } from 'react';
import {Calendar, CalendarPlus, ClipboardList, FileText, Pill, Search, Stethoscope, Users} from 'lucide-react';
import {DashBoard} from "../../../GlobalComponents/DashBoard.jsx";
import {links} from "../Doctor.jsx";

// Mock data for patients
const patients = [
  { id: 1, name: "Jean Dupont", age: 45, gender: "Homme", status: "Suivi actif" },
  { id: 2, name: "Marie Martin", age: 32, gender: "Femme", status: "Terminé" },
  { id: 3, name: "Pierre Durand", age: 58, gender: "Homme", status: "Suivi actif" },
  { id: 4, name: "Sophie Lefebvre", age: 27, gender: "Femme", status: "Suivi actif" },
];


export const PatientList2 = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 md:p-6 bg-[#F9F9F9]">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#3A5FCD]">Liste des Patients</h1>
      
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Rechercher un patient..."
          className="w-full p-2 pl-10 border border-[#B0BEC5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4C8BF5]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B0BEC5]" size={20} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#4C8BF5] text-white">
              <th className="p-3 text-left">Nom</th>
              <th className="p-3 text-left">Âge</th>
              <th className="p-3 text-left">Sexe</th>
              <th className="p-3 text-left">État de santé</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient.id} className="border-b border-[#B0BEC5] hover:bg-[#F0F0F0] transition-colors">
                <td className="p-3 font-medium text-[#333333]">{patient.name}</td>
                <td className="p-3 text-[#333333]">{patient.age}</td>
                <td className="p-3 text-[#333333]">{patient.gender}</td>
                <td className="p-3 text-[#333333]">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    patient.status === 'Suivi actif' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'
                  }`}>
                    {patient.status}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button 
                      className="flex items-center justify-center px-3 py-1 bg-[#4C8BF5] text-white rounded-md hover:bg-[#3A5FCD] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4C8BF5]"
                      onClick={() => console.log(`Consulter carnet médical de ${patient.name}`)}
                      aria-label={`Consulter le carnet médical de ${patient.name}`}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      <span className="hidden sm:inline">Carnet Médical</span>
                    </button>
                    <button 
                      className="flex items-center justify-center px-3 py-1 bg-[#B39DDB] text-white rounded-md hover:bg-[#9575CD] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B39DDB]"
                      onClick={() => console.log(`Donner un rendez-vous à ${patient.name}`)}
                      aria-label={`Donner un rendez-vous à ${patient.name}`}
                    >
                      <CalendarPlus className="mr-2 h-4 w-4" />
                      <span className="hidden sm:inline">Rendez-vous</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredPatients.length === 0 && (
        <p className="text-center mt-4 text-[#333333]">Aucun patient trouvé.</p>
      )}
    </div>
  );
}

export function PatientList()
{
  return(
      <DashBoard linkList={links} requiredRole="doctor">
        <PatientList2></PatientList2>
      </DashBoard>
  )
}
