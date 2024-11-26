import PropTypes from 'prop-types';
import {FaHome , FaUserMd, FaQuestionCircle } from 'react-icons/fa';
import {Link, Navigate, useLocation} from 'react-router-dom';
import {AppRoutesPaths as appRoutes} from "../Router/appRouterPaths.js";
import {useAuthentication} from "../Utils/Provider.jsx";
import {AccessDenied} from "./AccessDenied.jsx";





export function NurseDashboard({children}) {


    NurseDashboard.propTypes = {
        children: PropTypes.node.isRequired,
    };

    const location = useLocation();
    const activeLink = location.pathname;

    const {isAuthenticated, hasRole} = useAuthentication();
    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }

    if (!hasRole('Nurse')) {
        return <AccessDenied Role={"Nurse"}/>;
    }


    const NavLink = [
        {
            name: 'Patients',
            icon: FaHome,
            link: appRoutes.nursePage,
        },
        {
            name: 'Medical Staffs',
            icon: FaUserMd,
            link: appRoutes.medicalStaffsPage,
        },
        /*
        {
            name: 'Consultation History',
            icon: FaUserNurse,
            link: appRoutes.consultationHistoryPage,
        },
         */
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
                    Fulltang Clinic
                </h1>
                <nav className="flex flex-col">
                    {NavLink.map((item, index) => {
                        const IconComponent = item.icon;
                        const isActive = activeLink.startsWith(item.link);
                        return (
                            <Link
                                key={index}
                                className={isActive ? "flex p-4 ml-8 bg-white rounded-l-full" : "flex p-4 mt-2 ml-8 hover:bg-white/10 hover:rounded-l-full"}
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


