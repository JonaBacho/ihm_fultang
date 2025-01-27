import {FaFileInvoiceDollar, FaHome, FaNotesMedical, FaPlus,FaUserMd, FaUsers} from "react-icons/fa";
import {AppRoutesPaths as appRoutes} from "../../../Router/appRouterPaths.js";
import {Bed, BedDouble, Calendar} from "lucide-react";
import {FiList} from "react-icons/fi";
import {GiMedicines} from "react-icons/gi";


export const doctorNavBar = [
    {
        name: "Dashboard",
        link: appRoutes.doctorHomePage,
        icon: FaHome,
    },
    {
        name: 'Patient List',
        icon: FaUsers,
        link: appRoutes.doctorPatientListPage,
    },
    {
        name: 'Appointments',
        icon: Calendar,
        link: appRoutes.adminAppointmentsListPage,
    },
    {
        name: 'Consultation',
        icon: FiList,
        subLinks: [
            {
                icon: FiList,
                name: "Consultation List",
                link: appRoutes.doctorConsultationListPage
            },
            {
                icon: FaPlus,
                name: "Add A Consultation",
                link: appRoutes.doctorAddConsultationPage
            }
        ]
    },
    {
        name: 'Exams',
        icon: FaNotesMedical,
        link: appRoutes.adminExamsListPage,
    },
    
];