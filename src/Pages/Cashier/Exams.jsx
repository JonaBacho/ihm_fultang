import { useState } from "react"
import { Search, Calendar, User, DollarSign, Filter, CheckCircle, Activity } from "lucide-react"


const mockExams = [
  {
    id: 1,
    patientName: "Marie Dubois",
    examType: "IRM Cérébral",
    date: "2023-06-20",
    amount: 75000,
    status: "pending",
  },
  {
    id: 2,
    patientName: "Paul Martin",
    examType: "Scanner Thoracique",
    date: "2023-06-21",
    amount: 50000,
    status: "paid",
  },
  {
    id: 3,
    patientName: "Lucie Petit",
    examType: "Échographie Abdominale",
    date: "2023-06-22",
    amount: 30000,
    status: "pending",
  },
  {
    id: 4,
    patientName: "Thomas Leroy",
    examType: "Radiographie Dentaire",
    date: "2023-06-23",
    amount: 25000,
    status: "pending",
  },
  {
    id: 5,
    patientName: "Sophie Moreau",
    examType: "Mammographie",
    date: "2023-06-24",
    amount: 40000,
    status: "paid",
  },
]

export default function Exams() {
  const [exams, setExams] = useState(mockExams)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const handlePayment = (examId) => {
    setExams((prevExams) => prevExams.map((exam) => (exam.id === examId ? { ...exam, status: "paid" } : exam)))
  }

  const filteredExams = exams.filter((exam) => {
    return (
        (exam.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exam.examType.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterStatus === "all" || exam.status === filterStatus)
    )
  })

  return (
      <div className="mx-auto p-6  rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Management of Exam Payments</h1>
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-full md:w-1/3">
            <input
                type="text"
                placeholder="Rechercher un patient ou un examen"
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
          <table className="w-full bg-white">
            <thead className="bg-primary-end">
            <tr>
              <th className="px-6 py-5 text-center text-md font-semibold text-white uppercase rounded-l-lg ">
                Patient
              </th>

              <th className="px-6 py-5 text-center text-md font-semibold  text-white uppercase ">
                Exam Type
              </th>

              <th className="px-6 py-5 text-center text-md font-semibold  text-white uppercase ">Date</th>

              <th className="px-6 py-5 text-center text-md font-semibold  text-white uppercase ">
                Price
              </th>

              <th className="px-6 py-5 text-center text-md font-semibold  text-white uppercase ">Status</th>

              <th className="px-6 py-5 text-center text-md font-semibold  text-white uppercase rounded-r-lg">Action</th>

            </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
            {filteredExams.map((exam) => (
                <tr key={exam.id}>
                  <td className="px-6 py-5 ">
                    <div className="flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-400 mr-2" />
                      <div className="text-md font-semibold text-gray-900">{exam.patientName}</div>
                    </div>
                  </td>

                  <td className="px-6 py-5 ">
                    <div className="flex items-center justify-center">
                      <Activity className="h-5 w-5 text-gray-400 mr-2" />
                      <div className="text-md text-gray-900">{exam.examType}</div>
                    </div>
                  </td>

                  <td className="px-6 py-5 ">
                    <div className="flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                      <div className="text-md text-gray-900">{new Date(exam.date).toLocaleDateString()}</div>
                    </div>
                  </td>

                  <td className="px-6 py-5 ">
                    <div className="flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                      <div className="text-sm text-gray-900">{exam.amount} FCFA</div>
                    </div>
                  </td>

                  <td className="px-6 py-5  flex justify-center items-center">
                    <span className={`px-2 inline-flex text-center text-xs leading-5 font-semibold rounded-full ${exam.status === "paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                      {exam.status === "paid" ? "Paid" : "On Load"}
                    </span>
                  </td>

                  <td className="text-md font-medium text-center py-5">
                    {exam.status === "pending" && (
                        <button onClick={() => handlePayment(exam.id)}
                            className="text-primary-end hover:text-green-700 transition-all duration-500 flex items-center justify-center mx-auto">
                          <CheckCircle className="h-5 w-5 mr-1" />
                          Pay
                        </button>
                    )}
                  </td>

                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
  )
}

