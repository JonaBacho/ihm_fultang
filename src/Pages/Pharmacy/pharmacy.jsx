/* eslint-disable no-unused-vars */
import React from 'react';
import { PharmacyDashboard } from '../../Components/PharmacyDashboard';
import { PharmacyNavbar } from '../../Components/PharmacyNavBar';
import { PharmacyFilter } from '../../Components/PharmacyFilter';
import { PharmacyBoard } from '../../Components/PharmacyBoard';
import { PharmacyOperations } from '../../Components/PharmacyOperations';

export  function Pharmacy() {

  return (
    <>
    <PharmacyDashboard>
      <div className="h-full flex flex-col">
        <PharmacyNavbar username="Username.N" />
        <div className="flex-1 flex">
          <div className="flex-1 p-4 space-y-4">
            <PharmacyFilter />
            <PharmacyBoard />
          </div>
          <div className="w-80 border-l">
            <PharmacyOperations />
          </div>
        </div>
      </div>
    </PharmacyDashboard>
    </>
    
  );
}