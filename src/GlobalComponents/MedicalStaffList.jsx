import {FaArrowLeft, FaArrowRight, FaSearch} from "react-icons/fa";
import {Tooltip} from "antd";
import {useEffect, useState} from "react";
import axiosInstance from "../Utils/axiosInstance.js";


export function MedicalStaffList()
{



    const [medicalStaffList, setMedicalStaffList] = useState([]);
    const [numberOfMedicalStaff, setNumberOfMedicalStaff] = useState(0);
    const [nexUrlForRenderMedicalStaffList, setNexUrlForRenderMedicalStaffList] = useState("");
    const [previousUrlForRenderMedicalStaffList, setPreviousUrlForRenderMedicalStaffList] = useState("");
    const [actualPageNumber, setActualPageNumber] = useState(1);




    async function fetchMedicalStaffList () {
        try
        {
            const response = await axiosInstance.get("/medical-staff/");
            if (response.status === 200)
            {
                console.log(response.data);
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




    useEffect(() => {
        fetchMedicalStaffList();
    }, []);


    return (
        <>
            <div className="flex justify-between mb-5">
                <div className="flex flex-col mt-3 ml-5">
                    {/*  <p className="font-bold text-2xl">Reception</p>  */}
                    <p className="font-bold text-xl">List of Medical Staffs</p>
                </div>
                <div className="flex mr-5 mt-2">
                    <div className="flex w-[400px] h-10 border-2 border-secondary rounded-lg">
                        <FaSearch className="text-xl text-secondary m-2"/>
                        <input
                            placeholder={"search for a specific medical staff member"}
                            type="text"
                            className="w-full mr-2 border-none focus:outline-none focus:ring-0"
                        />
                    </div>
                    <button className="ml-2 w-20 h-10 text-white bg-secondary rounded-lg">
                        Search
                    </button>
                </div>
            </div>

            <div className="ml-5 mr-5 mt-2 border-2 h-[500px] rounded-lg shadow-lg  p-2">
                <table className="w-full border-separate border-spacing-y-2">
                    <thead>
                    <tr>
                        <th className="text-center p-3 text-xl font-bold border-r-2 border-gray-200">No</th>
                        <th className="text-center p-3 text-xl font-bold border-r-2 border-gray-200">First Name
                        </th>
                        <th className="text-center p-3 text-xl font-bold border-r-2 border-gray-200 ">Last Name
                        </th>
                        <th className="text-center p-3 text-xl font-bold border-r-2 border-gray-200 ">Gender</th>
                        <th className="text-center p-3 text-xl font-bold border-r-2 border-gray-200 ">Email</th>
                        <th className="text-center p-3 text-xl font-bold border-r-2 border-gray-200 ">Role</th>
                        <th className="text-center p-3 text-xl font-bold ">CNI number</th>
                    </tr>
                    </thead>
                    <tbody className="mt-5">
                    {medicalStaffList.map((person, index) => (
                        <tr key={index} className="bg-gray-100">
                            <td className="p-6 text-md text-blue-900 rounded-l-lg text-center">{index + 1}</td>
                            <td className="p-6 text-md text-blue-900  text-center">{person.first_name}</td>
                            <td className="p-6 text-md text-center ">{person.last_name}</td>
                            <td className="p-6 text-md text-center ">{person.gender}</td>
                            <td className="p-6 text-md text-center ">{person.email}</td>
                            <td className="p-6 text-md text-center ">{person.role}</td>
                            <td className="p-6 flex justify-center rounded-r-xl">{person.cniNumber}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>


            <div className="fixed w-full justify-center -right-16 bottom-0 flex mt-6 mb-4">
                <div className="flex gap-4">
                    <Tooltip placement={"left"} title={"previous slide"}>
                        <button
                            onClick={async () => {
                                await fetchNextOrPreviousPatientList(previousUrlForRenderMedicalStaffList), updateActualPageNumber("prev")
                            }}
                            className="w-14 h-14 border-2 rounded-lg hover:bg-secondary text-xl  text-secondary hover:text-2xl duration-300 transition-all  hover:text-white shadow-xl flex justify-center items-center mt-2">
                            <FaArrowLeft/>
                        </button>
                    </Tooltip>
                    <p className="text-secondary text-2xl font-bold mt-4">{actualPageNumber}/{calculateNumberOfSlide()}</p>
                    <Tooltip placement={"right"} title={"next slide"}>
                        <button
                            onClick={async () => {
                                await fetchNextOrPreviousPatientList(nexUrlForRenderMedicalStaffList), updateActualPageNumber("next")
                            }}
                            className="w-14 h-14 border-2 rounded-lg hover:bg-secondary text-xl  text-secondary hover:text-2xl duration-300 transition-all  hover:text-white shadow-xl flex justify-center items-center mt-2">
                            <FaArrowRight/>
                        </button>
                    </Tooltip>
                </div>
            </div>
        </>
    )
}