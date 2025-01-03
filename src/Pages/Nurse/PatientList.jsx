import {FaChevronDown, FaChevronUp, FaUserNurse} from "react-icons/fa";
import {HeartCrack} from "lucide-react";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import {useState} from "react";



export function PatientList ({patients}){

    PatientList.propTypes = {
        patients: PropTypes.array.isRequired
    }

    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState({});


    return (
        <table className="w-full border-separate border-spacing-y-2">
            <thead>
            <tr>
                <th className="text-center p-4 text-xl font-bold border-r-2 border-gray-200">No</th>
                <th className="text-center p-4 text-xl font-bold border-r-2 border-gray-200">Firstname
                </th>
                <th className="text-center p-4 text-xl font-bold border-r-2 border-gray-200 ">Lastname
                </th>
                <th className="text-center p-4 text-xl font-bold border-r-2 border-gray-200 ">Gender</th>
                 <th className="text-center p-4 text-xl font-bold border-r-2 border-gray-200 ">Birth Date</th>
                <th className="text-center p-4 text-xl font-bold  flex-col">
                    <p>Operations</p>
                </th>
            </tr>
            </thead>
            <tbody>
            {patients.map((patient, index) => (
                <tr key={patient.id || index} className="bg-gray-100">
                    <td className="p-4 text-md text-blue-900 rounded-l-lg text-center">{index + 1}</td>
                    <td className="p-4 text-md text-blue-900 text-center">{patient.firstName}</td>
                    <td className="p-4 text-md text-center">{patient.lastName}</td>
                    <td className="p-4 text-md text-center">{patient.gender}</td>
                    <td className="p-4 text-md text-center">{patient.birthDate}</td>
                    <td className="p-4 relative rounded-r-lg">
                        <div className="relative w-full">
                            <div
                                className="flex justify-center items-center cursor-pointer"
                                onClick={() => setIsMenuOpen(prevState => ({
                                    [patient.id]: !prevState[patient.id]
                                }))}
                            >
                                <div className="px-5 py-2 bg-secondary text-white flex rounded-xl">
                                    <p className="mr-3">Open</p>
                                    {isMenuOpen[patient.id] ? <FaChevronUp className="mt-1"/> :
                                        <FaChevronDown className="mt-1"/>}

                                </div>
                            </div>
                            {isMenuOpen[patient.id] && (
                                <div
                                    className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-md border border-gray-200 z-50">
                                    <button
                                        type="button"
                                        className="w-full flex items-center px-4 py-2 text-left hover:bg-gray-100 transition-colors duration-200"
                                        onClick={() => {
                                            navigate(`/nurse/patients/patientDetails/${patient.id}`, {state: {patient}});
                                            setIsMenuOpen(prevState => ({
                                                ...prevState,
                                                [patient.id]: false
                                            }));
                                        }}
                                    >
                                        <HeartCrack className="h-6 w-6 mr-2"/>
                                        Take parameters
                                    </button>
                                    <button
                                        type="button"
                                        className="w-full flex items-center px-4 py-2 text-left hover:bg-gray-100 transition-colors duration-200"
                                        onClick={() => {
                                            navigate(`/nurse/patients/consultationHistory/${patient.id}`, {state: {patient}});
                                            setIsMenuOpen(prevState => ({
                                                ...prevState,
                                                [patient.id]: false
                                            }));
                                        }}
                                    >
                                        <FaUserNurse className="h-6 w-6 mr-2"/>
                                        View Consultation history
                                    </button>
                                </div>
                            )}
                        </div>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>

    )
}