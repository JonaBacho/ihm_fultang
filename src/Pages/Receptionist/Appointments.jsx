import {DashBoard} from "../../GlobalComponents/DashBoard.jsx";
import {receptionistNavLink} from "./receptionistNavLink.js";
import {ReceptionistNavBar} from "./ReceptionistNavBar.jsx";

export function Appointments() {
    return (
        <DashBoard requiredRole={"Receptionist"} linkList={receptionistNavLink}>
            <ReceptionistNavBar/>
            Appointment
        </DashBoard>
    )
}