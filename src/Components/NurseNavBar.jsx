import { FaFlag, FaBell, FaEnvelope, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import {useAuthentication} from "../Utils/Provider.jsx";
import {Tooltip} from "antd";
import PropTypes from "prop-types";

export function NurseNavBar({children})
{


    NurseNavBar.propTypes = {
        children: PropTypes.node.isRequired,
    };

    const {logout} = useAuthentication();
    const applyNavLinkBtnStyle = () => {
        return " w-12 h-10 border-2 bg-gay-100 flex justify-center items-center rounded-xl shadow-xl hover:bg-secondary text-secondary text-xl hover:text-white transition-all duration-300";
    }





    return (
        <div>
            <div className="h-[70px] w-full  flex justify-between">
                <div className="text-5xl font-bold mt-7 ml-5">
                    <span>Nurse</span>
                </div>
                <div className="flex gap-2 mt-8 mb-4 mr-5">
                    <button className={applyNavLinkBtnStyle()}>
                        <FaFlag/>
                    </button>
                    <button className={applyNavLinkBtnStyle()}>
                        <FaCog/>
                    </button>
                    <Tooltip placement={"top"} title={"Notification"}>
                        <button className={applyNavLinkBtnStyle()}>
                            <FaBell/>
                        </button>
                    </Tooltip>
                    <button className={applyNavLinkBtnStyle()}>
                        <FaEnvelope/>
                    </button>
                    <Tooltip placement={"top"} title={"Profile"}>
                        <button className={applyNavLinkBtnStyle()}>
                            <FaUser/>
                        </button>
                    </Tooltip>
                    <Tooltip placement={"top"} title={"LogOut"}>
                        <button
                            onClick={() => {
                                logout()
                            }}
                            className={applyNavLinkBtnStyle()}>
                            <FaSignOutAlt/>
                        </button>
                    </Tooltip>
                </div>
            </div>
            <div className="flex-1 mt-5">
                {children}
            </div>
        </div>
    )
}