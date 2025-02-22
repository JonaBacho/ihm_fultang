/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../Utils/axiosInstance.js';
import Loader from '../../GlobalComponents/Loader.jsx';
import ServerErrorPage from '../../GlobalComponents/ServerError.jsx';

export function PharmacyBoard() {
  const [medicines, setMedicines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadMedicines() {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get('/medicament/');
        if (response.status === 200) {
          setMedicines(response.data);
          setErrorMessage("");
          setErrorStatus(null);
        }
      } catch (error) {
        setErrorMessage("Something went wrong when retrieving medicines, please retry later!");
        setErrorStatus(error.status);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadMedicines();
  }, []);

  if (isLoading) {
    return (
      <div className="h-[500px] w-full flex justify-center items-center">
        <Loader size={"medium"} color={"primary-end"}/>
      </div>
    );
  }

  if (errorStatus) {
    return <ServerErrorPage errorStatus={errorStatus} message={errorMessage}/>;
  }

  return (
    <div className="overflow-x-auto rounded-lg">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-[#1A73A3] to-[#50C2B9] text-white">
          <tr>
            <th className="p-3 text-left">No.</th>
            <th className="p-3 text-left">Medicines Name</th>
            <th className="p-3 text-left">Quantity</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Expiration Date</th>
            <th className="p-3 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine, index) => (
            <tr key={medicine.id} className={index % 2 === 0 ? 'bg-[#F4F6FF]' : 'bg-white'}>
              <td className="p-3">{medicine.id}</td>
              <td className="p-3">{medicine.name}</td>
              <td className="p-3">{medicine.quantity}</td>
              <td className="p-3">{medicine.price}</td>
              <td className="p-3">
                <span className="px-3 py-1 rounded-full bg-[#0CA73F] text-white text-sm">
                  {medicine.status}
                </span>
              </td>
              <td className="p-3">{new Date(medicine.expiryDate).toLocaleDateString()}</td>
              <td className="p-3">{medicine.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}