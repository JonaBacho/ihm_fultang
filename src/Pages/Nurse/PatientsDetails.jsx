import {useLocation, useParams} from "react-router-dom";
import {NurseNavBar} from "./NurseNavBar.jsx";
import PatientInformationBoard from "./PatientInformationBoard.jsx";
import {nurseNavLink} from "./nurseNavLink.js";
import {DashBoard} from "../../GlobalComponents/DashBoard.jsx";
import {useEffect, useState} from "react";
import {useAuthentication} from "../../Utils/Provider.jsx";
import axiosInstance from "../../Utils/axiosInstance.js";
import {SuccessModal} from "../Modals/SuccessModal.jsx";
import {ErrorModal} from "../Modals/ErrorModal.jsx";
import Wait from "../Modals/wait.jsx";


export function PatientsDetails()
{
    //const {id} = useParams();
    const { state } = useLocation();
    const patient = state?.patient;
    const {userData} = useAuthentication();
    const [canPrescribeDoctor, setCanPrescribeDoctor] = useState(false);
    const [canOpenSuccessModal, setCanOpenSuccessModal] = useState(false);
    const [canOpenErrorModal, setCanOpenErrorModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsloading] = useState(false);
    const [idCurrentMedicalFolderPage, setIdCurrentMedicalFolderPage] = useState(false);
    const [patientIMC, setPatientIMC] = useState(0.00);
    const [patientParametersList, setPatientParametersList] = useState(
        {
            height: "",
            weight: "",
            bloodPressure: "",
            heartRate: "",
            temperature: "",
            chronicalDiseases: "",
            allergies: "",
            currentMedication: "",
            surgeries: "",
            familyMedicalHistory: "",
            idMedicalStaff: userData.id,
        }
    );


    function handleChange(e) {
        const { name, value } = e.target;
        setPatientParametersList(prevData => ({
            ...prevData,
            [name]: value
        }));
    }




    useEffect(() => {
        if(patientParametersList.weight && patientParametersList.height)
        {
            setPatientIMC(patientParametersList.weight / (patientParametersList.height * patientParametersList.height));
        }
    }, [patientParametersList.height, patientParametersList.weight]);




    async function handleSubmit(e) {
        e.preventDefault();
        setIsloading(true);
        try
        {
            const response = await axiosInstance.post(`/medical-folder/${patient?.idMedicalFolder}/new-params/`, patientParametersList);
            setIsloading(false);
            if (response.status === 201)
            {
                setCanPrescribeDoctor(true);
                setIdCurrentMedicalFolderPage(response.data.idMedicalFolderPage);
                setSuccessMessage(`${patient.firstName + patient.lastName}'s Medical parameters added successfully !`);
                setErrorMessage("");
                setCanOpenErrorModal(false);
                setCanOpenSuccessModal(true);
            }
        }
        catch (error)
        {
            setIsloading(false);
            setSuccessMessage("");
            setErrorMessage(`Something went wrong when saving the patient ${patient.firstName} parameters. Please try again later !`);
            setCanOpenSuccessModal(false);
            setCanOpenErrorModal(true);
            console.log(error);
        }
    }



    return (
        <>
            <DashBoard requiredRole={"Nurse"} linkList={nurseNavLink}>
                <NurseNavBar>
                    <div className="flex mt-6">
                        <PatientInformationBoard patient={patient}/>
                        {/*Patient's medical Parameters*/}
                        <div className="flex-1 ml-4 mr-5 flex flex-col">
                            <div
                                className="h-[140px]  bg-gradient-to-r from-primary-start to-primary-end rounded-lg flex justify-center items-center">
                                <p className="text-4xl text-white font-bold">{"Patient's medical parameters"}</p>
                            </div>

                            <form className="mt-6 mb-5" onSubmit={handleSubmit}>
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
                                                        type = "number"
                                                        name = "weight"
                                                        value = {patientParametersList.weight}
                                                        max="200"
                                                        min="2.00"
                                                        required
                                                        onChange={(e)=>{handleChange(e)}}
                                                        className=" h-10  border-none outline:none ring-0 focus:outline-none focus:ring-0  rounded-lg w-4/5 ml-3"/>
                                                    <p className="w-1/5  text-end mr-3">Kg</p>
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-md  mb-2">Height</p>
                                                <div
                                                    className="border-2 border-secondary rounded-lg  flex justify-center items-center">
                                                    <input
                                                        type = "number"
                                                        name = "height"
                                                        max="2.30"
                                                        min="0.30"
                                                        value = {patientParametersList.height}
                                                        required
                                                        onChange={(e)=>{handleChange(e)}}
                                                        className="h-10 border-none focus:outline-none focus:ring-0 rounded-lg w-4/5 ml-3"/>
                                                    <p className="w-1/5  text-end mr-3">m</p>
                                                </div>
                                            </div>

                                            <div>
                                                <p className="text-md  mb-2">IMC</p>
                                                <div
                                                    className="border-2 border-secondary rounded-lg flex justify-center items-center">
                                                    <input
                                                        name="IMC"
                                                        value={patientIMC.toFixed(2)}
                                                        readOnly
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
                                                        type = "number"
                                                        name = "temperature"
                                                        required
                                                        min={"36"}
                                                        max={"41"}
                                                        value = {patientParametersList.temperature}
                                                        onChange={(e)=>{handleChange(e)}}
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
                                                        type = "number"
                                                        name = "bloodPressure"
                                                        required
                                                        value = {patientParametersList.bloodPressure}
                                                        onChange={(e)=>{handleChange(e)}}
                                                        className=" h-10 border-none focus:outline-none focus:ring-0 rounded-lg w-4/5 ml-3"/>
                                                    <p className="w-1/5 text-end mr-3">mmHg</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-md mb-2">heart rate </p>
                                                <div
                                                    className="border-2 border-secondary rounded-lg  flex justify-center items-center">
                                                    <input
                                                        type = "number"
                                                        name = "heartRate"
                                                        value = {patientParametersList.heartRate}
                                                        onChange={(e)=>{handleChange(e)}}
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
                                                            name = "chronicalDiseases"
                                                            value = {patientParametersList.chronicalDiseases}
                                                            onChange={(e)=>{handleChange(e)}}
                                                            className="w-full ml-2 border-none focus:outline-none focus:ring-0 rounded-lg"/>
                                                </div>
                                            </div>
                                            <div className="col-span-3">
                                                <p className="text-md mb-2">Allergies </p>
                                                <div
                                                    className="border-2 border-secondary  rounded-lg flex justify-center items-center">
                                                        <textarea
                                                            name = "allergies"
                                                            value = {patientParametersList.allergies}
                                                            onChange={(e)=>{handleChange(e)}}
                                                            className="w-full ml-2 border-none focus:outline-none focus:ring-0 rounded-lg"/>
                                                </div>
                                            </div>

                                            <div className="col-span-3">
                                                <p className="text-md mb-2">Surgeries </p>
                                                <div
                                                    className="border-2 border-secondary  rounded-lg flex justify-center items-center">
                                                        <textarea
                                                            name = "surgeries"
                                                            value = {patientParametersList.surgeries}
                                                            onChange={(e)=>{handleChange(e)}}
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
                                                            name = "currentMedication"
                                                            value = {patientParametersList.currentMedication}
                                                            onChange={(e)=>{handleChange(e)}}
                                                            className="w-full ml-2 border-none focus:outline-none focus:ring-0 rounded-lg"/>
                                                </div>
                                            </div>
                                            <div className="col-span-1">
                                                <p className="text-md mb-2">Family Medical History</p>
                                                <div
                                                    className="border-2 border-secondary  rounded-lg flex justify-center items-center">
                                                        <textarea
                                                            name = "familyMedicalHistory"
                                                            value = {patientParametersList.familyMedicalHistory}
                                                            onChange={(e)=>{handleChange(e)}}
                                                            className="w-full ml-2 border-none focus:outline-none focus:ring-0 rounded-lg"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-5">
                                        <button
                                            type="submit"
                                            className="bg-gradient-to-r from-primary-start to-primary-end w-full h-14 rounded-lg text-white text-xl font-bold hover:opacity-75 hover:text-xl transition-all duration-300">
                                            Save Parameters
                                        </button>

                                        <button
                                            type = "button"
                                            onClick={()=>{alert("prescrire")}}
                                            className="bg-gradient-to-r from-primary-start to-primary-end w-full h-14 rounded-lg text-white  text-xl font-bold disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                                            disabled={!canPrescribeDoctor}
                                        >
                                            Prescribe a doctor
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </NurseNavBar>
                <SuccessModal isOpen={canOpenSuccessModal} canOpenSuccessModal={()=>{setCanOpenSuccessModal(false)}} message={successMessage}/>
                <ErrorModal isOpen={canOpenErrorModal} onCloseErrorModal={()=>{setCanOpenErrorModal(false)}} message={errorMessage}/>
                {isLoading && <Wait/>}
            </DashBoard>
        </>
    );
}