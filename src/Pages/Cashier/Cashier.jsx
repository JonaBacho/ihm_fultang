import {cashierNavLink} from './cashierNavLink.js'
import {CashierNavBar} from './CashierNavBar.jsx'
import {DashBoard} from "../../GlobalComponents/DashBoard.jsx";
import userIcon from "../../assets/userIcon.png"
import {useAuthentication} from "../../Utils/Provider.jsx";
import {FaArrowLeft, FaArrowRight,FaSearch} from "react-icons/fa";
import {Tooltip} from "antd";
import {ConsultationList} from './ConsultationList.jsx'


export function Cashier()
{
    const {userData} = useAuthentication();

    const consultations = [
        {
          id: 1,
          consultationDate: "2024-12-15",
          consultationTime: "14:30",
          consultationCost: 25000,
          consultationReason: "Check-up général",
          consultationNotes: "RAS",
          allergy: null,
          previousHistory: "Aucune",
          status: "Non payé",
          idParameters: 101,
          idMedicalFolderPage: 2001,
          idPatient: 501,
          idMedicalStaff: 301,
          idConsultationType: 2,
        },
        {
          id: 2,
          consultationDate: "2024-12-14",
          consultationTime: "10:00",
          consultationCost: 15000,
          consultationReason: "Douleur thoracique",
          consultationNotes: "À surveiller",
          allergy: "Aspirine",
          previousHistory: "Crise d'asthme",
          status: "Payé",
          idParameters: 102,
          idMedicalFolderPage: 2002,
          idPatient: 502,
          idMedicalStaff: 302,
          idConsultationType: 1,
        },
      ];

    return(
        <DashBoard linkList={cashierNavLink} requiredRole={"Cashier"}>
            <CashierNavBar> 
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

                    {/*List of consulations */}
                    <div className="ml-5 mr-5 mt-2 border-2 h-[620px] rounded-lg shadow-lg  p-2">
                        <ConsultationList consultations={consultations}/>
                    </div>
                </div>
            </CashierNavBar>
            
        </DashBoard>
    )
}