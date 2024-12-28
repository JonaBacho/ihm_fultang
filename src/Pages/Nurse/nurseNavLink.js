import {FaHome, FaQuestionCircle, FaUserMd} from "react-icons/fa";
import {AppRoutesPaths as appRoutes} from "../../Router/appRouterPaths.js";


export const nurseNavLink =
[
    {
        name: 'Patients',
        icon: FaHome,
        link: appRoutes.nursePage,
    },
    {
        name: 'Medical Staffs',
        icon: FaUserMd,
        link: appRoutes.nurseMedicalStaffsPage,
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
]