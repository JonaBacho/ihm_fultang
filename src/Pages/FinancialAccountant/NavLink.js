import { AppRoutesPaths as appRoutes } from "../../Router/appRouterPaths.js";
import {
    FaHome,
    FaFileInvoiceDollar,
    FaFileAlt,
    FaChartBar,
    FaMoneyCheckAlt,
    FaUsers,
    FaWarehouse,
    FaList,
    FaRegFileArchive,
    FaCogs,
    FaBell,
    FaQuestionCircle,
} from "react-icons/fa";

export const NavLink = [
    {
        name: "Dashboard",
        link: appRoutes.financialAccountantHome,
        icon: FaHome,
    },

    {
        name: "Accounting",
        icon: FaFileInvoiceDollar,
        subLinks: [
            {
                name: "Journal Entries",
                link: appRoutes.financialAccountantJournalEntries,
                icon: FaFileInvoiceDollar,
            },
            {
                name: "Invoices",
                link: appRoutes.financialAccountantInvoices,
                icon: FaFileAlt,
            },
            {
                name: "Payments",
                link: appRoutes.financialAccountantPayments,
                icon: FaMoneyCheckAlt,
            },
        ],
    },

    {
        name: "Budget & Reports",
        icon: FaChartBar,
        subLinks: [
            {
                name: "Budgets",
                link: appRoutes.financialAccountantBudgets,
                icon: FaChartBar,
            },
            {
                name: "Reports & Analytics",
                link: appRoutes.financialAccountantReports,
                icon: FaChartBar,
            },
        ],
    },

    {
        name: "Assets & Inventory",
        icon: FaWarehouse,
        subLinks: [
            {
                name: "Fixed Assets",
                link: appRoutes.fixedAssetsPage,
                icon: FaWarehouse,
            },
            {
                name: "Inventory Management",
                link: appRoutes.inventoryPage,
                icon: FaList,
            },
        ],
    },

    {
        name: "Partners",
        icon: FaUsers,
        subLinks: [
            {
                name: "Vendors",
                link: appRoutes.vendorsPage,
                icon: FaUsers,
            },
            {
                name: "Customers",
                link: appRoutes.customersPage,
                icon: FaUsers,
            },
            {
                name: "Claims & Insurance",
                link: appRoutes.claimsInsurancePage,
                icon: FaRegFileArchive,
            },
        ],
    },

    {
        name: "Documents",
        link: appRoutes.documentArchivePage,
        icon: FaRegFileArchive,
    },

    {
        name: "Settings",
        link: appRoutes.settingsPage,
        icon: FaCogs,
    },

    {
        name: "Notifications",
        link: appRoutes.notificationsPage,
        icon: FaBell,
    },

    {
        name: "Help & Support",
        link: appRoutes.helpCenterPage,
        icon: FaQuestionCircle,
    },
];
