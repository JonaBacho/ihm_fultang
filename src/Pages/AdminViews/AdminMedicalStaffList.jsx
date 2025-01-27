import {FaArrowLeft, FaArrowRight, FaEdit, FaEye, FaSearch, FaTrash,} from "react-icons/fa";
import {Tooltip} from "antd";
import {useEffect, useState} from "react";
import {SuccessModal} from "../Modals/SuccessModal.jsx";
import Wait from "../Modals/wait.jsx";
import {ErrorModal} from "../Modals/ErrorModal.jsx";
import axiosInstance from "../../Utils/axiosInstance.js";
import {AdminDashBoard} from "./AdminDashboard.jsx";
import {AdminNavBar} from "./AdminNavBar.jsx";
import {adminNavLink} from "./adminNavLink.js";
import {ConfirmationModal} from "../Modals/ConfirmAction.Modal.jsx";
import {AppRoutesPaths as appRouterPaths} from "../../Router/appRouterPaths.js";
import {useNavigate} from "react-router-dom";
import {ViewMedicalStaffDetailsModal} from "./ViewMedicalStaffDetailsModal.jsx";
import {EditMedicalStaffInfosModal} from "./EditMedicalStaffInfosModal.jsx";


export function AdminMedicalStaffList()
{

    const [errorMessage, setErrorMessage] = useState("");
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




    async function fetchMedicalStaffList () {
        try
        {
            const response = await axiosInstance.get("/medical-staff/");
            if (response.status === 200)
            {
                //console.log(response.data);
                setMedicalStaffList(response.data.results);
                setNumberOfMedicalStaff(response.data.count);
                setNexUrlForRenderMedicalStaffList(response.data.next);
                setPreviousUrlForRenderMedicalStaffList(response.data.previous);
            }
        }
        catch (error)
        {
            setMedicalStaffList([]);
            setNumberOfMedicalStaff(0);
            setNexUrlForRenderMedicalStaffList("");
            setPreviousUrlForRenderMedicalStaffList("");
            console.log(error);
        }

    }

    useEffect(() => {
        fetchMedicalStaffList();
    }, []);



    const navigate = useNavigate();


    async function fetchNextOrPreviousPatientList(url)
    {
        if(url)
        {
            try {
                const response = await axiosInstance.get(url);
                if (response.status === 200)
                {
                    setMedicalStaffList(response.data.results);
                    setNumberOfMedicalStaff(response.data.count);
                    setNexUrlForRenderMedicalStaffList(response.data.next);
                    setPreviousUrlForRenderMedicalStaffList(response.data.previous);
                }
            } catch (error) {
                setMedicalStaffList([]);
                setNumberOfMedicalStaff(0);
                setPreviousUrlForRenderMedicalStaffList("");
                setNexUrlForRenderMedicalStaffList("");
                console.log(error);
            }
        }
    }





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
        <AdminDashBoard linkList={adminNavLink} requiredRole={"Admin"}>
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

                {/*List of registered patients*/}

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
                                        <Tooltip placement={"right"} title={"Edit"}>
                                            <button
                                                onClick={() => {
                                                    setSelectedMedicalStaffDetails(medicalStaff), setCanOpenEditMedicalStaffDetailModal(true)
                                                }}
                                                className="flex items-center justify-center w-9 h-9 text-green-500 text-xl hover:bg-gray-300 hover:rounded-full transition-all duration-300">
                                                <FaEdit/>
                                            </button>
                                        </Tooltip>
                                        <Tooltip placement={"right"} title={"delete"}>
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
                            className="fixed bottom-5 right-16 rounded-full w-14 h-14 bg-gradient-to-r text-4xl font-bold text-white from-primary-start to-primary-end hover:text-5xl transition-all duration-300">
                            +
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
            </div>
        </AdminDashBoard>
    )
}