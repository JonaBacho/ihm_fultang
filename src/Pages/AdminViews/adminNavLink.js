import {FaFileInvoiceDollar, FaHome, FaNotesMedical, FaPlus, FaUser, FaUserMd, FaUsers} from "react-icons/fa";
import {AppRoutesPaths as appRoutes} from "../../Router/appRouterPaths.js";
import {Calendar} from "lucide-react";
import {FiList} from "react-icons/fi";
import {GiMedicines} from "react-icons/gi";


export const adminNavLink = [
    {
        name: "Home",
        link: appRoutes.adminHomePage,
        icon: FaHome,
    },
    {
        name: 'Patient List',
        icon: FaUsers,
        link: appRoutes.adminPatientListPage,
    },
    {
        name: "Medical Staffs",
        icon: FaUserMd,
        subLinks: [
            {
                icon: FaUsers,
                name: "Medical Staff List",
                link: appRoutes.adminMedicalStaffListPage
            },
            {
                icon: FaPlus,
                name: "Add A Medical Staff",
                link: appRoutes.addMedicalStaff
            }
        ]
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

];