import {FaFileInvoiceDollar, FaHome, FaNotesMedical, FaPlus,FaUserMd, FaUsers} from "react-icons/fa";
import {AppRoutesPaths as appRoutes} from "../../Router/appRouterPaths.js";
import {Bed, BedDouble, Calendar} from "lucide-react";
import {FiList} from "react-icons/fi";
import {GiMedicines} from "react-icons/gi";


export const adminNavLink = [
    {
        name: "Dashboard",
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
        link: appRoutes.adminConsultationListPage,
    },
   /* {
        name: 'Appointments',
        icon: Calendar,
        link: appRoutes.adminAppointmentsListPage,
    },
    {
        name: 'Exams',
        icon: FaNotesMedical,
        link: appRoutes.adminExamsListPage,
    },
    {
        name: 'Medicine',
        icon: GiMedicines,
        link: appRoutes.nursePage,
    },
    {
        name: 'Financial Report',
        icon: FaFileInvoiceDollar,
        link: appRoutes.adminFinancialReportsPage,
    },*/
    {
        name: 'Hospital Rooms',
        icon: BedDouble,
        link: appRoutes.adminHospitalRoomPage
    },
];