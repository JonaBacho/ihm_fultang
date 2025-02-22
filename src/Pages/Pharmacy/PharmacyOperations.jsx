/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FiPlusCircle, FiList, FiFileText, FiX } from 'react-icons/fi';
import axiosInstance from '../../Utils/axiosInstance.js';

function AddMedicineModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    price: '',
    status: 'Valid',
    expiryDate: '',
    description: ''
  });
  
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await axiosInstance.post('/medicament/', formData);
      if (response.status === 201) {
        onClose();
        // Vous pouvez ajouter ici une notification de succès
      }
    } catch (error) {
      setError('Failed to add medicine. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <FiX className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-4">Add New Medicine</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-end focus:ring-primary-end"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-end focus:ring-primary-end"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-end focus:ring-primary-end"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-end focus:ring-primary-end"
            >
              <option value="Valid">Valid</option>
              <option value="Expired">Expired</option>
              <option value="OutOfStock">Out of Stock</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-end focus:ring-primary-end"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-end focus:ring-primary-end"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-primary-start to-primary-end text-white py-2 px-4 rounded-md hover:opacity-90 disabled:opacity-50"
          >
            {isSubmitting ? 'Adding...' : 'Add Medicine'}
          </button>
        </form>
      </div>
    </div>
  );
}

export function PharmacyOperations() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="p-6 space-y-4">
      <h3 className="text-xl font-medium text-gray-900">Quick Operations</h3>
      
      <div className="space-y-3">
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-3 w-full p-4 bg-white shadow-sm hover:shadow-md rounded-xl transition-shadow"
        >
          <div className="p-2 rounded-full bg-[#3244BD] text-white">
            <FiPlusCircle className="w-5 h-5" />
          </div>
          <span className="text-[#3244BD]">Add Medicines</span>
        </button>

        <button className="flex items-center gap-3 w-full p-4 bg-white shadow-sm hover:shadow-md rounded-xl transition-shadow">
          <div className="p-2 rounded-full bg-[#3244BD] text-white">
            <FiFileText className="w-5 h-5" />
          </div>
          <span className="text-[#3244BD]">Add a New Bill</span>
        </button>

        <button className="flex items-center gap-3 w-full p-4 bg-white shadow-sm hover:shadow-md rounded-xl transition-shadow">
          <div className="p-2 rounded-full bg-[#3244BD] text-white">
            <FiList className="w-5 h-5" />
          </div>
          <span className="text-[#3244BD]">List of Bills</span>
        </button>
      </div>

      <AddMedicineModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      
      <div className="mt-8 p-4 bg-gradient-to-r from-primary-start to-primary-end rounded-lg text-white">
        <h3 className="text-xl font-bold">Save, Secured and Efficient Medications</h3>
        <img 
          src="/doctorimage.png" 
          alt="doctor" 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default PharmacyOperations;