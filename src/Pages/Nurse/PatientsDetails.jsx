import {useLocation, useParams} from "react-router-dom";
import {NurseDashboard} from "../../Components/NurseDashboard.jsx";
import {NurseNavBar} from "../../Components/NurseNavBar.jsx";
import userIcon from "../../assets/userIcon.png";


export function PatientsDetails()
{
    const {id} = useParams();
    const { state } = useLocation();
    const patient = state?.patient;



    return (
        <>
            <NurseDashboard>
                <NurseNavBar>
                    <div className="flex mt-6">
                        <div className="w-2/6 flex flex-col ml-5 border-2 shadow-xl mb-5 rounded-lg">
                            <div className="w-full flex justify-center items-center flex-col mb-10">
                                <div className="mt-5 mb-5 ml-5 w-36 h-36 border-4 border-gray-300 rounded-full">
                                    <img src={userIcon} alt="user icon" className="h-[136px] w-[136px] mb-2"/>
                                </div>
                                <p className="font-bold text-3xl mt-2 mb-1">{patient.name}</p>
                                <p className="font-bold text-3xl mt-1 mb-4">{patient.lastName}</p>
                            </div>

                            <div className="flex border-t-2 border-t-gray-200 p-6 mr-2 ml-2">
                                <p className="mr-10 w-1/4">Gender</p>
                                <p className="w-3/4 text-center">{patient?.gender}</p>
                            </div>

                            <div className="flex border-t-2 border-t-gray-200   p-6 ml-2 mr-2">
                                <p className="mr-10 w-1/4">CNI</p>
                                <p className="w-3/4 text-center">{patient.CNI}</p>
                            </div>

                            <div className="flex border-t-2 border-t-gray-200   p-6 ml-2 mr-2">
                                <p className="mr-10 w-1/4">Address</p>
                                <p className="w-3/4 text-center">{patient?.address}</p>
                            </div>
                            <div className="flex border-t-2 border-t-gray-200   p-6 ml-2 mr-2">
                                <p className="mr-10 w-1/4">Email</p>
                                <p className="w-3/4 text-center">{patient?.email}</p>
                            </div>

                            <div className="flex border-t-2 border-t-gray-200   p-6 ml-2 mr-2">
                                <p className="mr-10 w-1/4">BirthDate</p>
                                <p className="w-3/4 text-center">{patient?.birthDate}</p>
                            </div>

                            <div className="flex border-t-2 border-t-gray-200   p-6 ml-2 mr-2">
                                <p className="mr-10 w-1/4">Contact</p>
                                <p className="w-3/4 text-center">{patient?.userContact}</p>
                            </div>

                            <div className="flex border-t-2 border-t-gray-200   p-6 ml-2 mr-2">
                                <p className="mr-10 w-1/4">Contact d'urgence</p>
                                <p className="w-3/4 text-center">{patient?.urgenceContact}</p>
                            </div>

                            <div
                                className="flex border-t-2 border-t-gray-200 border-b-2 border-b-gray-200 p-6 ml-2 mr-2">
                                <p className="mr-10 w-1/4">Added At</p>
                                <p className="w-3/4 text-center">{patient.createdAt}</p>
                            </div>
                        </div>


                        {/*Patient's medical Parameters*/}
                        <div className="flex-1 ml-4 mr-5 flex flex-col">
                            <div
                                className="h-[140px]  bg-gradient-to-r from-primary-start to-primary-end rounded-lg flex justify-center items-center">
                                <p className="text-4xl text-white font-bold">Patient's medical parameters</p>
                            </div>

                            <form className="mt-6 mb-5">
                                <div className="flex flex-col space-y-7">
                                    {/*Biometric parameters*/}
                                    <div>
                                        <div className="border-b-2 border-b-gray-400 m-3">
                                            <p className="font-bold text-xl mb-3">Biometric parameters</p>

                                        </div>
                                        <div className="grid grid-cols-3 gap-5">
                                            <div>
                                                <p className="text-md  mb-2">Weight</p>
                                                <div
                                                    className="border-2 border-secondary rounded-lg  flex justify-center items-center">
                                                    <input
                                                        className=" h-10  border-none outline:none ring-0 focus:outline-none focus:ring-0  rounded-lg w-4/5 ml-3"/>
                                                    <p className="w-1/5  text-end mr-3">Kg</p>
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-md  mb-2">Height</p>
                                                <div
                                                    className="border-2 border-secondary rounded-lg  flex justify-center items-center">
                                                    <input
                                                        className="h-10 border-none focus:outline-none focus:ring-0 rounded-lg w-4/5 ml-3"/>
                                                    <p className="w-1/5  text-end mr-3">m</p>
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-md  mb-2">IMC</p>
                                                <div
                                                    className="border-2 border-secondary rounded-lg flex justify-center items-center">
                                                    <input
                                                        className="h-10 border-none focus:outline-none focus:ring-0  rounded-lg w-4/5 ml-3"/>
                                                    <p className="w-1/5  text-end mr-3">kg/m²</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 mt-3">
                                            <div className="col-span-2">
                                                <p className="text-md mb-2">Temperature</p>
                                                <div
                                                    className="border-2 border-secondary  rounded-lg  flex justify-center items-center">
                                                    <input
                                                        className=" h-10 border-none focus:outline-none focus:ring-0 rounded-lg w-4/5 ml-3"/>
                                                    <p className="w-1/5  text-end mr-3">°C</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/*Parametres cardiovasculaires*/}
                                    <div>
                                        <div className="border-b-2 border-b-gray-400 m-3">
                                            <p className="font-bold text-xl mb-3">Parametres cardiovasculaire</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <p className="text-md mb-2">Tension arterielle</p>
                                                <div
                                                    className="border-2 border-secondary  rounded-lg  flex justify-center items-center">
                                                    <input
                                                        className=" h-10 border-none focus:outline-none focus:ring-0 rounded-lg w-4/5 ml-3"/>
                                                    <p className="w-1/5 text-end mr-3">mmHg</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-md mb-2">Frequence cardique </p>
                                                <div
                                                    className="border-2 border-secondary rounded-lg  flex justify-center items-center">
                                                    <input
                                                        className=" h-10 border-none focus:outline-none focus:ring-0 rounded-lg w-4/5 ml-3"/>
                                                    <p className="w-1/5 text-end mr-3">bpm</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    {/*Antecedents medicaux*/}
                                    <div>
                                        <div className="border-b-2 border-b-gray-400 m-3">
                                            <p className="font-bold text-xl mb-3">Antecedants medicaux</p>
                                        </div>
                                        <div className="grid grid-cols-8 gap-2">
                                            <div className="col-span-2">
                                                <p className="text-md mb-2">Maladies chroniques</p>
                                                <div
                                                    className="border-2 border-secondary  rounded-lg flex justify-center items-center">
                                                        <textarea
                                                            className="w-full ml-2 border-none focus:outline-none focus:ring-0 rounded-lg"/>
                                                </div>
                                            </div>
                                            <div className="col-span-3">
                                                <p className="text-md mb-2">Allergies </p>
                                                <div
                                                    className="border-2 border-secondary  rounded-lg flex justify-center items-center">
                                                        <textarea
                                                            className="w-full ml-2 border-none focus:outline-none focus:ring-0 rounded-lg"/>
                                                </div>
                                            </div>

                                            <div className="col-span-3">
                                                <p className="text-md mb-2">Chirurgies </p>
                                                <div
                                                    className="border-2 border-secondary  rounded-lg flex justify-center items-center">
                                                        <textarea
                                                            className="w-full ml-2 border-none focus:outline-none focus:ring-0 rounded-lg"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 mt-3 mb-2">
                                            <div className="col-span-1">
                                                <p className="text-md mb-2">Medicaments actuels</p>
                                                <div
                                                    className="border-2 border-secondary  rounded-lg flex justify-center items-center">
                                                        <textarea
                                                            className="w-full ml-2 border-none focus:outline-none focus:ring-0 rounded-lg"/>
                                                </div>
                                            </div>
                                            <div className="col-span-1">
                                                <p className="text-md mb-2">Antecedants familiaux</p>
                                                <div
                                                    className="border-2 border-secondary  rounded-lg flex justify-center items-center">
                                                        <textarea
                                                            className="w-full ml-2 border-none focus:outline-none focus:ring-0 rounded-lg"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-5">
                                        <button
                                            className="bg-gradient-to-r from-primary-start to-primary-end w-full h-14 rounded-lg text-white text-xl font-bold hover:opacity-75 hover:text-xl transition-all duration-300">
                                            Save Parameters
                                        </button>

                                        <button
                                            className="bg-gradient-to-r from-primary-start to-primary-end w-full h-14 rounded-lg text-white  text-xl font-bold disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                                            disabled
                                        >
                                            Prescire un medecin
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </NurseNavBar>
            </NurseDashboard>
        </>
    )
}