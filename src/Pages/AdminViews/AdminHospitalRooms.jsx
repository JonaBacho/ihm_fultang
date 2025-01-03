import { useState } from 'react';
import { BedDouble, BedSingle, Search, Users, CheckCircle, XCircle, Plus } from 'lucide-react';
import {AdminDashBoard} from "./AdminDashboard.jsx";
import {adminNavLink} from "./adminNavLink.js";
import {AdminNavBar} from "./AdminNavBar.jsx";
import {Tooltip} from "antd";
import {FaArrowLeft, FaArrowRight, FaEdit, FaEye, FaTrash} from "react-icons/fa";
import {AppRoutesPaths as appRouterPaths} from "../../Router/appRouterPaths.js";
import {useNavigate} from "react-router-dom";

export function AdminHospitalRooms() {
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');


    const rooms = [
        { id: 1, number: "101", bedNumber: 10, status: "occupied", patient: "Jean Dupont", admissionDate: "2024-01-25", price: "25000" },
        { id: 2, number: "102", bedNumber: 5, status: "available", patient: null, admissionDate: null, price: "35000" },
        { id: 3, number: "103", bedNumber: 5, status: "occupied", patient: "Marie Claire", admissionDate: "2024-01-24", price: "50000" },
        { id: 4, number: "201", bedNumber: 1, status: "available", patient: null, admissionDate: null, price: "25000" },
        { id: 5, number: "202", bedNumber: 1, status: "occupied", patient: "Paul Martin", admissionDate: "2024-01-23", price: "35000" },
    ];

    const stats = {
        total: rooms.length,
        available: rooms.filter(room => room.status === 'available').length,
        occupied: rooms.filter(room => room.status === 'occupied').length
    };

    const filteredRooms = rooms.filter(room => {
        const matchesStatus = filterStatus === 'all' || room.status === filterStatus;
        const matchesSearch = room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (room.patient && room.patient.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesStatus && matchesSearch;
    });

    const navigate = useNavigate();
    return (
        <AdminDashBoard linkList={adminNavLink} requiredRole={"Admin"}>
            <AdminNavBar/>

            <div className="p-6 mx-auto relative">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 mb-6">
                    <div className="bg-gradient-to-r from-primary-end to-primary-start p-6 rounded-lg shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white font-semibold text-md">Total Rooms</p>
                                <h3 className="text-white text-3xl font-bold">{stats.total}</h3>
                            </div>
                            <BedDouble className="text-white h-12 w-12 opacity-80"/>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-300 to-green-500 p-6 rounded-lg shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white font-semibold text-md">Available Rooms</p>
                                <h3 className="text-white text-3xl font-bold">{stats.available}</h3>
                            </div>
                            <CheckCircle className="text-white h-12 w-12 opacity-80"/>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-orange-300 to-orange-500 p-6 rounded-lg shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white font-semibold text-md">Occupied Rooms</p>
                                <h3 className="text-white text-3xl font-bold">{stats.occupied}</h3>
                            </div>
                            <Users className="text-white h-12 w-12 opacity-80"/>
                        </div>
                    </div>
                </div>

                {/* Search Bar and filters*/}
                <div className="flex flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="looking for a room..."
                            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none  focus:border-2  focus:border-primary-end"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={20}/>
                    </div>
                    <div className="flex gap-2">
                        <button className={`px-4 py-2 rounded-md ${filterStatus === 'all' ? 'bg-primary-end text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                onClick={() => setFilterStatus('all')}
                        >
                            ALL
                        </button>
                        <button className={`px-4 py-2 rounded-md ${filterStatus === 'available' ? 'bg-primary-end  text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                onClick={() => setFilterStatus('available')}
                        >
                            Available
                        </button>
                        <button className={`px-4 py-2 rounded-md ${filterStatus === 'occupied' ? 'bg-primary-end  text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                onClick={() => setFilterStatus('occupied')}
                        >
                            Occupied
                        </button>
                    </div>
                </div>

                <h1 className="text-2xl font-bold mb-2 mt-6">List Of Rooms</h1>
                <div>
                    <table className="w-full border-separate border-spacing-y-2">
                        <thead>
                        <tr className="bg-gradient-to-l from-primary-start to-primary-end ">
                            <th className="text-center text-white p-4 text-xl font-bold  border-gray-200 rounded-l-2xl ">Room Number
                            </th>
                            <th className="text-center text-white p-4 text-xl font-bold border-gray-200">Number Of Beds</th>
                            <th className="text-center text-white p-4 text-xl font-bold  border-gray-200 ">Status</th>
                            <th className="text-center text-white p-4 text-xl font-bold  border-gray-200 ">Creation date</th>
                            <th className="text-center text-white p-4 text-xl font-bold  border-gray-200 ">Price/Day</th>
                            <th className="text-center text-white p-4 text-xl font-bold  flex-col rounded-r-2xl">
                                <p>Operations</p>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredRooms.map((room, index) => (
                            <tr key={room.id || index} className="bg-gray-100">
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center">
                                        {room.bedNumber > 1 ? (
                                                <BedDouble className="h-5 w-5 text-gray-400 mr-2"/>
                                        ) : (
                                            <BedSingle className="h-5 w-5 text-gray-400 mr-2"/>
                                        )}
                                        {room.number}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">{room.bedNumber}</td>
                                <td className={`px-6 py-4 text-center font-semibold ${room.status === 'available' ? 'text-green-500' : 'text-orange-500'}`}>
                                    {room.status}
                                </td>
                                <td className="px-6 py-4 text-center">{room.admissionDate || '-'}</td>
                                <td className="px-6 py-4 text-center">{room.price} FCFA</td>
                                <td className="px-6 py-4 flex text-sm font-medium items-center justify-center">
                                    <Tooltip placement={"left"} title={"view details"}>
                                        <button
                                            onClick={()=>{}}
                                            className="flex items-center justify-center w-9 h-9 text-primary-end text-xl hover:bg-gray-300 hover:rounded-full transition-all duration-300">
                                            <FaEye/>
                                        </button>
                                    </Tooltip>
                                    <Tooltip placement={"right"} title={"Edit"}>
                                        <button
                                            onClick={()=>{}}
                                            className="flex items-center justify-center w-9 h-9 text-green-500 text-xl hover:bg-gray-300 hover:rounded-full transition-all duration-300">
                                            <FaEdit/>
                                        </button>
                                    </Tooltip>
                                    <Tooltip placement={"right"} title={"delete"}>
                                        <button
                                            onClick={()=>{}}
                                            className="flex items-center justify-center w-9 h-9 text-red-500 text-xl hover:bg-gray-300 hover:rounded-full transition-all duration-300">
                                            <FaTrash/>
                                        </button>
                                    </Tooltip>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {/*Pagination content */}
                    <div className="w-full justify-center flex mt-6 mb-4">
                        <div className="flex gap-4">
                            <Tooltip placement={"left"} title={"previous slide"}>
                                <button
                                    onClick={async () => {
                                    }}
                                    className="w-14 h-14 border-2 rounded-lg hover:bg-secondary text-xl  text-secondary hover:text-2xl duration-300 transition-all  hover:text-white shadow-xl flex justify-center items-center mt-2">
                                    <FaArrowLeft/>
                                </button>
                            </Tooltip>
                            <p className="text-secondary text-2xl font-bold mt-4">{"1/10"}</p>
                            <Tooltip placement={"right"} title={"next slide"}>
                                <button
                                    onClick={async () => {
                                    }}
                                    className="w-14 h-14 border-2 rounded-lg hover:bg-secondary text-xl  text-secondary hover:text-2xl duration-300 transition-all  hover:text-white shadow-xl flex justify-center items-center mt-2">
                                    <FaArrowRight/>
                                </button>
                            </Tooltip>
                        </div>
                    </div>

                    {/* Add A Room Bouton */}
                    <Tooltip placement={"top"} title={"Add A Room"}>
                        <button
                            onClick={()=>navigate(appRouterPaths.addRoomPage)}
                            className="absolute bottom-5 right-16 rounded-full w-14 h-14 bg-gradient-to-r text-4xl font-bold text-white from-primary-start to-primary-end hover:text-5xl transition-all duration-300">
                            +
                        </button>
                    </Tooltip>

                </div>


            </div>
        </AdminDashBoard>
    );
}

