/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { FiGrid, FiPlusCircle, FiList, FiFileText } from 'react-icons/fi';

export const PharmacyDashboard = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-[#1A73A3] to-[#50C2B9] text-white p-4">
        <div className="text-2xl font-bold mb-8">Fultang P</div>
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
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
};
