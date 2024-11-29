import {NurseDashboard} from "../../Components/NurseDashboard.jsx";
import {NurseNavBar} from "../../Components/NurseNavBar.jsx";
import userIcon from "../../assets/userIcon.png"
import {FaArrowLeft, FaArrowRight, FaSearch, FaUserNurse} from "react-icons/fa";
import {HeartCrack} from 'lucide-react';
import {Navigate, useNavigate} from "react-router-dom";
import {useAuthentication} from "../../Utils/Provider.jsx";
import {AccessDenied} from "../../Components/AccessDenied.jsx";




export function Nurse()
{

    const {isAuthenticated, hasRole} = useAuthentication();

    const patients = [
        {
            id: 1,
            name: "NGOUPAYE DJIO",
            lastName: "Thierry",
            gender: "Male",
            birthDate: "Jan. 21, 2000",
            address: "Simbock Yaounde",
            email: "monemail@gmail.com",
            CNI: 100923456,
            createdAt: "10:40 a.m, Fev. 14 2024",
            userContact: 689876756,
            urgenceContact: 678987898,
            state: "critical"
        },
        {
            id: 2,
            name: "NGO BASSOM ",
            lastName: "Anne Rosalie",
            gender: "Female",
            birthDate: "Jan. 21, 2000",
            address: "Odza Yaounde",
            email: "monemail@gmail.com",
            CNI: 100923456,
            createdAt: "10:40 a.m, Fev. 14 2024",
            userContact: 689876756,
            urgenceContact: 678987898,
            state: "critical"
        },
        {
            id: 3,
            name: "KENFACK NOUMEDEM",
            lastName: "Franck",
            gender: "Male",
            birthDate: "Jan. 21, 2000",
            address: "Damas Yaounde",
            email: "monemail@gmail.com",
            CNI: 100923456,
            createdAt: "10:40 a.m, Fev. 14 2024",
            userContact: 689876756,
            urgenceContact: 678987898,
            state: "critical"
        },
        {
            id: 4,
            name: "KOGHENE LADJOU",
            lastName: "Eric",
            gender: "Male",
            birthDate: "Jan. 21, 2000",
            address: "Ngoa-Ekele Yaounde",
            email: "monemail@gmail.com",
            CNI: 100923456,
            createdAt: "10:40 a.m, Fev. 14 2024",
            userContact: 689876756,
            urgenceContact: 678987898,
            state: "critical"
        },
        {
            id: 5,
            name: "BENGONO AMVELA",
            lastName: "Nathan",
            gender: "Male",
            birthDate: "Jan. 21, 2000",
            address: "Obili Yaounde",
            email: "monemail@gmail.com",
            CNI: 100923456,
            createdAt: "10:40 a.m, Fev. 14 2024",
            userContact: 689876756,
            urgenceContact: 678987898,
            state: "critical"
        },
    ];

    const navigate = useNavigate();

    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }

    if (!hasRole('Nurse')) {
        return <AccessDenied Role={"Nurse"}/>;
    }

    return (
        <>
            <NurseDashboard>
                <NurseNavBar>
                    <div className="flex flex-col">
                        <div
                            className="ml-5 mr-5 h-[150px] bg-gradient-to-t from-primary-start to-primary-end flex rounded-lg justify-between">
                            <div className="flex gap-4">

                                <div className="mt-5 mb-5 ml-5 w-28 h-28 border-4 border-white rounded-full">
                                    <img src={userIcon} alt="user icon" className="h-[105px] w-[105px] mb-2"/>
                                </div>

                                <div className="flex flex-col">
                                    <p className="text-white text-4xl font-bold mt-6">Welcome Back!</p>
                                    <p className="text-2xl mt-2 text-white"> Username</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-white mt-28 text-xl font-bold mr-4">12:30:25 AM</p>
                            </div>
                        </div>


                        <div className="flex justify-between mt-3">
                            <div className="flex flex-col ml-5">
                                <p className="font-bold text-2xl">Reception</p>
                                <p>List of patients</p>
                            </div>
                            <div className="flex mr-5">
                                <div className="flex w-[300px] h-10 border-2 border-secondary rounded-lg">
                                    <FaSearch className="text-xl text-secondary m-2"/>
                                    <input
                                        type="text"
                                        className="border-none focus:outline-none focus:ring-0"
                                    />
                                </div>
                                <button className="ml-2 w-20 h-10 text-white bg-secondary rounded-lg">
                                    Search
                                </button>
                            </div>
                        </div>

                        <div className="ml-5 mr-5 mt-2 border-2 h-[620px] rounded-lg shadow-lg  p-2">
                            <table className="w-full border-separate border-spacing-y-2">
                                <thead>
                                <tr>
                                    <th className="text-center p-3 text-xl font-bold border-r-2 border-gray-200">No</th>
                                    <th className="text-center p-3 text-xl font-bold border-r-2 border-gray-200">First
                                        Name
                                    </th>
                                    <th className="text-center p-3 text-xl font-bold border-r-2 border-gray-200 ">Last
                                        Name
                                    </th>
                                    <th className="text-center p-3 text-xl font-bold border-r-2 border-gray-200 ">Gender</th>
                                    <th className="text-center p-3 text-xl font-bold border-r-2 border-gray-200 ">State</th>
                                    <th className="text-center p-3 text-xl font-bold ">Operations</th>
                                </tr>
                                </thead>
                                <tbody>
                                {patients.map((patient, index) => (
                                    <tr key={index} className="bg-gray-100">
                                        <td className="p-4 text-md text-blue-900 rounded-l-lg text-center">{index + 1}</td>
                                        <td className="p-4 text-md text-blue-900  text-center">{patient.name}</td>
                                        <td className="p-4 text-md text-center ">{patient.lastName}</td>
                                        <td className="p-4 text-md text-center ">{patient.gender}</td>
                                        <td className="p-4 items-center ">
                                            <div
                                                className="w-20 h-10 rounded-full border-2 border-red-500 flex justify-center items-center">
                                                <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                                                <p className="text-red-500">{patient.state}</p>

                                            </div>
                                        </td>
                                        <td className="p-4 flex justify-center rounded-r-lg gap-4">
                                            <button
                                                className="flex items-center px-2 py-2 bg-indigo-900 text-white text-md rounded-md hover:bg-indigo-800 transition-colors duration-200"
                                                onClick={() => {
                                                    navigate(`/nurse/patients/patientDetails/${patient.id}`, {state: {patient}})
                                                }}>
                                                <HeartCrack className="h-6 w-6 mr-2"/>
                                                Take parameters
                                            </button>

                                            <button
                                                className="flex items-center px-2 py-2 bg-indigo-900 text-white text-md rounded-md hover:bg-indigo-800 transition-colors duration-200"
                                                onClick={() => {
                                                    navigate(`/nurse/patients/consultationHistory/${patient.id}`, {state: {patient}})
                                                }}>
                                                <FaUserNurse className="h-6 w-6 mr-2"/>
                                                View Consultation history
                                            </button>

                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-center items-center mt-4 mb-4">
                            <div className="flex gap-4">
                                <button
                                    className="w-14 h-14 border-2 rounded-lg shadow-xl flex justify-center items-center mt-2">
                                    <FaArrowLeft
                                        className="text-xl text-secondary hover:text-2xl duration-300 transition-all"/>
                                </button>

                                <p className="text-secondary text-2xl font-bold mt-4">1/200</p>

                                <button
                                    className="w-14 h-14 border-2 rounded-lg shadow-xl flex justify-center items-center mt-2">
                                    <FaArrowRight
                                        className="text-xl text-secondary hover:text-2xl duration-300 transition-all"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </NurseNavBar>
            </NurseDashboard>
        </>
    )
}