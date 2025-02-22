"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { FileText, Calendar, User, Stethoscope, ArrowLeft, Printer, Download } from "lucide-react"
import { laboratoryNavLink } from "./LaboratoryNavLink.js"
import { LaboratoryNavBar } from "./LaboratoryNavBar.jsx"
import { LaboratoryDashBoard } from "./LaboratoryDashBoard.jsx"
import axiosInstance from "../../Utils/axiosInstance.js"
import Loader from "../../GlobalComponents/Loader.jsx"
import ServerErrorPage from "../../GlobalComponents/ServerError.jsx"
import { formatDateOnly, formatDateToTime } from "../../Utils/formatDateMethods.js"

export function ExamResultDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [examResult, setExamResult] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchExamResult = async () => {
            try {
                const response = await axiosInstance.get(`/exam-result/1/`)
                setExamResult(response.data)
                setIsLoading(false)
            } catch (err) {
                setError(err)
                setIsLoading(false)
            }
        }

        fetchExamResult()
    }, [id])

    if (isLoading) {
        return (
            <LaboratoryDashBoard linkList={laboratoryNavLink} requiredRole={"Labtech"}>
                <LaboratoryNavBar />
                <div className="h-[500px] w-full flex justify-center items-center">
                    <Loader size={"medium"} color={"primary-end"} />
                </div>
            </LaboratoryDashBoard>
        )
    }

    if (error) {
        return <ServerErrorPage errorStatus={error.status} message={error.message} />
    }

    return (
        <LaboratoryDashBoard linkList={laboratoryNavLink} requiredRole={"Labtech"}>
            <LaboratoryNavBar />
            <div className="flex flex-col min-h-screen p-8">
                {/* Header */}
                <div className="bg-gradient-to-br from-primary-end to-primary-start rounded-lg shadow-lg p-6 mb-6">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                            <FileText className="w-12 h-12 text-primary-start" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-white mb-2">Exam Result Details</h1>
                            <p className="text-white text-lg">ID: {examResult.id}</p>
                        </div>
                        <div className="text-white text-right">
                            <p className="font-bold">{formatDateOnly(examResult.addDate)}</p>
                            <p>{formatDateToTime(examResult.addDate)}</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="bg-gray-100 shadow-md rounded-lg mb-6 p-4">
                    <div className="flex justify-between items-center">
                        <button
                            onClick={() => navigate(-1)}
                            className="text-secondary text-xl transition-all duration-300 font-bold flex gap-2 items-center"
                        >
                            <div className="w-8 h-8 border-2 rounded-full flex justify-center items-center border-secondary">
                                <ArrowLeft />
                            </div>
                            <p className="text-[17px] mt-0.5">Back to Exam Results</p>
                        </button>
                        <div className="flex gap-2">
                            <button
                                onClick={() => window.print()}
                                className="bg-secondary font-bold duration-300 text-white px-4 py-2 rounded-md hover:bg-primary-end transition-all"
                            >
                                <Printer size={20} className="inline mr-2" />
                                Print Result
                            </button>
                            {examResult.examFile && (
                                <a
                                    href={examResult.examFile}
                                    download
                                    className="bg-primary-start font-bold duration-300 text-white px-4 py-2 rounded-md hover:bg-primary-end transition-all"
                                >
                                    <Download size={20} className="inline mr-2" />
                                    Download File
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Exam Details */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Exam Information</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <Calendar className="w-5 h-5 mr-2 text-primary-start" />
                            <span className="font-semibold mr-2">Date:</span>
                            <span>{formatDateOnly(examResult.addDate)}</span>
                        </div>
                        <div className="flex items-center">
                            <User className="w-5 h-5 mr-2 text-primary-start" />
                            <span className="font-semibold mr-2">Patient ID:</span>
                            <span>{examResult.idPatient}</span>
                        </div>
                        <div className="flex items-center">
                            <Stethoscope className="w-5 h-5 mr-2 text-primary-start" />
                            <span className="font-semibold mr-2">Medical Staff ID:</span>
                            <span>{examResult.idMedicalStaff}</span>
                        </div>
                        <div className="flex items-center">
                            <FileText className="w-5 h-5 mr-2 text-primary-start" />
                            <span className="font-semibold mr-2">Exam Request ID:</span>
                            <span>{examResult.idExamRequest}</span>
                        </div>
                    </div>
                </div>

                {/* Exam Notes */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Exam Notes</h2>
                    <p className="text-gray-600 whitespace-pre-wrap">{examResult.notes || "No notes provided."}</p>
                </div>

                {/* Exam File */}
                {examResult.examFile && (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Exam File</h2>
                        <a
                            href={examResult.examFile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-start hover:text-primary-end transition-colors"
                        >
                            View Exam File
                        </a>
                    </div>
                )}
            </div>
        </LaboratoryDashBoard>
    )
}

