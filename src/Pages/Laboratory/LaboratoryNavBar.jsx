import { FaBell, FaEnvelope, FaUser, FaCog, FaSignOutAlt, FaSearch } from 'react-icons/fa';
import { useAuthentication } from "../../Utils/Provider.jsx";
import { Tooltip } from "antd";
import PropTypes from "prop-types";
import { useState } from 'react';
import { CurrentExams } from './CurrentExams.jsx';
import { ExamHistory } from './ExamsHistory.jsx';

export function LaboratoryNavBar({ children }) {
    const [showCurrentExams, setShowCurrentExams] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const { logout, userData } = useAuthentication();

    const applyNavLinkBtnStyle = () => {
        return "w-12 h-10 border-2 bg-gray-100 flex justify-center items-center rounded-xl shadow-xl hover:bg-secondary text-secondary text-xl hover:text-white transition-all duration-300";
    };

    const applyMainButtonStyle = () => {
        return "px-6 py-3 bg-primary-end text-white rounded-lg shadow-lg hover:bg-primary-start transition-all duration-300 mr-4";
    };

    return (
        <div className="flex flex-col w-full">
            {/* Top Navigation Bar */}
            <div className="w-full h-20 flex justify-between items-center px-10 border-b-2">
                {/* Welcome Message */}
                <div className="flex items-center">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Bienvenue, {userData?.name || 'Laborantin'}
                    </h2>
                </div>

                {/* Right Side Icons */}
                <div className="flex items-center space-x-4">
                    <Tooltip title="Notifications">
                        <button className={applyNavLinkBtnStyle()}>
                            <FaBell/>
                        </button>
                    </Tooltip>
                    <Tooltip title="Messages">
                        <button className={applyNavLinkBtnStyle()}>
                            <FaEnvelope/>
                        </button>
                    </Tooltip>
                    <Tooltip title="Profile">
                        <button className={applyNavLinkBtnStyle()}>
                            <FaUser/>
                        </button>
                    </Tooltip>
                    <Tooltip title="Settings">
                        <button className={applyNavLinkBtnStyle()}>
                            <FaCog/>
                        </button>
                    </Tooltip>
                    <Tooltip title="Logout">
                        <button onClick={logout} className={applyNavLinkBtnStyle()}>
                            <FaSignOutAlt/>
                        </button>
                    </Tooltip>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="p-8">
                {/* Welcome Message */}
                <div className="mb-8 bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">Bienvenue au Laboratoire</h2>
                    <p className="text-gray-600">
                        Ici, vous pouvez consulter la liste des examens en cours, modifier les examens et accéder à l'historique complet.
                        Utilisez la barre de recherche ci-dessous pour trouver rapidement un examen spécifique.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Rechercher un examen..."
                            className="w-full px-4 py-3 pl-12 pr-4 text-gray-700 bg-white border rounded-lg focus:border-primary-end focus:outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mb-8 flex">
                    <button
                        onClick={() => {
                            setShowCurrentExams(true);
                            setShowHistory(false);
                        }}
                        className={applyMainButtonStyle()}
                    >
                        Examens en cours
                    </button>
                    <button
                        onClick={() => {
                            setShowHistory(true);
                            setShowCurrentExams(false);
                        }}
                        className={applyMainButtonStyle()}
                    >
                        Historique des examens
                    </button>
                </div>

                {/* Conditional Components */}
                {showCurrentExams && <CurrentExams searchQuery={searchQuery} />}
                {showHistory && <ExamHistory searchQuery={searchQuery} />}

                {/* Children Content */}
                <div className="mt-8">
                    {children}
                </div>
            </div>
        </div>
    );
}

LaboratoryNavBar.propTypes = {
    children: PropTypes.node
};