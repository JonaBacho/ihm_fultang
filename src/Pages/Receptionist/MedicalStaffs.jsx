import {ReceptionistDashboard} from "./ReceptionistDashboard.jsx";
import {MedicalStaffList} from "../../GlobalComponents/MedicalStaffList.jsx";



export function MedicalStaffs()
{
    return (
       <>
           <ReceptionistDashboard>
              <MedicalStaffList/>
           </ReceptionistDashboard>
       </>
    )
}