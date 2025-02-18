import { Users, Stethoscope, Calendar, ClipboardList, Building2, FileText, ShieldCheck, UserCog, Settings, FileSpreadsheet, UserPlus, Hospital } from 'lucide-react';
import {LaboratoryDashBoard} from "./LaboratoryDashBoard.jsx";
import {laboratoryNavLink} from "./LaboratoryNavLink.js";
import {LaboratoryNavBar} from "./LaboratoryNavBar.jsx";
import {useNavigate} from "react-router-dom";
import {AppRoutesPaths as AppRouterPaths} from "../../Router/appRouterPaths.js";


export function LaboratoryHomePage() {


    const navigate = useNavigate();
    


    return (
        <LaboratoryDashBoard linkList={laboratoryNavLink} requiredRole={"Labtech"}>
            <LaboratoryNavBar/>
            <div className="p-6 space-y-6">
                <div className="bg-gradient-to-r from-primary-end to-primary-start rounded-lg p-6 text-white">
                    <h1 className="text-3xl font-bold mb-2">Welcome to the Laboratory dashboard</h1>
                    <p className="opacity-90 font-semibold text-xl">
                        Une descrption a ajouter.
                    </p>
                </div>

            
        
            </div>
        </LaboratoryDashBoard>
    );
}





