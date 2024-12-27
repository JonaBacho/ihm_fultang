import { FaClipboardList, FaHistory, FaSignOutAlt } from "react-icons/fa";
import {AppRoutesPaths as appRoutes} from "../../Router/appRouterPaths.js";

export const laboratoryNavLink = [
    {
        name: 'Examens en cours',
        icon: FaClipboardList,
        link: appRoutes.laboratorycurrent,
        description: 'Voir et gérer les examens en cours'
    },
    {
        name: 'Historique',
        icon: FaHistory,
        link: appRoutes.laboratoryHistory ,
        description: 'Consulter l\'historique des examens'
    },
    // {
    //     name: 'Déconnexion',
    //     icon: FaSignOutAlt,
    //     link: appRoutes.logout || '/logout',
    //     description: 'Se déconnecter de l\'application'
    // }
];