import { FiGrid, FiPlusCircle, FiList, FiFileText } from 'react-icons/fi';
import {useAuthentication} from "../Utils/Provider.jsx";
import {Navigate} from "react-router-dom";
import {AccessDenied} from "./AccessDenied.jsx";
import PropTypes from "prop-types";







export const PharmacyDashboard = ({ children }) => {

  PharmacyDashboard .propTypes = {
    children: PropTypes.node.isRequired,
  };

  const {isAuthenticated, hasRole} = useAuthentication();

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (!hasRole('Pharmacist')) {
    return <AccessDenied Role={"Pharmacist"}/>;
  }


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="h-screen w-64 bg-gradient-to-b from-[#1A73A3] to-[#50C2B9] text-white p-4 fixed">
        <div className="text-2xl font-bold mb-8">Fulltang P</div>
        <nav className="space-y-4">
          <button  className="flex items-center gap-2 p-2 rounded hover:bg-white/10">
            <FiGrid />
            <span>Dashboard</span>
          </button>
          <a href="#" className="flex items-center gap-2 p-2 rounded hover:bg-white/10">
            <FiPlusCircle />
            <span>Add Medications</span>
          </a>
          <a href="#" className="flex items-center gap-2 p-2 rounded hover:bg-white/10">
            <FiList />
            <span>List of Medications</span>
          </a>
          <a href="#" className="flex items-center gap-2 p-2 rounded hover:bg-white/10">
            <FiFileText />
            <span>Prescriptions</span>
          </a>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 min-h-screen overflow-x-hidden ml-[256px]">
        {children}
      </div>
    </div>
  );
};
