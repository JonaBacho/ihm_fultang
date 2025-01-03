'use client'

import  { useState } from 'react';
import { Calendar, Clock, AlertCircle } from 'lucide-react';
import PatientSearch from './PatientSearch';
import { appointments } from '../data/mockData';

const checkExistingAppointment = (date, time) => {
  return appointments.some(apt => apt.date === date && apt.time === time);
};

export default function AppointmentForm() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [notification, setNotification] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkExistingAppointment(date, time)) {
      setNotification('Un rendez-vous existe déjà à cette date et heure.');
    } else {
      console.log('Rendez-vous enregistré:', { patient: selectedPatient, date, time, appointmentType });
      setNotification('Rendez-vous enregistré avec succès.');
      // Ici, vous ajouteriez la logique pour envoyer les données au serveur
    }
  };

  return (
      <div className="container mx-auto p-4 md:p-6 bg-[#F9F9F9]">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#3A5FCD]">Donner un Rendez-Vous</h1>

        <PatientSearch onSelectPatient={setSelectedPatient} />

        {selectedPatient && (
            <>
              <div className="bg-white p-4 rounded-md shadow-sm mb-6">
                <h2 className="text-xl font-semibold mb-2 text-[#333333]">Patient sélectionné</h2>
                <p>{selectedPatient.name}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-[#333333] mb-1">
                      Date
                    </label>
                    <div className="relative">
                      <input
                          type="date"
                          id="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full p-2 pl-10 border border-[#B0BEC5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4C8BF5]"
                          required
                      />
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B0BEC5]" size={20} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-[#333333] mb-1">
                      Heure
                    </label>
                    <div className="relative">
                      <input
                          type="time"
                          id="time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="w-full p-2 pl-10 border border-[#B0BEC5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4C8BF5]"
                          required
                      />
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B0BEC5]" size={20} />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="appointmentType" className="block text-sm font-medium text-[#333333] mb-1">
                    Type de rendez-vous
                  </label>
                  <select
                      id="appointmentType"
                      value={appointmentType}
                      onChange={(e) => setAppointmentType(e.target.value)}
                      className="w-full p-2 border border-[#B0BEC5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4C8BF5]"
                      required
                  >
                    <option value="">Sélectionnez un type</option>
                    <option value="consultation">Consultation générale</option>
                    <option value="suivi">Suivi</option>
                    <option value="examen">Examen</option>
                    <option value="urgence">Urgence</option>
                  </select>
                </div>
                <button
                    type="submit"
                    className="w-full md:w-auto px-6 py-2 bg-[#4C8BF5] text-white rounded-md hover:bg-[#3A5FCD] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4C8BF5]"
                >
                  Enregistrer le rendez-vous
                </button>
              </form>
            </>
        )}

        {notification && (
            <div className={`mt-4 p-4 rounded-md ${notification.includes('succès') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              <div className="flex items-center">
                <AlertCircle className="mr-2 flex-shrink-0" size={20} />
                <p>{notification}</p>
              </div>
            </div>
        )}
      </div>
  );
}