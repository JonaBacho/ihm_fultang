import {FaHome , FaUserMd, FaUserNurse, FaQuestionCircle } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import {useEffect} from "react";

export function NurseDashboard() {
    const location = useLocation();
    const activeLink = location.pathname;

    const NavLink = [
        {
            name: 'Home',
            icon: FaHome, // Utilisez directement le composant d'icône
            link: '/nurse',
        },
        {
            name: 'Patients',
            icon: FaUserNurse, // Utilisez directement le composant d'icône
            link: '/nurse/patients',
        },
        {
            name: 'MedicalStaffs',
            icon: FaUserMd,
            link: '/nurse/medicalStaffs',
        },
        {
            name: 'Help Center',
            icon: FaQuestionCircle,
            link: 'help-center',
        }
    ];


    useEffect(() => {
        console.log(activeLink);
        console.log(activeLink.startsWith('/nurse'));
    })

    return (
        <div className="bg-gradient-to-t from-primary-start to-primary-end h-screen flex flex-col">
            <h1 className="text-3xl font-bold ml-6 mb-10 mt-7">
                Fulltang Clinic
            </h1>

            <nav className="flex flex-col">
                {NavLink.map((item, index) => {
                    const IconComponent = item.icon;
                    const isActive = activeLink.startsWith(item.link);
                   // console.log(isActive);
                    return (
                        <Link
                            key={index}
                            className={isActive ? "flex p-2 ml-8 bg-white rounded-l-full" :"flex p-2 mt-2 ml-8 hover:bg-white/10 hover:rounded-l-full" }
                            to={item.link}
                        >
                            <IconComponent className={isActive ? "text-black text-xl mr-3" : "text-xl mr-3 text-white"}/>
                            <p className={isActive ? "text-black  font-bold text-md " : "text-md font-bold text-white"}>{item.name}</p>
                        </Link>
                    )
                })}
            </nav>
        </div>
    )
}