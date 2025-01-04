import {AdminDashBoard} from "./AdminDashboard.jsx";
import {adminNavLink} from "./adminNavLink.js";
import {AdminNavBar} from "./AdminNavBar.jsx";

export function AdminFinancialReports()
{
    return (
        <AdminDashBoard linkList={adminNavLink} requiredRole={"Admin"}>
            <AdminNavBar/>
            Financial Reports
        </AdminDashBoard>
    )
}