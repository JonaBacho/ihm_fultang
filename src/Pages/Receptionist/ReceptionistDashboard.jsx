import PropTypes from 'prop-types';
import {FaUserMd, FaQuestionCircle } from 'react-icons/fa';
import {Link, Navigate, useLocation} from 'react-router-dom';
import {AppRoutesPaths as appRoutes} from "../../Router/appRouterPaths.js";
import {useAuthentication} from "../../Utils/Provider.jsx";
import {AccessDenied} from "../../GlobalComponents/AccessDenied.jsx";



import { Users, UserPlus, Calendar} from 'lucide-react'





export function ReceptionistDashboard({children}) {


    ReceptionistDashboard.propTypes = {
        children: PropTypes.node.isRequired,
    };

    const location = useLocation();
    const activeLink = location.pathname;

    const {isAuthenticated, hasRole} = useAuthentication();

    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }

    if (!hasRole('Receptionist')) {
        return <AccessDenied Role={"Receptionist"}/>;
    }
    const NavLink = [
        {
            name: 'Patient List',
            icon: Users,
            link: appRoutes.receptionistPage,
        },

        /*{
            name: 'Add a Patient',
            icon: UserPlus,
            link: appRoutes.addNewPatientPage,
        },*/
        {
            name: 'Medical Staffs',
            icon: Calendar,
            link: appRoutes.receptionistMedicalStaffsPage,
        },
        {
            name: 'Appointments',
            icon: FaUserMd,
            link: appRoutes.nurseMedicalStaffsPage,
        },
        {
            name: 'Help Center',
            icon: FaQuestionCircle,
            link: appRoutes.helpCenterPage,
        }
    ];



    return (
        <div className="flex  h-screen">
            <div className="w-1/6 fixed h-screen bg-gradient-to-t from-primary-start to-primary-end  flex flex-col">
                <h1 className="text-3xl font-bold ml-6 mb-10 mt-7">
                    Fultang Clinic
                </h1>
                <nav className="flex flex-col">
                    {NavLink.map((item, index) => {
                        const IconComponent = item.icon;
                        const isActive = activeLink.startsWith(item.link);
                        return (
                            <Link
                                key={index}
                                className={`transition-all duration-400 flex p-4  ml-8 ${isActive ? "mt-1.5 bg-white rounded-l-full" : " mt-2 hover:bg-white/20 hover:p-3.5 hover:rounded-l-full"}`}
                                to={item.link}
                            >
                                <IconComponent className={isActive ? "text-black text-xl mr-3" : "text-xl mr-3 text-white"}/>
                                <p className={isActive ? "text-black  font-bold text-md " : "text-md font-bold text-white"}>{item.name}</p>
                            </Link>
                        )
                    })}
                </nav>
            </div>
            <div className="flex-1 min-h-screen overflow-x-hidden ml-[16.7%]">
                {children}
            </div>

        </div>

    )
}


