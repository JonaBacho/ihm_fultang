// CHEMIN : src/Pages/AccountantNew/Comptabilité de Base/AccountModal.jsx

import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { ohadaClasses } from "./PlanComptable.jsx";

export function AccountModal({ account, onClose, onSave }) {
    const [formData, setFormData] = useState({
        code: "",
        label: "",
        class: "",
        type: "",
        isActive: true
    });

    useEffect(() => {
        if (account) {
            setFormData({
                code: account.code || "",
                label: account.label || "",
                class: account.class || "",
                type: account.type || "",
                isActive: account.isActive ?? true
            });
        } else {
            setFormData({ code: "", label: "", class: "", type: "", isActive: true });
        }
    }, [account]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = () => {
        if (!formData.code || !formData.label || !formData.class || !formData.type) {
            alert("Veuillez remplir tous les champs obligatoires.");
            return;
        }
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">
                    {account ? "Modifier le compte" : "Nouveau compte"}
                </h2>
                <div className="space-y-4">
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Classe</label>
                        <select name="class" value={formData.class} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-end">
                            <option value="">Sélectionner une classe</option>
                            {Object.entries(ohadaClasses).map(([num, info]) => (
                                <option key={num} value={num}>Classe {num} - {info.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Code compte</label>
                        <input name="code" type="text" value={formData.code} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-end" placeholder="Ex: 2154" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Libellé</label>
                        <input name="label" type="text" value={formData.label} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-end" placeholder="Ex: Équipements de radiologie" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Type</label>
                        <select name="type" value={formData.type} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-end">
                            <option value="">Sélectionner un type</option>
                            <option value="Actif">Actif</option>
                            <option value="Passif">Passif</option>
                            <option value="Charge">Charge</option>
                            <option value="Produit">Produit</option>
                        </select>
                    </div>
                    <div className="mb-6">
                        <label className="flex items-center">
                            <input name="isActive" type="checkbox" checked={formData.isActive} onChange={handleChange} className="mr-2" />
                            Compte actif
                        </label>
                    </div>
                    <div className="flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Annuler</button>
                        <button onClick={handleSubmit} className="px-4 py-2 bg-primary-end text-white rounded-lg hover:bg-teal-700">{account ? "Modifier" : "Créer"}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

AccountModal.propTypes = {
    account: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
};