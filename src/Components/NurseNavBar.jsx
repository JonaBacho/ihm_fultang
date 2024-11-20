import { FaFlag, FaBell, FaEnvelope, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

export function NurseNavBar()
{
    const applyNavLinkStyle= () => {
        return "text-secondary text-xl hover:text-white"
    }
    const applyNavLinkBtnStyle = () => {
        return " w-12 h-10 border-2 bg-gay-100 flex justify-center items-center rounded-xl shadow-xl hover:bg-secondary "
    }

    return (
        <div className="h-[70px] w-full flex justify-between">

            <div className="text-5xl font-bold mt-7 ml-5">
                Nurse
            </div>

            <div className="flex gap-2 mt-8 mb-4 mr-5">
                <button className={applyNavLinkBtnStyle()}>
                    <FaFlag  className={applyNavLinkStyle()}/>
                </button>
                <button className={applyNavLinkBtnStyle()}>
                    <FaCog className={applyNavLinkStyle()} />
                </button>
                <button className={applyNavLinkBtnStyle()}>
                    <FaBell className={applyNavLinkStyle()}/>
                </button>
                <button className={applyNavLinkBtnStyle()}>
                    <FaEnvelope className={applyNavLinkStyle()}/>
                </button>
                <button className={applyNavLinkBtnStyle()}>
                    <FaUser className={applyNavLinkStyle()}/>
                </button>
                <button className={applyNavLinkBtnStyle()}>
                    <FaSignOutAlt className={applyNavLinkStyle()}/>
                </button>
            </div>
        </div>
    )
}