import {FaArrowLeft, FaArrowRight, FaSearch} from "react-icons/fa";

const medicalStaffs = [
    {
        name: "Patients",
        lastName: "Nurse",
        gender: "Male",
        email: "email@gmail.com",
        role: "doctor",
        ID: 102457689
    },
    {
        name: "Patients",
        lastName: "Nurse",
        gender: "Male",
        email: "email@gmail.com",
        role: "doctor",
        ID: 102457689
    },
    {
        name: "Patients",
        lastName: "Nurse",
        gender: "Male",
        email: "email@gmail.com",
        role: "doctor",
        ID: 102457689
    },
    {
        name: "Patients",
        lastName: "Nurse",
        gender: "Male",
        email: "email@gmail.com",
        role: "doctor",
        ID: 102457689
    },
    {
        name: "Patients",
        lastName: "Nurse",
        gender: "Male",
        email: "email@gmail.com",
        role: "doctor",
        ID: 102457689
    },
];


export function MedicalStaffList()
{
    return (
        <>
            <div className="flex justify-between mt-10 mb-5">
                <div className="flex flex-col ml-5">
                    <p className="font-bold text-2xl">Reception</p>
                    <p>List of Medical Staffs</p>
                </div>
                <div className="flex mr-5 mt-2">
                    <div className="flex w-[400px] h-10 border-2 border-secondary rounded-lg">
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
                    {medicalStaffs.map((person, index) => (
                        <tr key={index} className="bg-gray-100">
                            <td className="p-6 text-md text-blue-900 rounded-l-lg text-center">{index + 1}</td>
                            <td className="p-6 text-md text-blue-900  text-center">{person.name}</td>
                            <td className="p-6 text-md text-center ">{person.lastName}</td>
                            <td className="p-6 text-md text-center ">{person.gender}</td>
                            <td className="p-6 text-md text-center ">{person.email}</td>
                            <td className="p-6 text-md text-center ">{person.role}</td>
                            <td className="p-6 flex justify-center rounded-r-xl">{person.ID}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center items-center mt-4 mb-4">
                <div className="flex gap-4">
                    <button
                        className="w-14 h-14 border-2 rounded-lg shadow-xl flex justify-center items-center mt-2">
                        <FaArrowLeft
                            className="text-xl text-secondary hover:text-2xl duration-300 transition-all"/>
                    </button>

                    <p className="text-secondary text-2xl font-bold mt-4">1/200</p>

                    <button
                        className="w-14 h-14 border-2 rounded-lg shadow-xl flex justify-center items-center mt-2">
                        <FaArrowRight
                            className="text-xl text-secondary hover:text-2xl duration-300 transition-all"/>
                    </button>
                </div>
            </div>
        </>
    )
}