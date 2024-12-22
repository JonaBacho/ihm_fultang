import {DashBoard} from "../../GlobalComponents/DashBoard.jsx";
import {laboratoryNavLink} from "./LaboratoryNavLink.js"
import {LaboratoryNavBar} from "./LaboratoryNavBar.jsx"


export function LaboratoryAssistant() {
    return (
        <DashBoard  linkList={laboratoryNavLink} requiredRole={"Labtech"}>
            <LaboratoryNavBar>
                

            </LaboratoryNavBar>
        </DashBoard>
    );
}