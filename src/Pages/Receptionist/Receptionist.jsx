import {ReceptionistNavBar} from "./ReceptionistNavBar.jsx";
import {FaArrowLeft, FaArrowRight, FaEdit, FaEye, FaSearch, FaTrash,} from "react-icons/fa";
import {Tooltip} from "antd";
import {DashBoard} from "../../GlobalComponents/DashBoard.jsx";
import {receptionistNavLink} from "./receptionistNavLink.js";
import {useEffect, useState} from "react";
import {AddNewPatientModal} from "./addNewPatientModal.jsx";
import {SuccessModal} from "../Modals/SuccessModal.jsx";
import Wait from "../Modals/wait.jsx";
import {ErrorModal} from "../Modals/ErrorModal.jsx";
import {ViewPatientDetailsModal} from "./ViewPatientDetailsModal.jsx";
import {EditPatientInfosModal} from "./EditPatientInfosModal.jsx";
import axiosInstance from "../../Utils/axiosInstance.js";
import {useAuthentication} from "../../Utils/Provider.jsx";


export function Receptionist()
{


    const [canOpenAddNewPatientModal, setCanOpenAddNewPatientModal] = useState(false);
    const [canOpenSuccessModal, setCanOPenSuccessModal] = useState(false);
    const [canOpenErrorMessageModal, setCanOpenErrorMessageModal] = useState(false);
    const [canOpenViewPatientDetailModal, setCanOpenViewPatientDetailModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPatientDetails, setSelectedPatientDetails] = useState({});
    const [canOpenEditPatientDetailModal, setCanOpenEditPatientDetailModal] = useState(false);
    const [patients, setPatients] = useState([]);
    const [numberOfPatients, setNumberOfPatients] = useState(0);
    const [nexUrlForRenderPatientList, setNexUrlForRenderPatientList] = useState("");
    const [previousUrlForRenderPatientList, setPreviousUrlForRenderPatientList] = useState("");
    const [actualPageNumber, setActualPageNumber] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);




    const {isAuthenticated} = useAuthentication();





    function updateActualPageNumber(action) {
        if (action === "next")
        {
            if(actualPageNumber < numberOfPages)
            {
                setActualPageNumber(actualPageNumber + 1);
            }
        }
        else
        {
            if(actualPageNumber > 1)
            {
                setActualPageNumber(actualPageNumber - 1);
            }
        }
    }




    useEffect(() => {
        async function fetchPatients () {
            if (isAuthenticated)
            {
                try
                {
                    const response = await axiosInstance.get("/patient/");
                    if (response.status === 200)
                    {
                        console.log(response)
                        setPatients(response.data.results);
                        setNexUrlForRenderPatientList(response.data.next);
                        setPreviousUrlForRenderPatientList(response.data.previous);
                        setActualPageNumber(response.data.current_page);
                        setNumberOfPages(response.data.total_pages);
                    }
                }
                catch (error)
                {
                    console.log(error);
                }
            }
        }
        fetchPatients();
    }, [isAuthenticated]);





    async function fetchNextOrPreviousPatientList (url) {
        if(url)
        {
            try {
                const response = await axiosInstance.get(url);
                if (response.status === 200)
                {
                    //console.log(response)
                    setPatients(response.data.results);
                    setNexUrlForRenderPatientList(response.data.next);
                    setPreviousUrlForRenderPatientList(response.data.previous);
                    setActualPageNumber(response.data.current_page);
                    setNumberOfPages(response.data.total_pages);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }






    return (
        <DashBoard linkList={receptionistNavLink} requiredRole={"Receptionist"}>
            <ReceptionistNavBar/>
            <div className="mt-5 flex flex-col relative">

                {/*Header content with search bar*/}
                <div className="flex justify-between mb-5">
                    <p className="font-bold text-xl mt-2 ml-5"> List Of Patient </p>
                    <div className="flex mr-5">
                        <div className="flex w-[300px] h-10 border-2 border-secondary rounded-lg">
                            <FaSearch className="text-xl text-secondary m-2"/>
                            <input
                                type="text"
                                placeholder={"search for a specific patient"}
                                className="border-none focus:outline-none focus:ring-0"
                            />
                        </div>
                        <button className="ml-2 w-20 h-10 text-white bg-secondary rounded-lg">
                            Search
                        </button>
                    </div>
                </div>

                {/*List of registered patients*/}

                <div className="ml-5 mr-5 ">
                    <table className="w-full border-separate border-spacing-y-2">
                        <thead>
                        <tr className="">
                            <th className="text-center text-white p-4 text-xl font-bold bg-primary-end  border-gray-200 rounded-l-2xl ">No</th>
                            <th className="text-center text-white p-4 text-xl font-bold bg-primary-end  border-gray-200">First Name</th>
                            <th className="text-center text-white p-4 text-xl font-bold bg-primary-end  border-gray-200 ">Last Name
                            </th>
                            <th className="text-center text-white p-4 text-xl font-bold bg-primary-end  border-gray-200 ">Gender</th>
                            <th className="text-center text-white p-4 text-xl font-bold bg-primary-end  border-gray-200 ">Address</th>
                            <th className="text-center text-white p-4 text-xl font-bold bg-primary-end  flex-col rounded-r-2xl">
                                <p>Operations</p>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {patients.map((patient, index) => (
                            <tr key={patient.id || index} className="">
                                <td className="p-4 text-md text-blue-900 rounded-l-lg bg-gray-100 text-center">{index + 1}</td>
                                <td className="p-4 text-md text-center bg-gray-100 font-bold">{patient.firstName}</td>
                                <td className="p-4 text-md text-center bg-gray-100">{patient.lastName}</td>
                                <td className="p-4 text-md text-center bg-gray-100">{patient.gender}</td>
                                <td className="p-4 text-center text-md bg-gray-100 ">{patient.address}</td>
                                <td className="p-4 relative bg-gray-100 rounded-r-lg">
                                    <div className="w-full items-center justify-center flex gap-6">
                                        <Tooltip placement={"left"} title={"view details"}>
                                            <button
                                                onClick={()=>{setSelectedPatientDetails(patient),setCanOpenViewPatientDetailModal(true)}}
                                                className="flex items-center justify-center w-9 h-9 text-primary-end text-xl hover:bg-gray-300 hover:rounded-full transition-all duration-300">
                                                <FaEye/>
                                            </button>
                                        </Tooltip>
                                        <Tooltip placement={"right"} title={"Edit"}>
                                            <button
                                                onClick={()=>{setSelectedPatientDetails(patient),setCanOpenEditPatientDetailModal(true)}}
                                                className="flex items-center justify-center w-9 h-9 text-green-500 text-xl hover:bg-gray-300 hover:rounded-full transition-all duration-300">
                                                <FaEdit/>
                                            </button>
                                        </Tooltip>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>


                    {/*Pagination content */}
                    <div className="fixed w-full justify-center -right-16 bottom-0 flex mt-6 mb-4">
                        <div className="flex gap-4">
                            <Tooltip placement={"left"} title={"previous slide"}>
                                <button
                                    onClick={async ()=> {await fetchNextOrPreviousPatientList(previousUrlForRenderPatientList), updateActualPageNumber("prev")}}
                                    className="w-14 h-14 border-2 rounded-lg hover:bg-secondary text-xl  text-secondary hover:text-2xl duration-300 transition-all  hover:text-white shadow-xl flex justify-center items-center mt-2">
                                    <FaArrowLeft/>
                                </button>
                            </Tooltip>
                            <p className="text-secondary text-2xl font-bold mt-4">{actualPageNumber}/{numberOfPages}</p>
                            <Tooltip placement={"right"} title={"next slide"}>
                                <button
                                    onClick={async ()=> {await fetchNextOrPreviousPatientList(nexUrlForRenderPatientList), updateActualPageNumber("next")}}
                                    className="w-14 h-14 border-2 rounded-lg hover:bg-secondary text-xl  text-secondary hover:text-2xl duration-300 transition-all  hover:text-white shadow-xl flex justify-center items-center mt-2">
                                    <FaArrowRight/>
                                </button>
                            </Tooltip>
                        </div>
                    </div>


                    {/* Add new patient button & modal */}
                    <Tooltip placement={"top"} title={"Add new patient"}>
                        <button
                            onClick={()=>setCanOpenAddNewPatientModal(true)}
                            className="fixed bottom-5 right-16 rounded-full w-14 h-14 bg-gradient-to-r text-4xl font-bold text-white from-primary-start to-primary-end hover:text-5xl transition-all duration-300">
                            +
                        </button>
                    </Tooltip>


                    {/* Modals content */}
                    <AddNewPatientModal isOpen={canOpenAddNewPatientModal} onClose={()=>{setCanOpenAddNewPatientModal(false)}} setCanOpenSuccessModal={setCanOPenSuccessModal} setSuccessMessage={setSuccessMessage} setIsLoading={setIsLoading}/>
                    <EditPatientInfosModal isOpen={canOpenEditPatientDetailModal} onClose={()=>{setCanOpenEditPatientDetailModal(false)}} setCanOpenSuccessModal={setCanOPenSuccessModal} setSuccessMessage={setSuccessMessage} setIsLoading={setIsLoading} patientData={selectedPatientDetails}/>
                    <SuccessModal isOpen={canOpenSuccessModal} message={successMessage} canOpenSuccessModal={setCanOPenSuccessModal}/>
                    <ErrorModal isOpen={canOpenErrorMessageModal} onCloseErrorModal={()=>{setCanOpenErrorMessageModal(false)}} message={errorMessage}/>
                    <ViewPatientDetailsModal isOpen={canOpenViewPatientDetailModal} patient={selectedPatientDetails} onClose={()=>{setCanOpenViewPatientDetailModal(false)}}/>
                    {isLoading && <Wait/>}
                    {/*<ConfirmationModal isOpen={canOpenConfirmActionModal} onClose={() => setCanOpenConfirmActionModal(false)} onConfirm={async () => await deletePatient(patientToDelete.id)} title={"Delete Patient"} message={`Are you sure you want to delete the patient ${patientToDelete.firstName + " " + patientToDelete.lastName} ?`}/>*/}
                </div>
            </div>
        </DashBoard>
    )
}