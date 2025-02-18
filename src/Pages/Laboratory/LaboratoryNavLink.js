import {FaClipboardList, FaHistory, FaHome} from "react-icons/fa";
import {AppRoutesPaths as appRoutes} from "../../Router/appRouterPaths.js";
import {FiList} from "react-icons/fi";

export const laboratoryNavLink = [

    {
        name: "Dashboard",
        link: appRoutes.laboratoryAssistantPage,
        icon: FaHome,
    },
    {
        name: "Patient list",
        link: appRoutes.laboratoryPatientList,
        icon: FaHome,
    },
    {
        name: 'Exams',
        icon: FiList,
        subLinks: [
            {
                icon: FiList,
                name: "Exams List",
                link: appRoutes.laboratoryExamenList
            },
            {
                icon: FaHistory,
                name: "Exams History",
                link: appRoutes.laboratoryExamenHistories
            },
            /*  {
                  icon: FaPlus,
                  name: "Add A Consultation",
                  link: appRoutes.doctorAddConsultation
              }*/
        ]
    },
    {
        name: 'Examens en cours',
        icon: FaClipboardList,
        link: appRoutes.laboratoryCurrent,
        description: 'Voir et gérer les examens en cours'
    },
    {
        name: 'Historique',
        icon: FaHistory,
        link: appRoutes.laboratoryHistory ,
        description: 'Consulter l\'historique des examens'
    },
    
    
];