import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const mockPatients = [
  { id: 1, name: "Jean Dupont" },
  { id: 2, name: "Marie Martin" },
  { id: 3, name: "Pierre Durand" },
  { id: 4, name: "Sophie Lefebvre" },
];

// eslint-disable-next-line react/prop-types
export default function PatientSearch({ onSelectPatient }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);

  useEffect(() => {
    const results = mockPatients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPatients(results);
  }, [searchTerm]);

  return (
      <div className="mb-6">
        <div className="relative">
          <input
              type="text"
              placeholder="Rechercher un patient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 border border-[#B0BEC5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4C8BF5]"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B0BEC5]" size={20} />
        </div>
        {searchTerm && (
            <ul className="mt-2 border border-[#B0BEC5] rounded-md bg-white">
              {filteredPatients.map((patient) => (
                  <li
                      key={patient.id}
                      className="p-2 hover:bg-[#F0F0F0] cursor-pointer"
                      onClick={() => onSelectPatient(patient)}
                  >
                    {patient.name}
                  </li>
              ))}
            </ul>
        )}
      </div>
  );
}