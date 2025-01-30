import {
    User,
    Calendar,
    DollarSign,
    Weight,
    Ruler,
    Thermometer,
    Activity,
    PillIcon as Pills,
    FileText,
    Stethoscope,
    ClipboardList,
} from "lucide-react"
import {DoctorDashboard} from "../New/DoctorDashboard.jsx";
import {doctorNavLink} from "../New/doctorNavLink.js";
import {DoctorNavBar} from "../New/DoctorNavBar.jsx";
import {useLocation} from "react-router-dom";

export  function ConsultationHistoryDetails() {

    const {state} = useLocation();
    const consultation = state?.consultation || {};


    return (
        <DoctorDashboard linkList={doctorNavLink} requiredRole={"Doctor"}>
            <DoctorNavBar/>
        <div className="space-y-6">
            {/* En-tête du patient */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Informations patient */}
                    <div>
                        <div className="flex items-center mb-4">
                            <User className="h-5 w-5 text-gray-400 mr-2" />
                            <div>
                                <h2 className="text-lg font-semibold">{consultation.patientName}</h2>
                                <p className="text-sm text-gray-500">{consultation.patientId}</p>
                            </div>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <Calendar className="h-5 w-5 mr-2" />
                            <span>
                {new Date(consultation.date).toLocaleDateString()} - {consultation.time}
              </span>
                        </div>
                    </div>

                    {/* Prix consultation */}
                    <div>
                        <div className="flex items-center text-gray-600">
                            <DollarSign className="h-5 w-5 mr-2" />
                            <span>{consultation.price.toLocaleString()} FCFA</span>
                        </div>
                    </div>

                    {/* Notes infirmière */}
                    <div className="lg:col-span-1">
                        <h3 className="font-semibold mb-2 flex items-center">
                            <ClipboardList className="h-5 w-5 mr-2 text-blue-500" />
                            Notes de l'infirmière
                        </h3>
                        <p className="text-sm text-gray-600">{consultation.nurseNotes}</p>
                    </div>
                </div>

                {/* Paramètres vitaux */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center text-gray-600">
                            <Weight className="h-5 w-5 mr-2 text-blue-500" />
                            <span className="text-sm">Poids</span>
                        </div>
                        <p className="text-lg font-semibold mt-1">{consultation.vitals.weight}</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center text-gray-600">
                            <Ruler className="h-5 w-5 mr-2 text-blue-500" />
                            <span className="text-sm">Taille</span>
                        </div>
                        <p className="text-lg font-semibold mt-1">{consultation.vitals.height}</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center text-gray-600">
                            <Thermometer className="h-5 w-5 mr-2 text-blue-500" />
                            <span className="text-sm">Température</span>
                        </div>
                        <p className="text-lg font-semibold mt-1">{consultation.vitals.temperature}</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center text-gray-600">
                            <Activity className="h-5 w-5 mr-2 text-blue-500" />
                            <span className="text-sm">Tension</span>
                        </div>
                        <p className="text-lg font-semibold mt-1">{consultation.vitals.bloodPressure}</p>
                    </div>
                </div>
            </div>

            {/* Détails de la consultation */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                {/* Diagnostic */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <Stethoscope className="h-5 w-5 mr-2 text-blue-500" />
                        Diagnostic
                    </h3>
                    <p className="text-gray-700">{consultation.diagnostic}</p>
                    <div className="mt-4">
                        <h4 className="font-medium text-gray-700 mb-2">Notes du médecin</h4>
                        <p className="text-gray-600">{consultation.doctorNotes}</p>
                    </div>
                </div>

                {/* Prescriptions */}
                {consultation.prescriptions.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                            <Pills className="h-5 w-5 mr-2 text-blue-500" />
                            Prescriptions
                        </h3>
                        <div className="space-y-4">
                            {consultation.prescriptions.map((prescription, index) => (
                                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="text-sm text-gray-500">Médicament</span>
                                            <p className="font-medium">{prescription.medication}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-500">Dosage</span>
                                            <p className="font-medium">{prescription.dosage}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-500">Fréquence</span>
                                            <p className="font-medium">{prescription.frequency}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-500">Durée</span>
                                            <p className="font-medium">{prescription.duration}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Examens */}
                {consultation.exams.length > 0 && (
                    <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                            <FileText className="h-5 w-5 mr-2 text-blue-500" />
                            Examens prescrits
                        </h3>
                        <div className="space-y-4">
                            {consultation.exams.map((exam, index) => (
                                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                    <div className="mb-2">
                                        <span className="text-sm text-gray-500">Examen</span>
                                        <p className="font-medium">{exam.name}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500">Instructions</span>
                                        <p className="text-gray-700">{exam.instructions}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
        </DoctorDashboard>
    )
}

