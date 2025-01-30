import {DoctorDashboard} from "../New/DoctorDashboard.jsx";
import {doctorNavLink} from "../New/doctorNavLink.js";

export function ConsultationHistory()
{
    return(
        <DoctorDashboard linkList={doctorNavLink} requiredRole={"Doctor"}>

        </DoctorDashboard>
    )
}