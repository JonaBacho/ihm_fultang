import {AdminDashboard} from "./AdminDashboard.jsx";
import {DashBoard} from "../../GlobalComponents/DashBoard.jsx";
import {adminNavLink} from "./adminNavLink.js";

export function AdminHomePage()
{


    return (
        <DashBoard requiredRole={"Admin"} linkList={adminNavLink}>
            Admin Home
        </DashBoard>
    )
}