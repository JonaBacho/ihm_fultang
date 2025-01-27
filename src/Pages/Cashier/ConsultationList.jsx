import { useState } from "react"
import { Search, Calendar, User, DollarSign, Filter, CheckCircle } from "lucide-react"

// Données simulées pour 5 consultations
const mockConsultations = [
  {
    id: 1,
    patientName: "Jean Dupont",
    doctorName: "Dr. Marie Martin",
    date: "2023-06-15",
    amount: 15000,
    status: "pending",
  },
  {
    id: 2,
    patientName: "Sophie Lefebvre",
    doctorName: "Dr. Pierre Dubois",
    date: "2023-06-16",
    amount: 20000,
    status: "paid",
  },
  {
    id: 3,
    patientName: "Lucas Moreau",
    doctorName: "Dr. Camille Bernard",
    date: "2023-06-17",
    amount: 18000,
    status: "pending",
  },
  {
    id: 4,
    patientName: "Emma Petit",
    doctorName: "Dr. Thomas Roux",
    date: "2023-06-18",
    amount: 22000,
    status: "pending",
  },
  {
    id: 5,
    patientName: "Léa Lambert",
    doctorName: "Dr. Julie Girard",
    date: "2023-06-19",
    amount: 17000,
    status: "paid",
  },
]

export default function ConsultationList() {
  const [consultations, setConsultations] = useState(mockConsultations)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const handlePayment = (consultationId) => {
    setConsultations((prevConsultations) =>
        prevConsultations.map((consultation) =>
            consultation.id === consultationId ? { ...consultation, status: "paid" } : consultation,
        ),
    )
  }

  const filteredConsultations = consultations.filter((consultation) => {
    return (
        (consultation.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            consultation.doctorName.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterStatus === "all" || consultation.status === filterStatus)
    )
  })

  return (
      <div className="w-full mx-auto p-6 rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Management of Consulting Payments</h1>

        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <div className="relative w-full md:w-1/3">
            <input
                type="text"
                placeholder="Rechercher un patient ou un médecin"
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
              <option value="all">All Status</option>
              <option value="pending">On load</option>
              <option value="paid">Payed</option>
            </select>
          </div>
        </div>


          <table className="w-full ">
            <thead className="bg-primary-end">
            <tr>
              <th className="px-6 py-5 text-center text-md font-bold text-white uppercase  rounded-l-lg">
                Patient
              </th>
              <th className="px-6 py-5 text-center text-md font-bold text-white uppercase ">
                Doctor
              </th>
              <th className="px-6 py-5 text-center text-md font-bold text-white uppercase ">Date</th>
              <th className="px-6 py-5 text-center text-md font-bold text-white uppercase ">
                Price
              </th>
              <th className="px-6 py-5 text-center text-md font-bold text-white uppercase ">Status</th>
              <th className="px-6 py-5 text-center text-md font-bold text-white uppercase  rounded-r-lg">Action</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
            {filteredConsultations.map((consultation) => (
                <tr key={consultation.id}>
                  <td className=" py-6 ">
                    <div className="flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-400 mr-2" />
                      <div className="text-md font-semibold text-gray-900">{consultation.patientName}</div>
                    </div>
                  </td>
                  <td className=" py-6 ">
                    <div className="text-md text-center text-gray-900">{consultation.doctorName}</div>
                  </td>
                  <td className=" py-6 ">
                    <div className="flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                      <div className="text-md text-center text-gray-900">{new Date(consultation.date).toLocaleDateString()}</div>
                    </div>
                  </td>
                  <td className=" py-6  ">
                    <div className="flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                      <div className="text-md text-center text-gray-900">{consultation.amount} FCFA</div>
                    </div>
                  </td>
                  <td className=" py-6  items-center justify-center flex ">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${consultation.status === "paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                    >
                      {consultation.status === "paid" ? "Paid" : "On Load"}
                    </span>
                  </td>
                  <td className="text-md font-medium text-center py-6">
                    {consultation.status === "pending" && (
                        <button
                            onClick={() => handlePayment(consultation.id)}
                            className="text-primary-end hover:text-green-700 transition-all duration-500 flex items-center justify-center mx-auto"
                        >
                          <CheckCircle className="h-6 w-6 mr-1" />
                          Pay
                        </button>
                    )}
                  </td>
                </tr>
            ))}
            </tbody>
          </table>

      </div>
  )
}

