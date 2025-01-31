import { useEffect, useState } from "react"
import {AlertCircle, Search, Calendar, User, DollarSign, Filter, CheckCircle, Activity } from "lucide-react"
import axiosInstance from "../../Utils/axiosInstance.js";


const mockExams = [
  
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

   useEffect(() => {
     async function fetchExams()
     {
        
         try
         {
             const response = await axiosInstance.get("http://85.214.142.178:8009/api/v1/medical/exam-request/");
           
             if (response.status === 200)
             {
                 setExams(response.data.results);
             }
         }
         catch (error)
         {
            
             console.log(error);
         }
     }
     fetchExams();
 }, []);

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
        {
              exams.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10">
                    <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-lg font-semibold text-gray-600">
                      Pas d'examens disponibles.
                    </p>
                </div>
              ) : ( 
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
              )}
        </div>
      </div>
  )
}

