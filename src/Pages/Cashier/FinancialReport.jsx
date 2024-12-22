import {cashierNavLink} from './cashierNavLink.js'
import {CashierNavBar} from './CashierNavBar.jsx'
import {DashBoard} from "../../GlobalComponents/DashBoard.jsx";
import userIcon from "../../assets/userIcon.png"
import {useAuthentication} from "../../Utils/Provider.jsx";
import {Tooltip} from "antd";
import {StatisticsReport} from './StatisticsReport.jsx'


export function FinancialReport()
{
    const {userData} = useAuthentication();

    const annualStats = {
        consultations: 1200,
        exams: 450,
        medications: 3000,
        revenue: 5000000,
    };

    const monthlyStats = [
        { month: "Janvier", consultations: 100, exams: 40, medications: 250, revenue: 400000 },
        { month: "Février", consultations: 120, exams: 50, medications: 300, revenue: 450000 },
        
    ];

    const dailyStats = [
        { date: "2024-12-01", consultations: 10, exams: 5, medications: 20, revenue: 30000 },
        { date: "2024-12-02", consultations: 15, exams: 8, medications: 25, revenue: 40000 },
        
    ];
    return(
        <DashBoard linkList={cashierNavLink} requiredRole={"Cashier"}>
            <CashierNavBar> 
                
                <StatisticsReport
                        annualStats={annualStats}
                        monthlyStats={monthlyStats}
                        dailyStats={dailyStats}
                />
            </CashierNavBar>
            
        </DashBoard>
    )
}