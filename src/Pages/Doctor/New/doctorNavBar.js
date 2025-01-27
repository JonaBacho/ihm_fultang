import {FaFileInvoiceDollar, FaHome, FaNotesMedical, FaPlus,FaUserMd, FaUsers} from "react-icons/fa";
import {AppRoutesPaths as appRoutes} from "../../../Router/appRouterPaths.js";
import {Bed, BedDouble, Calendar} from "lucide-react";
import {FiList} from "react-icons/fi";
import {GiMedicines} from "react-icons/gi";


export const doctorNavBar = [
    {
        name: "Dashboard",
        link: appRoutes.doctorPage,
        icon: FaHome,
    },
    {
        name: 'Patient List',
        icon: FaUsers,
        link: appRoutes.doctorPatientList,
    },
    {
        name: 'Appointments',
        icon: Calendar,
        link: appRoutes.doctorAppointement,
    },
    {
        name: 'Consultation',
        icon: FiList,
        subLinks: [
            {
                icon: FiList,
                name: "Consultation List",
                link: appRoutes.doctorConsultationList
            },
            {
                icon: FaPlus,
                name: "Add A Consultation",
                link: appRoutes.doctorAddConsultation
            }
        ]
    },
    {
        name: 'Exams',
        icon: FaNotesMedical,
        link: appRoutes.adminExamsListPage,
    },
    
];