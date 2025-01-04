'use client'

import  { useState } from 'react';
import { Plus, Trash2, FileText } from 'lucide-react';
import PatientSearch from './PatientSearch';
import {DashBoard} from "../../../GlobalComponents/DashBoard.jsx";
import {links} from "../Doctor.jsx";

export const PrescriptionForm2 = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [medications, setMedications] = useState([{ name: '', dosage: '', duration: '' }]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  const addMedication = () => {
    setMedications([...medications, { name: '', dosage: '', duration: '' }]);
  };

  const removeMedication = (index) => {
    const newMedications = medications.filter((_, i) => i !== index);
    setMedications(newMedications);
  };

  const updateMedication = (index, field, value) => {
    const newMedications = medications.map((med, i) => {
      if (i === index) {
        return { ...med, [field]: value };
      }
      return med;
    });
    setMedications(newMedications);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Prescription soumise:', { patient: selectedPatient, medications, specialInstructions });
    // Ici, vous ajouteriez la logique pour envoyer les données au serveur
  };

  return (
      <div className="container mx-auto p-4 md:p-6 bg-[#F9F9F9]">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#3A5FCD]">Prescription Médicale</h1>

        <PatientSearch onSelectPatient={setSelectedPatient} />

        {selectedPatient && (
            <>
              <div className="bg-white p-4 rounded-md shadow-sm mb-6">
                <h2 className="text-xl font-semibold mb-2 text-[#333333]">Patient sélectionné</h2>
                <p>{selectedPatient.name}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-[#333333]">Médicaments prescrits</h2>
                  {medications.map((med, index) => (
                      <div key={index} className="mb-4 p-4 border border-[#B0BEC5] rounded-md bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label htmlFor={`med-name-${index}`} className="block text-sm font-medium text-[#333333] mb-1">
                              Nom du médicament
                            </label>
                            <input
                                type="text"
                                id={`med-name-${index}`}
                                value={med.name}
                                onChange={(e) => updateMedication(index, 'name', e.target.value)}
                                className="w-full p-2 border border-[#B0BEC5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4C8BF5]"
                                required
                            />
                          </div>
                          <div>
                            <label htmlFor={`med-dosage-${index}`} className="block text-sm font-medium text-[#333333] mb-1">
                              Dosage
                            </label>
                            <input
                                type="text"
                                id={`med-dosage-${index}`}
                                value={med.dosage}
                                onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                                className="w-full p-2 border border-[#B0BEC5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4C8BF5]"
                                required
                            />
                          </div>
                          <div>
                            <label htmlFor={`med-duration-${index}`} className="block text-sm font-medium text-[#333333] mb-1">
                              Durée
                            </label>
                            <input
                                type="text"
                                id={`med-duration-${index}`}
                                value={med.duration}
                                onChange={(e) => updateMedication(index, 'duration', e.target.value)}
                                className="w-full p-2 border border-[#B0BEC5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4C8BF5]"
                                required
                            />
                          </div>
                        </div>
                        {medications.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeMedication(index)}
                                className="mt-2 text-[#B39DDB] hover:text-[#9575CD] focus:outline-none"
                                aria-label="Supprimer ce médicament"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                        )}
                      </div>
                  ))}
                  <button
                      type="button"
                      onClick={addMedication}
                      className="mt-2 flex items-center text-[#4C8BF5] hover:text-[#3A5FCD] focus:outline-none"
                  >
                    <Plus className="h-5 w-5 mr-1" />
                    Ajouter un médicament
                  </button>
                </div>

                <div>
                  <label htmlFor="special-instructions" className="block text-xl font-semibold mb-2 text-[#333333]">
                    Instructions spéciales
                  </label>
                  <textarea
                      id="special-instructions"
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      rows={4}
                      className="w-full p-2 border border-[#B0BEC5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4C8BF5]"
                      placeholder="Ajoutez ici toute instruction spéciale pour le patient..."
                  ></textarea>
                </div>

                <button
                    type="submit"
                    className="px-6 py-2 bg-[#4C8BF5] text-white rounded-md hover:bg-[#3A5FCD] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4C8BF5] flex items-center"
                >
                  <FileText className="mr-2" />
                  Soumettre la prescription
                </button>
              </form>
            </>
        )}
      </div>
  );
};


export default function PrescriptionForm()
{
  return(
      <DashBoard linkList={links} requiredRole="doctor">
        <PrescriptionForm2></PrescriptionForm2>
      </DashBoard>
  )
}