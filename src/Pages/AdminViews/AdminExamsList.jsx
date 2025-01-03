import {AdminDashBoard} from "./AdminDashboard.jsx";
import {adminNavLink} from "./adminNavLink.js";
import {AdminNavBar} from "./AdminNavBar.jsx";

export function AdminExamsList()
{
    return(
        <AdminDashBoard linkList={adminNavLink} requiredRole={"Admin"}>
            <AdminNavBar/>
            Exam List
        </AdminDashBoard>
    )
}