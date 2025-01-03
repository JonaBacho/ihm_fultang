import {AdminDashBoard} from "./AdminDashboard.jsx";
import {adminNavLink} from "./adminNavLink.js";
import {AdminNavBar} from "./AdminNavBar.jsx";

export function AdminAppointmentsList()
{
    return(
        <AdminDashBoard linkList={adminNavLink} requiredRole={"Admin"}>
            <AdminNavBar/>
            Appointments List
        </AdminDashBoard>
    )
}