import {cashierNavLink} from './cashierNavLink.js'
import {CashierNavBar} from './CashierNavBar.jsx'
import {DashBoard} from "../../GlobalComponents/DashBoard.jsx";
import userIcon from "../../assets/userIcon.png"
import {useAuthentication} from "../../Utils/Provider.jsx";
import {FaArrowLeft, FaArrowRight,FaSearch} from "react-icons/fa";
import {Tooltip} from "antd";
import {Exams} from './Exams.jsx'


export function ExamsList()
{
    const {userData} = useAuthentication();

    const exams = [
        { id: 1, examName: "Hémogramme", examCost: 5000, examDescription: "Analyse du sang", statut: "Non payé" },
        { id: 2, examName: "Radiographie", examCost: 10000, examDescription: "Radiographie des poumons", statut: "Payé" },
        { id: 3, examName: "IRM", examCost: 50000, examDescription: "Imagerie par résonance magnétique", statut: "Non payé" },
        { id: 4, examName: "Echographie", examCost: 15000, examDescription: "Echographie abdominale", statut: "Payé" },
        { id: 5, examName: "Test COVID", examCost: 2500, examDescription: "Test rapide", statut: "Non payé" },
      ];

    return(
        <DashBoard linkList={cashierNavLink} requiredRole={"Cashier"}>
            <CashierNavBar> 
                <div className="flex flex-col">
                    {/*Search bar content */}
                    <div className="flex justify-between mt-3">
                        <div className="flex flex-col ml-5">
                            
                        </div>
                        <div className="flex mr-5">
                            <div className="flex w-[300px] h-10 border-2 border-secondary rounded-lg">
                                <FaSearch className="text-xl text-secondary m-2"/>
                                <input
                                    type="text"
                                    className="border-none focus:outline-none focus:ring-0"
                                />
                            </div>
                            <button className="ml-2 w-20 h-10 text-white bg-secondary rounded-lg">
                                Search
                            </button>
                        </div>
                    </div>

                    {/*List of exams*/}
                    <div className="ml-5 mr-5 mt-2 border-2 h-[620px] rounded-lg shadow-lg  p-2">
                        <Exams exams={exams}/>
                    </div>
                </div>
            </CashierNavBar>
            
        </DashBoard>
    )
}