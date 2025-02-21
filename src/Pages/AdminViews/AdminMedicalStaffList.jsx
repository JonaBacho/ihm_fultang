import {FaArrowLeft, FaArrowRight, FaEdit, FaEye, FaPlus, FaSearch, FaTrash,} from "react-icons/fa";
import {Tooltip} from "antd";
import {useEffect, useState} from "react";
import {SuccessModal} from "../Modals/SuccessModal.jsx";
import Wait from "../Modals/wait.jsx";
import {ErrorModal} from "../Modals/ErrorModal.jsx";
import axiosInstance from "../../Utils/axiosInstance.js";
import {CustomDashboard} from "../../GlobalComponents/CustomDashboard.jsx";
import {AdminNavBar} from "./AdminNavBar.jsx";
import {adminNavLink} from "./adminNavLink.js";
import {ConfirmationModal} from "../Modals/ConfirmAction.Modal.jsx";
import {AppRoutesPaths as appRouterPaths} from "../../Router/appRouterPaths.js";
import {useNavigate} from "react-router-dom";
import {ViewMedicalStaffDetailsModal} from "./ViewMedicalStaffDetailsModal.jsx";
import {EditMedicalStaffInfosModal} from "./EditMedicalStaffInfosModal.jsx";
import Loader from "../../GlobalComponents/Loader.jsx";
import ServerErrorPage from "../../GlobalComponents/ServerError.jsx";


export function AdminMedicalStaffList()
{

    const [waitFetchingData, setWaitFetchingData] = useState(false);
    const [errorStatus, setErrorStatus] = useState(null);
    const [serverErrorMessage, setServerErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedMedicalStaffDetails, setSelectedMedicalStaffDetails] = useState({});
    const [canOpenSuccessModal, setCanOPenSuccessModal] = useState(false);
    const [canOpenErrorMessageModal, setCanOpenErrorMessageModal] = useState(false);
    const [canOpenViewMedicalStaffDetailModal, setCanOpenViewMedicalStaffDetailModal] = useState(false);
    const [canOpenConfirmActionModal, setCanOpenConfirmActionModal] = useState(false);
    const [medicalStaffToDelete, setMedicalStaffToDelete] = useState({});
    const [canOpenEditMedicalStaffDetailModal, setCanOpenEditMedicalStaffDetailModal] = useState(false);
    const [medicalStaffList, setMedicalStaffList] = useState([]);
    const [numberOfMedicalStaff, setNumberOfMedicalStaff] = useState(0);
    const [nexUrlForRenderMedicalStaffList, setNexUrlForRenderMedicalStaffList] = useState("");
    const [previousUrlForRenderMedicalStaffList, setPreviousUrlForRenderMedicalStaffList] = useState("");
    const [actualPageNumber, setActualPageNumber] = useState(1);
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");





    function calculateNumberOfSlide() {
        return numberOfMedicalStaff % 5 === 0 ? numberOfMedicalStaff / 5 : Math.floor(numberOfMedicalStaff / 5) + 1;
    }


    function updateActualPageNumber(action) {
        if (action === "next")
        {
            if(actualPageNumber < calculateNumberOfSlide())
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



    async function fetchMedicalStaffData(url = "/medical-staff/") {
        if (!url) return;

        setWaitFetchingData(true);

        try {
            const response = await axiosInstance.get(url);
            setWaitFetchingData(false);

            if (response.status === 200) {
                setMedicalStaffList(response.data.results);
                setNumberOfMedicalStaff(response.data.count);
                setNexUrlForRenderMedicalStaffList(response.data.next);
                setPreviousUrlForRenderMedicalStaffList(response.data.previous);
                setServerErrorMessage("");
                setErrorStatus(null);
            }
        } catch (error) {
            setWaitFetchingData(false);
            setMedicalStaffList([]);
            setNumberOfMedicalStaff(0);
            setNexUrlForRenderMedicalStaffList("");
            setPreviousUrlForRenderMedicalStaffList("");
            setServerErrorMessage("Something went wrong when retrieving medical staff list !!")
            setErrorStatus(error.status);
            console.log(error);
        }
    }


    async function fetchMedicalStaffList() {
        await fetchMedicalStaffData();
    }


    async function fetchNextOrPreviousPatientList(url) {
        await fetchMedicalStaffData(url);
    }

    useEffect(() => {
        fetchMedicalStaffList();
    }, []);



    async function deleteMedicalStaff(medicalStaffId){
        setIsLoading(true);
        try {
            const response = await axiosInstance.delete(`/medical-staff/${medicalStaffId}/`);
            if (response.status === 204) {
                setIsLoading(false);
                setSuccessMessage("Medical Staff deleted successfully !");
                setErrorMessage("");
                setCanOpenErrorMessageModal(false);
                setCanOPenSuccessModal(true);
            }
        }
        catch (error) {
            setIsLoading(false);
            setSuccessMessage("");
            setErrorMessage(error.response.data.detail)
            setCanOPenSuccessModal(false);
            setCanOpenErrorMessageModal(true);
            console.log(error);
        }
    }



    return (
        <CustomDashboard linkList={adminNavLink} requiredRole={"Admin"}>
            <AdminNavBar/>
            <div className="mt-5 flex flex-col relative">

                {/*Header content with search bar*/}
                <div className="flex justify-between mb-5">
                    <p className="font-bold text-xl mt-2 ml-5"> List Of Medical Staff </p>
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

                {/*List of registered medical staff*/}

                {waitFetchingData ? (
                        <div className="h-[500px] w-full flex justify-center items-center">
                            <Loader size={"medium"} color={"primary-end"}/>
                        </div>
                    ) :
                    errorStatus ? (
                            <div className="mt-16">
                                <ServerErrorPage errorStatus={errorStatus} message={serverErrorMessage}/>
                            </div>
                        ) :
                        medicalStaffList.length >0 ? (
                            <div className="ml-5 mr-5 ">
                                <table className="w-full border-separate border-spacing-y-2">
                                    <thead>
                                    <tr className="bg-gradient-to-l from-primary-start to-primary-end">
                                        <th className="text-center text-white p-4 text-xl font-bold  rounded-l-lg ">No</th>
                                        <th className="text-center text-white p-4 text-xl font-bold">First Name</th>
                                        <th className="text-center text-white p-4 text-xl font-bold">Last Name
                                        </th>
                                        <th className="text-center text-white p-4 text-xl font-bold">Gender</th>
                                        <th className="text-center text-white p-4 text-xl font-bold">Email</th>
                                        <th className="text-center text-white p-4 text-xl font-bold">Role</th>
                                        <th className="text-center text-white p-4 text-xl font-bold  rounded-r-lg">
                                            <p>Operations</p>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {medicalStaffList.map((medicalStaff, index) => (
                                        <tr key={medicalStaff.id || index} className="bg-gray-100">
                                            <td className="p-4 text-md text-blue-900 rounded-l-lg text-center">{index + 1}</td>
                                            <td className="p-4 text-md text-center font-bold">{medicalStaff.first_name}</td>
                                            <td className="p-4 text-md text-center">{medicalStaff.last_name}</td>
                                            <td className="p-4 text-md text-center">{medicalStaff.gender}</td>
                                            <td className="p-4 text-center text-md">{medicalStaff.email}</td>
                                            <td className="p-4 text-center text-md">{medicalStaff.role === "Labtech" ? "Laboratory Assistant" : medicalStaff.role}</td>
                                            <td className="p-4 relative rounded-r-lg">
                                                <div className="w-full items-center justify-center flex gap-6">
                                                    <Tooltip placement={"left"} title={"view details"}>
                                                        <button
                                                            onClick={() => {
                                                                setSelectedMedicalStaffDetails(medicalStaff), setCanOpenViewMedicalStaffDetailModal(true)
                                                            }}
                                                            className="flex items-center justify-center w-9 h-9 text-primary-end text-xl hover:bg-gray-300 hover:rounded-full transition-all duration-300">
                                                            <FaEye/>
                                                        </button>
                                                    </Tooltip>
                                                    <Tooltip placement={"top"} title={"Edit Patient Informations"}>
                                                        <button
                                                            onClick={() => {
                                                                setSelectedMedicalStaffDetails(medicalStaff), setCanOpenEditMedicalStaffDetailModal(true)
                                                            }}
                                                            className="flex items-center justify-center w-9 h-9 text-green-500 text-xl hover:bg-gray-300 hover:rounded-full transition-all duration-300">
                                                            <FaEdit/>
                                                        </button>
                                                    </Tooltip>
                                                    <Tooltip placement={"top"} title={"delete patient"}>
                                                        <button
                                                            onClick={() => {
                                                                setMedicalStaffToDelete(medicalStaff), setCanOpenConfirmActionModal(true)
                                                            }}
                                                            className="flex items-center justify-center w-9 h-9 text-red-400 text-xl hover:bg-gray-300 hover:rounded-full transition-all duration-300">
                                                            <FaTrash/>
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
                                                onClick={async ()=> {await fetchNextOrPreviousPatientList(previousUrlForRenderMedicalStaffList), updateActualPageNumber("prev")}}
                                                className="w-14 h-14 border-2 rounded-lg hover:bg-secondary text-xl  text-secondary hover:text-2xl duration-300 transition-all  hover:text-white shadow-xl flex justify-center items-center mt-2">
                                                <FaArrowLeft/>
                                            </button>
                                        </Tooltip>
                                        <p className="text-secondary text-2xl font-bold mt-4">{actualPageNumber}/{calculateNumberOfSlide()}</p>
                                        <Tooltip placement={"right"} title={"next slide"}>
                                            <button
                                                onClick={async ()=> {await fetchNextOrPreviousPatientList(nexUrlForRenderMedicalStaffList), updateActualPageNumber("next")}}
                                                className="w-14 h-14 border-2 rounded-lg hover:bg-secondary text-xl  text-secondary hover:text-2xl duration-300 transition-all  hover:text-white shadow-xl flex justify-center items-center mt-2">
                                                <FaArrowRight/>
                                            </button>
                                        </Tooltip>
                                    </div>
                                </div>


                                {/* Add new medical staff button */}
                                <Tooltip placement={"top"} title={"Add New Medical Staff"}>
                                    <button
                                        onClick={()=>navigate(appRouterPaths.addMedicalStaff)}
                                        className="flex justify-center items-center fixed bottom-5 right-16 rounded-full w-14 h-14 bg-gradient-to-r text-3xl font-bold text-white from-primary-start to-primary-end hover:text-4xl transition-all duration-300">
                                        <FaPlus/>
                                    </button>
                                </Tooltip>


                                {/* Modals content */}
                                <EditMedicalStaffInfosModal isOpen={canOpenEditMedicalStaffDetailModal} onClose={()=>{setCanOpenEditMedicalStaffDetailModal(false)}} setCanOpenSuccessModal={setCanOPenSuccessModal} setSuccessMessage={setSuccessMessage} setIsLoading={setIsLoading} medicalStaffData={selectedMedicalStaffDetails}/>
                                <SuccessModal isOpen={canOpenSuccessModal} message={successMessage} canOpenSuccessModal={setCanOPenSuccessModal} makeAction={async ()=> {await fetchMedicalStaffList(), calculateNumberOfSlide()}}/>
                                <ErrorModal isOpen={canOpenErrorMessageModal} onCloseErrorModal={()=>{setCanOpenErrorMessageModal(false)}} message={errorMessage}/>
                                <ViewMedicalStaffDetailsModal isOpen={canOpenViewMedicalStaffDetailModal} medicalStaff={selectedMedicalStaffDetails} onClose={()=>{setCanOpenViewMedicalStaffDetailModal(false)}}/>
                                {isLoading && <Wait/>}
                                <ConfirmationModal isOpen={canOpenConfirmActionModal} onClose={() => setCanOpenConfirmActionModal(false)} onConfirm={async () => await deleteMedicalStaff(medicalStaffToDelete.id)} title={"Delete Medical Staff"} message={`Are you sure you want to delete the ${medicalStaffToDelete.role + " "} ${medicalStaffToDelete.first_name + " " + medicalStaffToDelete.last_name} ?`}/>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-[600px]  bg-gradient-to-b from-white to-teal-50   p-8">
                                <div className="mb-6 relative">
                                    <svg
                                        className="w-24 h-24 text-primary-end"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                    <span className="absolute top-0 left-0 w-full h-full bg-teal-200 rounded-full animate-ping opacity-75"></span>
                                </div>
                                <h2 className="text-2xl font-bold text-teal-700 mb-4">No registered medical personnel</h2>
                                <p className="text-gray-600 text-center mb-8 max-w-xl">
                                    Your medical team is the heart of your clinic. Start building your team by adding your first member of the medical staff.
                                </p>
                                <button
                                    onClick={()=>navigate(appRouterPaths.addMedicalStaff)}
                                    className="bg-primary-end hover:bg-primary-start text-white font-bold py-2 px-4 rounded-full transition-all duration-300 flex items-center"
                                >
                                    <svg
                                        className="w-5 h-5 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add a staff member
                                </button>
                            </div>
                        )
                }
            </div>
        </CustomDashboard>
    )
}