import {AdminNavBar} from "./AdminNavBar.jsx";
import {AdminDashBoard} from "./AdminDashboard.jsx";
import {adminNavLink} from "./adminNavLink.js";

export function AddHospitalRoom()
{
    return (
        <AdminDashBoard linkList={adminNavLink} requiredRole={"Admin"}>
            <AdminNavBar/>
            Exams List
        </AdminDashBoard>
    )
}