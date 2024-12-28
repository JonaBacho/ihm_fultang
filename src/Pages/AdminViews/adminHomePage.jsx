import {DashBoard} from "../../GlobalComponents/DashBoard.jsx";
import {adminNavLink} from "./adminNavLink.js";
import {AdminNavBar} from "./AdminNavBar.jsx";
import {AdminDashBoard} from "./AdminDashboard.jsx";

export function AdminHomePage()
{


    return (
        <AdminDashBoard requiredRole={"Admin"} linkList={adminNavLink}>
            <AdminNavBar><h1>Admin Home</h1></AdminNavBar>
        </AdminDashBoard>
    )
}