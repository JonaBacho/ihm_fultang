import { AppRoutesPaths as appRoutes } from "../../Router/appRouterPaths";
import { FaHome, FaWallet } from "react-icons/fa";
export const AccountantNavLink = [
  {
    name: "Dashboard",
    link: appRoutes.accountantPage,
    icon: FaHome,
  },

  {
    name: "Account",
    link: appRoutes.accountantPage,
    icon: FaWallet,
  },
];
