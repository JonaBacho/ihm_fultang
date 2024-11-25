import { FaFlag, FaBell, FaEnvelope, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

export function NurseNavBar()
{

    const applyNavLinkBtnStyle = () => {
        return " w-12 h-10 border-2 bg-gay-100 flex justify-center items-center rounded-xl shadow-xl hover:bg-secondary text-secondary text-xl hover:text-white transition-all duration-300";
    }



    return (
        <div className="h-[70px] w-full flex justify-between">

            <div className="text-5xl font-bold mt-7 ml-5">
                Nurse
            </div>

            <div className="flex gap-2 mt-8 mb-4 mr-5">
                <button className={applyNavLinkBtnStyle()}>
                    <FaFlag  />
                </button>
                <button className={applyNavLinkBtnStyle()}>
                    <FaCog  />
                </button>
                <button className={applyNavLinkBtnStyle()}>
                    <FaBell />
                </button>
                <button className={applyNavLinkBtnStyle()}>
                    <FaEnvelope />
                </button>
                <button className={applyNavLinkBtnStyle()}>
                    <FaUser />
                </button>
                <button className={applyNavLinkBtnStyle()}>
                    <FaSignOutAlt />
                </button>
            </div>
        </div>
    )
}