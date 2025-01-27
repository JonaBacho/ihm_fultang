import {cashierNavLink} from './cashierNavLink.js'
import {CashierNavBar} from './CashierNavBar.jsx'
import {DashBoard} from "../../GlobalComponents/DashBoard.jsx";
import userIcon from "../../assets/userIcon.png"
import {useAuthentication} from "../../Utils/Provider.jsx";
import {FaArrowLeft, FaArrowRight,FaSearch} from "react-icons/fa";
import {Tooltip} from "antd";
import ConsultationList from './ConsultationList.jsx'


export function Cashier()
{
    const {userData} = useAuthentication();


    return(
        <DashBoard linkList={cashierNavLink} requiredRole={"Cashier"}>
            <CashierNavBar/>

            <div className="flex flex-col">

                {/*Header with welcome text content */}
                <div
                    className="ml-5 mr-5 h-[150px] bg-gradient-to-t from-primary-start to-primary-end flex rounded-lg justify-between">
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

                {/*List of consulations */}

                <ConsultationList/>
            </div>


        </DashBoard>
    )
}