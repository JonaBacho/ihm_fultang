/* eslint-disable no-unused-vars */
import React from 'react';
import { FiPlusCircle, FiList, FiFileText } from 'react-icons/fi';
//import {Image} from '../assets/image.png';


export function PharmacyOperations  ()  {
  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold">Quick Operations</h3>
      
      <div className="space-y-2">
        <button className="flex items-center gap-2 w-full p-3 bg-white text-#3244BD rounded-lg hover:bg-opacity-90">
          <div className='rounded rounded-full bg-[#3244BD]'>
          <FiPlusCircle className="w-5 h-5" />
          </div>
          
          <span>Add Medicines</span>
        </button>
        
        <button className="flex items-center gap-2 w-full p-3 bg-[#3244BD] text-white rounded-lg hover:bg-opacity-90">
          <FiFileText className="w-5 h-5" />
          <span>Add a New Bill</span>
        </button>
        
        <button className="flex items-center gap-2 w-full p-3 bg-[#3244BD] text-white rounded-lg hover:bg-opacity-90">
          <FiList className="w-5 h-5" />
          <span>List of Bills</span>
        </button>
      </div>

      <div className="mt-8 p-4 bg-gradient-to-r from-primary-start to-primary-end rounded-lg text-white">
        <h3 className="text-xl font-bold">Save, Secured and Efficient Medications</h3>
      </div>
    </div>
  );
};
