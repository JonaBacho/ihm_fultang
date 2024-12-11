import {useLocation, useParams} from "react-router-dom";
import {NurseDashboard} from "../../Components/NurseDashboard.jsx";
import {NurseNavBar} from "../../Components/NurseNavBar.jsx";
import userIcon from "../../assets/userIcon.png";
import PatientInformation from "./PatientInformation.jsx";
import {useEffect, useState} from "react";


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
                       <PatientInformation patient={patient}/>
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
                                            <p className="font-bold text-xl mb-3">Cardiovascular parameters</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <p className="text-md mb-2">Blood Pressure</p>
                                                <div
                                                    className="border-2 border-secondary  rounded-lg  flex justify-center items-center">
                                                    <input
                                                        className=" h-10 border-none focus:outline-none focus:ring-0 rounded-lg w-4/5 ml-3"/>
                                                    <p className="w-1/5 text-end mr-3">mmHg</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-md mb-2">Pulse </p>
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
                                            <p className="font-bold text-xl mb-3">Medical History</p>
                                        </div>
                                        <div className="grid grid-cols-8 gap-2">
                                            <div className="col-span-2">
                                                <p className="text-md mb-2">Chronics Diseases</p>
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
                                                <p className="text-md mb-2">Surgeries </p>
                                                <div
                                                    className="border-2 border-secondary  rounded-lg flex justify-center items-center">
                                                        <textarea
                                                            className="w-full ml-2 border-none focus:outline-none focus:ring-0 rounded-lg"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 mt-3 mb-2">
                                            <div className="col-span-1">
                                                <p className="text-md mb-2">Current Medication</p>
                                                <div
                                                    className="border-2 border-secondary  rounded-lg flex justify-center items-center">
                                                        <textarea
                                                            className="w-full ml-2 border-none focus:outline-none focus:ring-0 rounded-lg"/>
                                                </div>
                                            </div>
                                            <div className="col-span-1">
                                                <p className="text-md mb-2">Family Medical History</p>
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
                                            Prescribe a doctor
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