/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { FiSettings, FiRefreshCw } from 'react-icons/fi';

export function PharmacyNavbar({ username }) {
    return (
      <div className="flex justify-between items-center p-4 bg-white">
        <h1 className="text-2xl font-bold">Pharmacist</h1>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <FiSettings className="w-6 h-6" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <FiRefreshCw className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <span>{username}</span>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }