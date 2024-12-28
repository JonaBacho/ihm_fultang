import {AdminDashBoard} from "./AdminDashboard.jsx";
import {adminNavLink} from "./adminNavLink.js";
import {AdminNavBar} from "./AdminNavBar.jsx";

export function AdminConsultationList()
{
    return (
        <AdminDashBoard linkList={adminNavLink} requiredRole={"Admin"}>
            <AdminNavBar/>
            Consultation List
        </AdminDashBoard>
    )
}