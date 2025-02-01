import { useEffect, useState } from "react"
import {AlertCircle, Search, Calendar, User, DollarSign, Filter, CheckCircle, Activity } from "lucide-react"
import axiosInstance from "../../Utils/axiosInstance.js";


const mockHospitalisations = [
    [
        // {
        //   id: 1,
        //   atDate: "2025-01-25",
        //   bedLabel: "Bed A1",
        //   note: "Patient under observation due to chest pain.",
        //   isActive: true,
        //   removeAt: null,
        //   idRoom: 101,
        //   idPatient: 2001,
        //   idMedicalStaff: 3001
        // },
        // {
        //   id: 2,
        //   atDate: "2025-01-28",
        //   bedLabel: "Bed B2",
        //   note: "Patient undergoing post-surgery recovery.",
        //   isActive: false,
        //   removeAt: "2025-01-30",
        //   idRoom: 102,
        //   idPatient: 2002,
        //   idMedicalStaff: 3002
        // },
        // {
        //   id: 3,
        //   atDate: "2025-01-20",
        //   bedLabel: "Bed C3",
        //   note: "Patient admitted for long-term rehabilitation.",
        //   isActive: true,
        //   removeAt: null,
        //   idRoom: 103,
        //   idPatient: 2003,
        //   idMedicalStaff: 3003
        // },
        // {
        //   id: 4,
        //   atDate: "2025-01-22",
        //   bedLabel: "Bed D4",
        //   note: "Observation for high fever and dehydration.",
        //   isActive: false,
        //   removeAt: "2025-01-24",
        //   idRoom: 104,
        //   idPatient: 2004,
        //   idMedicalStaff: 3004
        // },
        // {
        //   id: 5,
        //   atDate: "2025-01-18",
        //   bedLabel: "Bed E5",
        //   note: "Patient admitted for monitoring after accident.",
        //   isActive: true,
        //   removeAt: null,
        //   idRoom: 105,
        //   idPatient: 2005,
        //   idMedicalStaff: 3005
        // }
      ]      
]

export default function HospitalisationList() {
  const [hospitalisations, setHospitalisations] = useState(mockHospitalisations)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  

//   const handlePayment = (hospitalisationId) => {
//     setHospitalisations((prevHospitalisations) => prevHospitalisations.map((hospitalisation) => (hospitalisation.id === hospitalisationId ? { ...hospitalisation, status: "paid" } : hospitalisation)))
//   }

//   const filteredHospitalisations = hospitalisations.filter((hospitalisation) => {
//     return (
//         (hospitalisation.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             hospitalisation.hospitalisationType.toLowerCase().includes(searchTerm.toLowerCase())) &&
//         (filterStatus === "all" || hospitalisation.status === filterStatus)
//     )
//   })

   useEffect(() => {
     async function fetchHospitalisations()
     {
        
         try
         {
             const response = await axiosInstance.get("http://85.214.142.178:8009/api/v1/medical/hospitalisation/");
           
             if (response.status === 200)
             {
                 setHospitalisations(response.data.results);
             }
         }
         catch (error)
         {
            
             console.log(error);
         }
     }
     fetchHospitalisations();
 }, []);

  return (
      <div className="mx-auto p-6  rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Management of hospitalisation Payments</h1>
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-full md:w-1/3">
            <input
                type="text"
                placeholder="Rechercher un patient ou un hospitalisationen"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="flex items-center space-x-4">
            <Filter className="text-gray-400" />
            <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All statuses</option>
              <option value="pending">On hold</option>
              <option value="paid">Payed</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
        {
              hospitalisations.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10">
                    <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-lg font-semibold text-gray-600">
                      No hospitalisations available.
                    </p>
                </div>
              ) : ( 
                <table className="w-full bg-white">
                  <thead className="bg-primary-end">
                  <tr>
                    <th className="px-4 py-3 text-center text-md font-semibold text-white uppercase rounded-l-lg ">
                      ID
                    </th>

                    <th className="px-4 py-3 text-center text-md font-semibold  text-white uppercase ">
                      At Date
                    </th>

                    <th className="px-4 py-3 text-center text-md font-semibold  text-white uppercase ">Bed Label</th>

                    <th className="px-4 py-3 text-center text-md font-semibold  text-white uppercase ">
                        Note
                    </th>

                    <th className="px-4 py-3 text-center text-md font-semibold  text-white uppercase ">Status</th>

                    <th className="px-4 py-3 text-center text-md font-semibold  text-white uppercase ">Removal Date</th>

                    <th className="px-4 py-3 text-center text-md font-semibold  text-white uppercase ">Room</th>

                    <th className="px-4 py-3 text-center text-md font-semibold  text-white uppercase ">Patient</th>

                    <th className="px-4 py-3 text-center text-md font-semibold  text-white uppercase rounded-r-lg">Medical Staff</th>
                  </tr>
                  </thead>
                    <tbody className="divide-y divide-gray-200">
                    {hospitalisations.map((hospitalisation) => (
                        <tr key={hospitalisation.id}>
                          <td className="px-4 py-3 ">
                            <div className="flex items-center justify-center">
                              <div className="text-md font-semibold text-gray-900">{hospitalisation.id}</div>
                            </div>
                          </td>

                          <td className="px-4 py-3 ">
                            <div className="flex items-center justify-center">
                              <div className="text-md text-gray-900">{hospitalisation.atDate}</div>
                            </div>
                          </td>

                          <td className="px-4 py-3 ">
                            <div className="flex items-center justify-center">
                              <div className="text-md text-gray-900">{hospitalisation.bedLabel}</div>
                            </div>
                          </td>

                          <td className="px-4 py-3 ">
                            <div className="flex items-center justify-center">
                              <div className="text-sm text-gray-900">{hospitalisation.note}</div>
                            </div>
                          </td>

                          <td className="px-4 py-3  flex justify-center items-center">
                            <span className={`px-2 inline-flex text-center text-xs leading-5 font-semibold rounded-full ${hospitalisation.isActive ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                              {hospitalisation.isActive ? "Active" : "Not Active"}
                            </span>
                          </td>

                          <td className="px-4 py-3 ">
                            <div className="flex items-center justify-center">
                              <div className="text-sm text-gray-900">{hospitalisation.idRoom}</div>
                            </div>
                          </td>

                          <td className="px-4 py-3 ">
                            <div className="flex items-center justify-center">
                              <div className="text-sm text-gray-900">{hospitalisation.idPatient}</div>
                            </div>
                          </td>

                          <td className="px-4 py-3 ">
                            <div className="flex items-center justify-center">
                              <div className="text-sm text-gray-900">{hospitalisation.idMedicalStaff}</div>
                            </div>
                          </td>

                          

                        </tr>
                    ))}
                    </tbody>
          </table>
              )}
        </div>
      </div>
  )
}


