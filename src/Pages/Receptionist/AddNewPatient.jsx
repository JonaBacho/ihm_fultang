import {ReceptionistDashboard} from "./ReceptionistDashboard.jsx";
import {ReceptionistNavBar} from "./ReceptionistNavBar.jsx";

export function AddNewPatient()
{
    return(
        <>
            <ReceptionistDashboard>
                <ReceptionistNavBar/>
                <div className="flex flex-col">
                    <p className="font-bold  text-xl ml-8 mt-2">Add A New Patient</p>



                </div>

            </ReceptionistDashboard>
        </>
    )
}