import { Users, Stethoscope, Calendar, ClipboardList, Building2, FileText, ShieldCheck, UserCog, Settings, FileSpreadsheet, UserPlus, Hospital } from 'lucide-react';

import {useNavigate} from "react-router-dom";
import {AppRoutesPaths as AppRouterPaths} from "../../Router/appRouterPaths.js";
import PropTypes from "prop-types";
import {DoctorDashboard} from "./DoctorComponents/DoctorDashboard.jsx";
import {DoctorNavBar} from "./DoctorComponents/DoctorNavBar.jsx";
import {doctorNavLink} from "./DoctorComponents/doctorNavLink.js";


export function DoctorHomePage() {


    const navigate = useNavigate();

    const stats = {
        patients: 5,
        medicalStaff: 6,
        consultations: 0,
        appointments: 0,
        scheduledExams: 0,
        totalRooms: 12
    };


    return (
        <DoctorDashboard linkList={doctorNavLink} requiredRole={"Doctor"}>
            <DoctorNavBar/>
            <div className="p-6 space-y-6">
                <div className="bg-gradient-to-r from-primary-end to-primary-start rounded-lg p-6 text-white">
                    <h1 className="text-3xl font-bold mb-2">Welcome to the Doctor dashboard</h1>
                    <p className="opacity-90 font-semibold text-xl">
                        Manage your clinic efficiently and monitor all activities from this interface
                        centralized.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <StatCard
                        icon={Users}
                        title="Patients"
                        value={stats?.patients}
                        description="Registered patients"
                        color="bg-blue-500"
                    />
                    <StatCard
                        icon={ClipboardList}
                        title="Consultations"
                        value={stats?.consultations}
                        description="Consultations this month"
                        color="bg-purple-500"
                    />
                    <StatCard
                        icon={Calendar}
                        title="Appointements"
                        value={stats.appointments}
                        description="Scheduled appointments"
                        color="bg-orange-500"
                    />
                    <StatCard
                        icon={FileText}
                        title="Exams"
                        value={stats?.scheduledExams}
                        description="Scheduled exams"
                        color="bg-red-500"
                    />
                
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Access</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <QuickActionButton
                            icon={UserPlus}
                            label="Manage Patient"
                            onClick={() => navigate(AppRouterPaths.doctorPatientListPage)}
                        />
                    
                        <QuickActionButton
                            icon={Calendar}
                            label="View Appointments List"
                            onClick={() => navigate(AppRouterPaths.doctorAppointmentsListPage)}
                        />
                    
                        <QuickActionButton
                            icon={FileSpreadsheet}
                            label="View Consultations List"
                            onClick={() => navigate(AppRouterPaths.doctorConsultationsListPage)}
                        />
                    
        
                    </div>
                </div>
            </div>
        </DoctorDashboard>
    );
}


function StatCard({icon: Icon, title, value, description, color}) {

    StatCard.propTypes = {
        icon: PropTypes.element.isRequired,
        title: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        color: PropTypes.string
    }

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 flex items-start gap-4">
            <div className={`${color} rounded-full p-3 text-white`}>
                <Icon className="w-6 h-6"/>
            </div>
            <div>
                <h3 className="font-semibold text-gray-800">{title}</h3>
                <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
        </div>
    );
}


function QuickActionButton({icon: Icon, label, onClick}) {

    QuickActionButton.propTypes = {
        icon: PropTypes.element.isRequired,
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
    }
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center gap-2 p-4  rounded-lg border border-gray-200 hover:border-2 hover:border-primary-end hover:bg-gray-100 transition-all duration-300"
        >
            <Icon className="w-6 h-6 text-primary-end"/>
            <span className="text-md text-gray-600 font-bold text-center">{label}</span>
        </button>
    );
}

