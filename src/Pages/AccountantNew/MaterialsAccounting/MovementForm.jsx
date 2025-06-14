// CHEMIN : src/Pages/AccountantNew/MaterialsAccounting/MovementForm.jsx

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { PlusCircle, Save, X } from 'lucide-react';

export default function MovementForm({ isOpen, onClose, onSave, item, services }) {
    const initialState = {
        type: 'SORTIE',
        quantity: 1,
        date: new Date().toISOString().split('T')[0], // Date du jour par défaut
        serviceId: '',
        observation: '',
    };

    const [formData, setFormData] = useState(initialState);

    // Réinitialiser le formulaire chaque fois qu'il est ouvert
    useEffect(() => {
        if (isOpen) {
            setFormData(initialState);
        }
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Pour les sorties et pertes, s'assurer que le stock est suffisant
        if (formData.type !== 'ENTREE' && Number(formData.quantity) > item.stockFinal) {
            alert("La quantité de sortie ne peut pas être supérieure au stock actuel.");
            return;
        }
        onSave(formData, item.id);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <PlusCircle />
                        Nouveau Mouvement pour : <span className="text-primary-end">{item.name}</span>
                    </h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
                        <X className="h-6 w-6 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type de Mouvement</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        >
                            <option value="SORTIE">Sortie (Consommation / Délivrance)</option>
                            <option value="ENTREE">Entrée (Achat / Don)</option>
                            <option value="PERTE">Perte (Expiration / Casse)</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Quantité</label>
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                min="1"
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">Stock actuel : {item.stockFinal}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Service concerné (si sortie/perte)
                        </label>
                        <select
                            name="serviceId"
                            value={formData.serviceId}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        >
                            <option value="">Aucun</option>
                            {services.map(s => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Observation</label>
                        <textarea
                            name="observation"
                            value={formData.observation}
                            onChange={handleChange}
                            rows="2"
                            placeholder="Ex: Commande N°123, Don de l'ONG X..."
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
                            Annuler
                        </button>
                        <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-primary-end text-white rounded-lg font-semibold hover:bg-teal-700">
                            <Save className="h-5 w-5" />
                            Enregistrer Mouvement
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

MovementForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    item: PropTypes.object,
    services: PropTypes.array.isRequired,
};