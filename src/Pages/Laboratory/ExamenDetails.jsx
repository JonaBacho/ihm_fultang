import React, { useState } from 'react';
import {
    MdDateRange,
    MdAssignment,
    MdLocalHospital,
    MdNote,
    MdUploadFile
} from 'react-icons/md';
import { FaUserCheck, FaUserTimes } from 'react-icons/fa';
import {laboratoryNavLink} from "./LaboratoryNavLink.js";
import {LaboratoryNavBar} from "./LaboratoryNavBar.jsx";
import {LaboratoryDashBoard} from "./LaboratoryDashBoard.jsx";
import {ArrowLeft, Printer} from "lucide-react";
import {useNavigate} from "react-router-dom";

export function ExamDetails() {
    const examData = {
        examName: "Complete Blood Count",
        prescriptionDate: "2023-12-01",
        status: "Pending",
        patientStatus: "Valid",
        doctorName: "Dr. Emily Johnson",
        doctorNotes: "Patient requires fasting 12 hours prior to test. Check for possible anemia indicators."
    };

    const [examStatus, setExamStatus] = useState(examData.status);
    const [patientStatus, setPatientStatus] = useState(examData.patientStatus);
    const [labNotes, setLabNotes] = useState('');
    const [resultFile, setResultFile] = useState(null);

    const handleFileUpload = (event) => {
        setResultFile(event.target.files[0]);
    };

    const navigate = useNavigate();
    return (
        <LaboratoryDashBoard linkList={laboratoryNavLink} requiredRole={"Labtech"}>
            <LaboratoryNavBar/>
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header Section */}

                    <div className="bg-gradient-to-r from-primary-end to-primary-start rounded-lg p-6 text-white mb-5">
                        <h1 className="text-3xl font-bold mb-2">Examen of Eric KOGHENE - 2025/06/23</h1>
                        <p className="opacity-90 font-semibold text-md">
                            This summary details the Examen request of Mr Eric KOGHENE with Dr. Tchassi Daniel.

                        </p>
                    </div>
                    <div className="bg-gray-100 shadow-md rounded-lg mb-5 p-4 ">
                        <div className="flex justify-between items-center ">
                            <div className="flex justify-start">
                                <button onClick={() => navigate(-1)}
                                        className="text-secondary text-xl hover:text-primary-end transition-all duration-300 font-bold flex items-center">
                                    <ArrowLeft/>
                                    Back To Consultation List
                                </button>
                            </div>
                            <div className="flex items-center">
                                <button
                                    onClick={() => {
                                        alert("implementing print function")
                                    }}
                                    className="bg-secondary font-bold duration-300  text-white px-4 py-2 rounded-md hover:bg-primary-end hover:text-white transition-all mr-2">
                                    <Printer size={20} className="inline mr-2"/>
                                    Print
                                </button>
                            </div>
                        </div>
                    </div>


                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                        {/* Left Column - Patient Info */}
                        <div className="space-y-6">
                            {/* Status Cards */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-teal-50 p-4 rounded-lg">
                                    <p className="text-sm text-teal-600 mb-1">Exam Status</p>
                                    <select
                                        value={examStatus}
                                        onChange={(e) => setExamStatus(e.target.value)}
                                        className="bg-transparent text-teal-700 font-medium focus:outline-none w-full"
                                    >
                                        <option value="Pending" className="bg-white">
                                            ⏳ Pending
                                        </option>
                                        <option value="Completed" className="bg-white">
                                            ✅ Completed
                                        </option>
                                    </select>
                                </div>

                                <div
                                    className={`p-4 rounded-lg ${patientStatus === "Valid" ? "bg-green-50" : "bg-red-50"}`}>
                                    <p className="text-sm mb-1">Patient Status</p>
                                    <div className="flex items-center space-x-2">
                                        {patientStatus === "Valid" ? (
                                            <FaUserCheck className="text-green-600"/>
                                        ) : (
                                            <FaUserTimes className="text-red-600"/>
                                        )}
                                        <span
                                            className={`font-medium ${patientStatus === "Valid" ? "text-green-700" : "text-red-700"}`}>
                      {patientStatus}
                    </span>
                                    </div>
                                </div>
                            </div>

                            {/* Patient Details */}
                            <div className="bg-gray-50 p-6 rounded-xl">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                    <MdLocalHospital className="text-teal-600 mr-2"/>
                                    Prescribing Physician
                                </h2>
                                <div className="space-y-3">
                                    <DetailItem
                                        icon={<MdDateRange className="text-gray-500"/>}
                                        label="Prescription Date"
                                        value={examData.prescriptionDate}
                                    />
                                    <DetailItem
                                        icon={<MdAssignment className="text-gray-500"/>}
                                        label="Doctor"
                                        value={examData.doctorName}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Actions */}
                        <div className="space-y-6">
                            {/* Medical Notes */}
                            <div className="bg-indigo-50 p-6 rounded-xl">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                    <MdNote className="text-indigo-600 mr-2"/>
                                    Medical Notes
                                </h2>
                                <p className="text-gray-600 leading-relaxed">{examData.doctorNotes}</p>
                            </div>

                            {/* Lab Technician Input */}
                            <div className="bg-white border border-gray-200 p-6 rounded-xl">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                    <MdNote className="text-teal-600 mr-2"/>
                                    Lab Notes
                                </h2>
                                <textarea
                                    value={labNotes}
                                    onChange={(e) => setLabNotes(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                    placeholder="Enter observations or additional notes..."
                                    rows="4"
                                />
                            </div>

                            {/* File Upload */}
                            <div className="bg-white border border-gray-200 p-6 rounded-xl">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                    <MdUploadFile className="text-teal-600 mr-2"/>
                                    Upload Results
                                </h2>
                                <div className="flex items-center space-x-4">
                                    <label className="flex-1 cursor-pointer">
                                        <input type="file" onChange={handleFileUpload} className="hidden"/>
                                        <div
                                            className="bg-teal-50 text-teal-700 px-6 py-3 rounded-lg hover:bg-teal-100 transition-colors text-center">
                                            {resultFile ? "Change File" : "Select File"}
                                        </div>
                                    </label>
                                    {resultFile &&
                                        <span className="text-sm text-gray-600 truncate">{resultFile.name}</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Footer */}
                    <div className="border-t border-gray-100 px-8 py-6 bg-gray-50">
                        <div className="flex justify-end space-x-4">
                            <button
                                className="px-8 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </LaboratoryDashBoard>
    );
}

const DetailItem = ({ icon, label, value }) => (
    <div className="flex items-center space-x-3">
        <div className="text-gray-400">{icon}</div>
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="font-medium text-gray-700">{value}</p>
        </div>
    </div>
);