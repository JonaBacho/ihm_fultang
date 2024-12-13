import {NurseDashboard} from "./NurseDashboard.jsx";
import {NurseNavBar} from "./NurseNavBar.jsx";
import {MedicalStaffList} from "../../GlobalComponents/MedicalStaffList.jsx";


export function MedicalStaffs()
{
    return (
       <>
           <NurseDashboard>
               <NurseNavBar>
                   <MedicalStaffList/>
               </NurseNavBar>
           </NurseDashboard>
       </>
    )
}