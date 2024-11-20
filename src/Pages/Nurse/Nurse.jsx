import {NurseDashboard} from "../../Components/NurseDashboard.jsx";
import {NurseNavBar} from "../../Components/NurseNavBar.jsx";
import userIcon from "../../../public/userIcon.png"

export function Nurse()
{
    return (
        <>
            <div className="flex min-h-screen ">

                <div className="w-1/6">
                    <NurseDashboard/>
                </div>
                <div className="flex-1 flex flex-col">
                    <div>
                        <NurseNavBar/>
                    </div>
                    <div className="mt-5 flex flex-col">
                        <div className=" ml-5 mr-5 h-[150px] bg-gradient-to-t from-primary-start to-primary-end flex rounded-lg justify-between">
                            <div className="flex gap-4">

                                <div className="mt-5 mb-5 ml-5 w-28 h-28 border-4 border-white rounded-full">
                                    <img src={userIcon} alt="user icon" className="h-[105px] w-[105px] mb-2"/>
                                </div>

                                <div className="flex flex-col">
                                    <p className="text-white text-4xl font-bold mt-6">Welcome Back!</p>
                                    <p className="text-2xl mt-2 text-white"> Username</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-white mt-28 text-xl font-bold mr-4">12:30:25 AM</p>
                            </div>
                        </div>


                        <div className="flex justify-between mt-3">
                            <div className="flex flex-col ml-5">
                                <p>Reception</p>
                                <p>List of patients</p>
                            </div>
                            <div className="flex mr-5 ">
                                <div className="flex w-[300px] h-10 ">
                                    <input type="text" className="border-2 border-secondary rounded-lg w-full"/>
                                </div>
                                <button className="ml-2 w-20 h-10 text-white bg-secondary rounded-lg">
                                    Search
                                </button>


                            </div>

                        </div>
                    </div>


                </div>

            </div>


        </>
    )
}