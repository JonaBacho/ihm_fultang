import { MdPending } from "react-icons/md";
import { AiOutlineFileExclamation } from "react-icons/ai";
import { HiOutlineDocumentReport } from "react-icons/hi";
import {AppRoutesPaths as appRoutes} from "../../Router/appRouterPaths.js";

export const cashierNavLink =
[
    {
        name: 'Consultations List',
        icon: MdPending,
        link: appRoutes.cashierPage,
    },

    {
        name: 'Exams List',
        icon: AiOutlineFileExclamation,
        link: appRoutes.examsList,
    },
    {
        name: 'Financial Report',
        icon: HiOutlineDocumentReport,
        link: appRoutes.financialReport,
    }

]