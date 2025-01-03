import  { useState } from 'react';
import { Plus, Trash2, FileText } from 'lucide-react';
import PatientSearch from './PatientSearch';

export default function ExamPrescriptionForm() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [exams, setExams] = useState([{ type: '', details: '' }]);

  const addExam = () => {
    setExams([...exams, { type: '', details: '' }]);
  };

  const removeExam = (index) => {
    const newExams = exams.filter((_, i) => i !== index);
    setExams(newExams);
  };

  const updateExam = (index, field, value) => {
    const newExams = exams.map((exam, i) => {
      if (i === index) {
        return { ...exam, [field]: value };
      }
      return exam;
    });
    setExams(newExams);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Prescription d\'examens soumise:', { patient: selectedPatient, exams });
    // Ici, vous ajouteriez la logique pour envoyer les données au serveur
  };

  return (
      <div className="container mx-auto p-4 md:p-6 bg-[#F9F9F9]">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#3A5FCD]">Prescription d&#39;Examens Médicaux</h1>

        <PatientSearch onSelectPatient={setSelectedPatient} />

        {selectedPatient && (
            <>
              <div className="bg-white p-4 rounded-md shadow-sm mb-6">
                <h2 className="text-xl font-semibold mb-2 text-[#333333]">Patient sélectionné</h2>
                <p>{selectedPatient.name}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-[#333333]">Examens prescrits</h2>
                  {exams.map((exam, index) => (
                      <div key={index} className="mb-4 p-4 border border-[#B0BEC5] rounded-md bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor={`exam-type-${index}`} className="block text-sm font-medium text-[#333333] mb-1">
                              Type d&#39;examen
                            </label>
                            <input
                                type="text"
                                id={`exam-type-${index}`}
                                value={exam.type}
                                onChange={(e) => updateExam(index, 'type', e.target.value)}
                                className="w-full p-2 border border-[#B0BEC5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4C8BF5]"
                                required
                            />
                          </div>
                          <div>
                            <label htmlFor={`exam-details-${index}`} className="block text-sm font-medium text-[#333333] mb-1">
                              Détails éventuels
                            </label>
                            <textarea
                                id={`exam-details-${index}`}
                                value={exam.details}
                                onChange={(e) => updateExam(index, 'details', e.target.value)}
                                rows={3}
                                className="w-full p-2 border border-[#B0BEC5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4C8BF5]"
                            />
                          </div>
                        </div>
                        {exams.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeExam(index)}
                                className="mt-2 text-[#B39DDB] hover:text-[#9575CD] focus:outline-none"
                                aria-label="Supprimer cet examen"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                        )}
                      </div>
                  ))}
                  <button
                      type="button"
                      onClick={addExam}
                      className="mt-2 flex items-center text-[#4C8BF5] hover:text-[#3A5FCD] focus:outline-none"
                  >
                    <Plus className="h-5 w-5 mr-1" />
                    Ajouter un examen
                  </button>
                </div>

                <button
                    type="submit"
                    className="px-6 py-2 bg-[#4C8BF5] text-white rounded-md hover:bg-[#3A5FCD] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4C8BF5] flex items-center"
                >
                  <FileText className="mr-2" />
                  Soumettre la prescription d&#39;examens
                </button>
              </form>
            </>
        )}
      </div>
  );
}