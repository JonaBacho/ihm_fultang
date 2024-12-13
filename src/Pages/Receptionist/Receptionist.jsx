import {ReceptionistDashboard} from "./ReceptionistDashboard.jsx";
import {ReceptionistNavBar} from "./ReceptionistNavBar.jsx";
import {FaArrowLeft, FaArrowRight, FaEdit, FaEye, FaSearch, FaTrash,} from "react-icons/fa";
import {Tooltip} from "antd";

export function Receptionist()
{
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



    return (
        <ReceptionistDashboard>
            <ReceptionistNavBar/>
            <div className="mt-5 flex flex-col">

                {/*Header content with search bar*/}

                <div className="flex justify-between mb-5">
                    <p className="font-bold text-xl mt-2 ml-5"> List Of Patient </p>
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

                {/*List of registered patients*/}

                <div className="ml-5 mr-5">
                    <table className="w-full border-separate border-spacing-y-2">
                        <thead>
                        <tr className="bg-gradient-to-l from-primary-start to-primary-end ">
                            <th className="text-center text-white p-4 text-xl font-bold  border-gray-200 rounded-l-2xl ">No</th>
                            <th className="text-center text-white p-4 text-xl font-bold border-gray-200">First Name</th>
                            <th className="text-center text-white p-4 text-xl font-bold  border-gray-200 ">Last Name</th>
                            <th className="text-center text-white p-4 text-xl font-bold  border-gray-200 ">Gender</th>
                            <th className="text-center text-white p-4 text-xl font-bold  border-gray-200 ">Address</th>
                            <th className="text-center text-white p-4 text-xl font-bold  flex-col rounded-r-2xl">
                                <p>Operations</p>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {patients.map((patient, index) => (
                            <tr key={patient.id || index} className="bg-gray-100">
                                <td className="p-4 text-md text-blue-900 rounded-l-lg text-center">{index + 1}</td>
                                <td className="p-4 text-md text-center font-bold">{patient.name}</td>
                                <td className="p-4 text-md text-center">{patient.lastName}</td>
                                <td className="p-4 text-md text-center">{patient.gender}</td>
                                <td className="p-4 text-center text-md">{patient.address}</td>
                                <td className="p-4 relative rounded-r-lg">
                                    <div className="w-full items-center justify-center flex gap-6">
                                        <Tooltip placement={"left"} title={"view details"}>
                                            <button className="flex items-center justify-center w-9 h-9 text-secondary text-xl hover:bg-gray-300 hover:rounded-full transition-all duration-300">
                                                <FaEye/>
                                            </button>
                                        </Tooltip>
                                        <Tooltip placement={"bottom"} title={"Edit"}>
                                            <button
                                                className="flex items-center justify-center w-9 h-9 text-secondary text-xl hover:bg-gray-300 hover:rounded-full transition-all duration-300">
                                                <FaEdit/>
                                            </button>
                                        </Tooltip>
                                        <Tooltip placement={"right"} title={"delete"}>
                                            <button
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

                    <div className="flex">
                        <div className="w-1/3">
                        </div>
                        <div className="w-2/3 justify-between flex">
                            <div className="ml-24 flex mt-6 mb-4">
                                <div className="flex gap-4">
                                    <Tooltip placement={"left"} title={"previous slide"}>
                                        <button
                                            className="w-14 h-14 border-2 rounded-lg hover:bg-secondary text-xl  text-secondary hover:text-2xl duration-300 transition-all  hover:text-white shadow-xl flex justify-center items-center mt-2">
                                            <FaArrowLeft/>
                                        </button>
                                    </Tooltip>


                                    <p className="text-secondary text-2xl font-bold mt-4">1/10</p>

                                    <Tooltip placement={"right"} title={"next slide"}>
                                        <button
                                            className="w-14 h-14 border-2 rounded-lg hover:bg-secondary text-xl  text-secondary hover:text-2xl duration-300 transition-all  hover:text-white shadow-xl flex justify-center items-center mt-2">
                                            <FaArrowRight/>
                                        </button>

                                    </Tooltip>
                                </div>
                            </div>

                            <div className="mt-10 mr-10">
                                <Tooltip placement={"top"} title={"Add new patient"}>
                                    <button
                                        className=" rounded-full w-14 h-14 bg-gradient-to-r text-4xl font-bold text-white from-primary-start to-primary-end hover:text-5xl transition-all duration-300">
                                        +
                                    </button>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ReceptionistDashboard>
    )
}