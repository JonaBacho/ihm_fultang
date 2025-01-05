
import  { useState } from 'react';
import {Calendar, Clock, AlertCircle, FileText, Pill, Stethoscope, ClipboardList, Users} from 'lucide-react';
import {DashBoard} from "../../../GlobalComponents/DashBoard.jsx";
import { Search, UserPlus, User ,  X, CheckCircle2} from 'lucide-react';
import {links} from "../Doctor.jsx";




export const AppointmentForm2 = () => {
  // États pour les données principales
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentData, setAppointmentData] = useState({
    date: '',
    time: '',
    reason: '',
    requirements: '',
    status: 'pending'
  });

  // États pour l'interface
  const [activeTab, setActiveTab] = useState('search');
  const [searchPatient, setSearchPatient] = useState('');
  const [searchDoctor, setSearchDoctor] = useState('');
  const [notification, setNotification] = useState(null);

  // Données mockées (à remplacer par des appels API)
  const patients = [
    { id: 1, name: "Jean Dupont", age: 45, email: "jean@email.com", phone: "0123456789" },
    { id: 2, name: "Marie Martin", age: 32, email: "marie@email.com", phone: "0123456788" },
    { id: 3, name: "Pierre Durant", age: 28, email: "pierre@email.com", phone: "0123456787" },
  ];

  const doctors = [
    { id: 1, name: "Dr. Sophie Bernard", speciality: "Généraliste" },
    { id: 2, name: "Dr. Thomas Robert", speciality: "Cardiologue" },
    { id: 3, name: "Dr. Claire Dubois", speciality: "Pédiatre" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPatient || !selectedDoctor) {
      setNotification({
        message: 'Veuillez sélectionner un patient et un médecin.',
        type: 'error'
      });
      return;
    }

    // Préparation des données pour l'API
    const appointmentPayload = {
      ...appointmentData,
      patientId: selectedPatient.id,
      doctorId: selectedDoctor.id,
    };

    // Simulation d'appel API
    try {
      // await createAppointment(appointmentPayload);
      setNotification({
        message: 'Rendez-vous enregistré avec succès',
        type: 'success'
      });
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setNotification({
        message: 'Erreur lors de l\'enregistrement du rendez-vous',
        type: 'error'
      });
    }
  };

  // Filtrer les patients et docteurs en fonction de la recherche
  const filteredPatients = patients.filter(patient =>
      patient.name.toLowerCase().includes(searchPatient.toLowerCase())
  );

  const filteredDoctors = doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(searchDoctor.toLowerCase())
  );

  if (!selectedPatient) {
    return (
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-center mb-8">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                  <UserPlus className="w-8 h-8 text-green-700" />
                </div>
              </div>

              <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
                Nouveau Rendez-vous
              </h1>
              <p className="text-center text-gray-600 mb-8">
                Commencez par sélectionner un patient pour programmer le rendez-vous
              </p>

              <div className="bg-white rounded-xl">
                <div className="flex justify-center space-x-2 mb-6">
                  <button
                      onClick={() => setActiveTab('search')}
                      className={`px-6 py-2 rounded-lg font-medium transition-all ${
                          activeTab === 'search'
                              ? 'bg-green-700 text-white shadow-md'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    Rechercher
                  </button>
                  <button
                      onClick={() => setActiveTab('list')}
                      className={`px-6 py-2 rounded-lg font-medium transition-all ${
                          activeTab === 'list'
                              ? 'bg-green-700 text-white shadow-md'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    Liste des patients
                  </button>
                </div>

                {activeTab === 'search' && (
                    <div className="relative">
                      <input
                          type="text"
                          placeholder="Rechercher un patient..."
                          value={searchPatient}
                          onChange={(e) => setSearchPatient(e.target.value)}
                          className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                      />
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                )}

                <div className="mt-4 max-h-96 overflow-y-auto">
                  {filteredPatients.map(patient => (
                      <button
                          key={patient.id}
                          onClick={() => setSelectedPatient(patient)}
                          className="w-full p-4 flex items-center space-x-4 hover:bg-green-50 rounded-lg transition-all group"
                      >
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-all">
                          <User className="w-6 h-6 text-green-700" />
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
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-gray-800">
                Nouveau Rendez-vous
              </h1>
              <button
                  onClick={() => setSelectedPatient(null)}
                  className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mb-8 p-6 bg-green-50 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-green-700" />
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

            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800">
                  Sélectionner un médecin
                </h3>
                <div className="relative">
                  <input
                      type="text"
                      placeholder="Rechercher un médecin..."
                      value={searchDoctor}
                      onChange={(e) => setSearchDoctor(e.target.value)}
                      className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {filteredDoctors.map(doctor => (
                      <button
                          key={doctor.id}
                          onClick={() => setSelectedDoctor(doctor)}
                          className={`p-4 rounded-lg border transition-all ${
                              selectedDoctor?.id === doctor.id
                                  ? 'border-green-500 bg-green-50'
                                  : 'border-gray-200 hover:border-green-200 hover:bg-green-50'
                          }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-green-700" />
                          </div>
                          <div className="text-left">
                            <h4 className="font-medium text-gray-800">{doctor.name}</h4>
                            <p className="text-sm text-gray-500">{doctor.speciality}</p>
                          </div>
                        </div>
                      </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <div className="relative">
                      <input
                          type="date"
                          value={appointmentData.date}
                          onChange={(e) => setAppointmentData({
                            ...appointmentData,
                            date: e.target.value
                          })}
                          className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
                          required
                      />
                      <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Heure
                    </label>
                    <div className="relative">
                      <input
                          type="time"
                          value={appointmentData.time}
                          onChange={(e) => setAppointmentData({
                            ...appointmentData,
                            time: e.target.value
                          })}
                          className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
                          required
                      />
                      <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Raison du rendez-vous
                  </label>
                  <textarea
                      value={appointmentData.reason}
                      onChange={(e) => setAppointmentData({
                        ...appointmentData,
                        reason: e.target.value
                      })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none resize-none"
                      rows={3}
                      required
                      placeholder="Décrivez la raison de la consultation..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exigences particulières
                  </label>
                  <textarea
                      value={appointmentData.requirements}
                      onChange={(e) => setAppointmentData({
                        ...appointmentData,
                        requirements: e.target.value
                      })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none resize-none"
                      rows={2}
                      placeholder="Ex: Être à jeun, apporter les résultats d'analyses..."
                  />
                </div>

                <div className="flex justify-end">
                  <button
                      type="submit"
                      className="px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Confirmer le rendez-vous
                  </button>
                </div>
              </form>
            </div>

            {notification && (
                <div className={`mt-6 p-4 rounded-lg flex items-center space-x-3 ${
                    notification.type === 'success'
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-red-50 border border-red-200'
                }`}>
                  {notification.type === 'success' ? (
                      <CheckCircle2 className="w-5 h-5 text-green-700" />
                  ) : (
                      <AlertCircle className="w-5 h-5 text-red-700" />
                  )}
                  <p className={`text-sm ${
                      notification.type === 'success' ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {notification.message}
                  </p>
                </div>
            )}
          </div>
        </div>
      </div>
  );
};



export function AppointmentForm() {
  return (
      <DashBoard linkList={links} requiredRole="doctor">
        <AppointmentForm2 />
      </DashBoard>
  );
}

export default AppointmentForm;