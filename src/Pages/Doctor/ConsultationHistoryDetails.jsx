import {
    User,
    Calendar,
    Weight,
    Ruler,
    Thermometer,
    Activity,
    PillIcon as Pills,
    FileText,
    Stethoscope,
    ClipboardList, Heart, AlertTriangle, MapPin, Phone, ArrowLeft, Printer, Clock,
} from "lucide-react"
import {DoctorDashboard} from "./DoctorComponents/DoctorDashboard.jsx";
import {doctorNavLink} from "./lib/doctorNavLink.js";
import {DoctorNavBar} from "./DoctorComponents/DoctorNavBar.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useCalculateAge} from "../../Utils/compute.js";
import {formatDateOnly, formatDateToTime} from "../../Utils/formatDateMethods.js";
import MedicalParametersCard from "./DoctorComponents/MedicalParametersCard.jsx";

export  function ConsultationHistoryDetails() {

    const {state} = useLocation();
    const consultation = state?.consultation || {};

    const patientInfos = consultation?.idPatient;
    const patientParameters = consultation?.idMedicalFolderPage;

    const {calculateAge} = useCalculateAge();
    const { value: ageValue, unit: ageUnit } = calculateAge('2000-01-01');


    const MedicalParametersInfos = [
        {
            icon: Weight,
            label: 'Weight',
            value: patientParameters?.parameters?.weight || '-',
            unit:  patientParameters?.parameters?.weight && ' Kg'
        },
        {
            icon: Ruler,
            label: 'Height',
            value: patientParameters?.parameters?.height || '-',
            unit: patientParameters?.parameters?.height && ' m²'
        },
        {
            icon: Thermometer,
            label: 'Temperature',
            value: patientParameters?.parameters?.temperature || '-',
            unit:  patientParameters?.parameters?.temperature && '°C'
        },
        {
            icon: Activity,
            label: 'Blood Pressure',
            value: patientParameters?.parameters?.bloodPressure || '-',
            unit: patientParameters?.parameters?.bloodPressure && ' mmHg'
        },
        {
            icon: Heart,
            label: 'Heart Rate',
            value: patientParameters?.parameters?.heartRate || '-',
            unit: patientParameters?.parameters?.heartRate && ' bpm'
        },
        {
            icon: AlertTriangle,
            label: 'Allergies',
            value: patientParameters?.parameters?.allergies || '-'
        },
        {
            icon: Pills,
            label: 'Family Medical History',
            value: patientParameters?.parameters?.familyMedicalHistory || '-'
        },
        {
            icon: FileText,
            label: 'Current Medication',
            value: patientParameters?.parameters?.currentMedication || '-'
        }
    ];


    const navigate = useNavigate();


    return (
        <DoctorDashboard linkList={doctorNavLink} requiredRole={"Doctor"}>
            <DoctorNavBar/>
        <div className="space-y-6">

            {/* Patient Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="bg-gradient-to-br from-primary-end to-primary-start rounded-lg shadow-lg p-6 mb-6">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                            <User className="w-12 h-12 text-black"/>
                        </div>
                        <div className="flex-1 flex flex-col gap-3">
                            <div className="flex justify-between">
                                <h1 className="text-3xl font-bold text-white">CONSULTATION
                                    OF {patientInfos?.firstName || 'NGOUPAYE DJIO'} {patientInfos?.lastName || 'Thierry'}</h1>

                                <p className="text-white font-bold text-xl">
                                    {consultation?.consultationDate ? formatDateOnly(consultation?.consultationDate) : ' Any Date Specified'}
                                </p>
                            </div>
                            <div className="mt-3.5 grid grid-cols-3 gap-4 font-semibold">
                                <div className="flex items-center gap-2 text-white">
                                    <Calendar className="w-6 h-6"/>
                                    <div className="flex">
                                        <span>Born on {patientInfos?.birthDate && formatDateOnly(patientInfos?.birthDate) || 'Not Specified'}</span>
                                        <div className="flex gap-1 mt-0.5 ">
                                            <span className="ml-2 text-white text-sm">({ageValue}</span>
                                            <span className="text-white text-sm">{ageUnit})</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-white">
                                    <MapPin className="w-6 h-6"/>
                                    <span>{patientInfos?.address || 'Not specified'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-white">
                                    <Phone className="w-6 h-6"/>
                                    <span>{patientInfos?.phoneNumber || 'Not Specified'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Go back */}
                <div className="bg-gray-100 shadow-md rounded-lg mb-5 p-4 ">
                    <div className="flex justify-between items-center ">
                        <div className="flex justify-start">
                            <button onClick={() => navigate(-1)}
                                    className="text-secondary text-xl transition-all duration-300 font-bold flex gap-2 items-center">
                                <div
                                    className="w-8 h-8 border-2 rounded-full flex justify-center items-center border-secondary">
                                    <ArrowLeft/>
                                </div>
                                <p className="text-[17px] mt-0.5">Back To Consultation History List</p>
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


                {/* Medical Parameters */}
                <div className="w-full mx-auto">
                    <div className="bg-gray-100 flex flex-col w-full rounded-lg  p-6">
                        <p className="font-bold text-xl ml-5 text-secondary">Patient Medical Parameters</p>
                        <div className="grid grid-cols-4 gap-4 mt-6">
                            {MedicalParametersInfos.map((info, index) => (
                                <MedicalParametersCard
                                    key={index}
                                    icon={info.icon}
                                    label={info.label}
                                    value={info.value}
                                    unit={info.unit}
                                />
                            ))}
                        </div>
                    </div>
                </div>




                {/* Consultation Details */}
                <div className="bg-white rounded-lg shadow-sm p-6">

                    {/*Nurse Notes*/}

                    <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                            <ClipboardList className="h-5 w-5 mr-2 text-blue-500"/>
                            Nurse Notes
                        </h3>
                        <p className="text-gray-700 ml-10">{patientParameters?.nurseNotes || 'Not Specified'}</p>
                    </div>


                    {/* Diagnostic */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                            <Stethoscope className="h-5 w-5 mr-2 text-blue-500"/>
                            Diagnostic
                        </h3>
                        <p className="text-gray-700 ml-10">{patientParameters?.diagnostic || 'Not Specified'}</p>
                    </div>

                    {/*Doctor notes*/}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                            <ClipboardList className="h-5 w-5 mr-2 text-blue-500"/>
                            Doctor Notes
                        </h3>
                        <p className="text-gray-700 ml-10">{patientParameters?.doctorNotes || 'Not Specified'}</p>
                    </div>


                    {/* Prescriptions */}
                    {consultation?.prescriptions && consultation?.prescriptions.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold mb-4 flex items-center">
                                <Pills className="h-5 w-5 mr-2 text-blue-500"/>
                                Prescriptions
                            </h3>
                            <div className="space-y-4">
                                {consultation?.prescriptions.map((prescription, index) => (
                                    <div key={index} className="bg-gray-100 p-4 rounded-lg">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <span className="text-sm text-gray-500">Medication</span>
                                                <p className="font-medium">{prescription?.medication}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-500">Dosage</span>
                                                <p className="font-medium">{prescription?.dosage}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-500">Frequency</span>
                                                <p className="font-medium">{prescription?.frequency}</p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-500">Duration</span>
                                                <p className="font-medium">{prescription?.duration}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Exams */}
                    {consultation?.exams && consultation?.exams.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold mb-4 flex items-center">
                                <FileText className="h-5 w-5 mr-2 text-blue-500"/>
                                Prescribed Exams
                            </h3>
                            <div className="space-y-4">
                                {consultation?.exams.map((exam, index) => (
                                    <div key={index} className="bg-gray-100 p-4 rounded-lg">
                                        <div className="mb-2">
                                            <span className="text-sm text-gray-500">Exams</span>
                                            <p className="font-medium">{exam?.name}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-500">Instructions</span>
                                            <p className="text-gray-700">{exam?.instructions}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Appointment */}
                    {consultation?.appointments && consultation?.appointments.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold mb-4 flex items-center">
                                <Clock className="h-5 w-5 mr-2 text-blue-500"/>
                                 Scheduled Appointments
                            </h3>
                            <div className="space-y-4">
                                {consultation?.appointments.map((appointment, index) => (
                                    <div key={index} className="bg-gray-100 p-4 rounded-lg">
                                        <div className="mb-2">
                                            <span className="text-sm text-gray-500">Date</span>
                                            <p className="font-medium">{appointment?.atDate ? formatDateOnly(appointment?.atDate)  : 'Not Specified'}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-500">Time</span>
                                            <p className="text-gray-700">{appointment?.atDate ? formatDateToTime(appointment?.atDate)  : 'Not Specified'}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-500">Reason</span>
                                            <p className="text-gray-700">{appointment?.reason}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </DoctorDashboard>
    )
}

