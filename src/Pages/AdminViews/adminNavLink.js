import {FaFileInvoiceDollar, FaHome, FaNotesMedical, FaUser, FaUserMd, FaUsers} from "react-icons/fa";
import {AppRoutesPaths as appRoutes} from "../../Router/appRouterPaths.js";
import {Calendar} from "lucide-react";
import {FiList} from "react-icons/fi";
import {GiMedicines} from "react-icons/gi";

export const adminNavLink = [
    {
        name: 'Home',
        icon: FaHome,
        link: appRoutes.adminHomePage,
    },
    {
        name: 'Patients',
        icon: FaUser,
        link: appRoutes.nursePage,
    },
    {
        name: 'Consultation List',
        icon: FiList,
        link: appRoutes.nursePage,
    },
    {
        name: 'Appointments',
        icon: Calendar,
        link: appRoutes.nursePage,
    },
    {
        name: 'Medical Staff',
        icon: FaUserMd,
        link: appRoutes.nursePage,
    },
    {
        name: 'Exams',
        icon: FaNotesMedical,
        link: appRoutes.nursePage,
    },
    {
        name: 'Medicine',
        icon: GiMedicines,
        link: appRoutes.nursePage,
    },
    {
        name: 'Financial Report',
        icon: FaFileInvoiceDollar,
        link: appRoutes.nursePage,
    }
]