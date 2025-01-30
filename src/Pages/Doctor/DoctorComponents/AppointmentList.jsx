import {doctorNavLink} from "../New/doctorNavLink.js";
import {DoctorDashboard} from "../New/DoctorDashboard.jsx";

export function AppointmentList()
{
    return(
            <DoctorDashboard linkList={doctorNavLink} requiredRole="Doctor">
            </DoctorDashboard>
    )
}