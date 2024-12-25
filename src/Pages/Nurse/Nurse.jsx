import {NurseNavBar} from "./NurseNavBar.jsx";
import userIcon from "../../assets/userIcon.png"
import {FaArrowLeft, FaArrowRight,FaSearch} from "react-icons/fa";
import {PatientList} from "./PatientList.jsx";
import {DashBoard} from "../../GlobalComponents/DashBoard.jsx";
import {nurseNavLink} from "./nurseNavLink.js";
import {useAuthentication} from "../../Utils/Provider.jsx";
import {Tooltip} from "antd";
import {useEffect, useState} from "react";
import axiosInstance from "../../Utils/axiosInstance.js";




export function Nurse()
{

    const {userData} = useAuthentication();

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
        {
            id: 6,
            name: "DONCHI",
            lastName: "Tresor",
            gender: "Male",
            birthDate: "Fev. 14, 2001",
            address: "Melen Yaounde",
            email: "monemail@gmail.com",
            CNI: 100923426,
            createdAt: "10:40 a.m, Fev. 14 2024",
            userContact: 629876756,
            urgenceContact: 658987898,
            state: "critical"
        },
    ];


    const [patientList, setPatientList] = useState([]);
    const [numberOfPatients, setNumberOfPatients] = useState(0);
    const [nexUrlForRenderPatientList, setNexUrlForRenderPatientList] = useState("");
    const [previousUrlForRenderPatientList,setPreviousUrlForRenderPatientList] = useState("");
    const [actualPageNumber, setActualPageNumber] = useState(0);



    async function fetchPatientList()
    {
        try
        {
            const response = await axiosInstance.get("/patient/");
            if (response.status === 200)
            {
                setPatientList(response.data.results);
                setNumberOfPatients(response.data.count);
                setNexUrlForRenderPatientList(response.data.next);
                setPreviousUrlForRenderPatientList(response.data.previous);
            }
        }
        catch (error)
        {
            console.log(error);
        }
    }


    async function fetchNextOrPreviousPatientList (url) {
        if(url)
        {
            try {
                const response = await axiosInstance.get(url);
                if (response.status === 200)
                {
                    //console.log(response)
                    setPatientList(response.data.results);
                    setNumberOfPatients(response.data.count);
                    setNexUrlForRenderPatientList(response.data.next);
                    setPreviousUrlForRenderPatientList(response.data.previous);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    function computeNumberOfSlideToRender() {
        return numberOfPatients % 5 === 0 ? numberOfPatients / 5 : Math.floor(numberOfPatients / 5) + 1;
    }


    function updateActualPageNumber(action) {
        if (action === "next")
        {
            if(actualPageNumber < computeNumberOfSlideToRender())
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
        fetchPatientList();
    }, []);





    return (
        <>
            <DashBoard requiredRole={"Nurse"} linkList={nurseNavLink}>
                <NurseNavBar>
                    <div className="flex flex-col">

                        {/*Header with welcome text content */}
                        <div className="ml-5 mr-5 h-[150px] bg-gradient-to-t from-primary-start to-primary-end flex rounded-lg justify-between">
                            <div className="flex gap-4">
                                <div className="mt-5 mb-5 ml-5 w-28 h-28 border-4 border-white rounded-full">
                                    <img src={userIcon} alt="user icon" className="h-[105px] w-[105px] mb-2"/>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-white text-4xl font-bold mt-6">Welcome Back!</p>
                                    <p className="text-2xl mt-2 text-white"> {userData.username}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-white mt-28 text-xl font-bold mr-4">12:30:25 AM</p>
                            </div>
                        </div>

                        {/*Search bar content */}
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

                        {/*List of patients content */}
                        <div className="ml-5 mr-5 mt-2 border-2 h-[620px] rounded-lg shadow-lg  p-2">
                            <PatientList patients={patientList}/>
                        </div>


                        {/* Pagination content */}
                        <div className="justify-center ml-24 flex mt-6 mb-4">
                            <div className="flex gap-4">
                                <Tooltip placement={"left"} title={"previous slide"}>
                                    <button
                                        onClick={()=>{fetchNextOrPreviousPatientList(previousUrlForRenderPatientList), updateActualPageNumber("prev")}}
                                        className="w-14 h-14 border-2 rounded-lg hover:bg-secondary text-xl  text-secondary hover:text-2xl duration-300 transition-all  hover:text-white shadow-xl flex justify-center items-center mt-2">
                                        <FaArrowLeft/>
                                    </button>
                                </Tooltip>
                                <p className="text-secondary text-2xl font-bold mt-4">{actualPageNumber}/{numberOfPatients}</p>
                                <Tooltip placement={"right"} title={"next slide"}>
                                    <button
                                        onClick={()=>{fetchNextOrPreviousPatientList(nexUrlForRenderPatientList), updateActualPageNumber("next")}}
                                        className="w-14 h-14 border-2 rounded-lg hover:bg-secondary text-xl  text-secondary hover:text-2xl duration-300 transition-all  hover:text-white shadow-xl flex justify-center items-center mt-2">
                                        <FaArrowRight/>
                                    </button>
                                </Tooltip>
                            </div>
                        </div>

                    </div>
                </NurseNavBar>
            </DashBoard>
        </>
    )
}