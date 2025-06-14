// CHEMIN : src/Pages/AccountantNew/MaterialsAccounting/ItemForm.jsx

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Package, Save, X } from 'lucide-react';

export default function ItemForm({ isOpen, onClose, onSave, itemToEdit, categories }) {
    // État local pour les données du formulaire
    const [formData, setFormData] = useState({
        name: '',
        unit: '',
        categoryId: '',
        stockFinal: 0,
    });

    // Détermine si on est en mode édition ou création
    const isEditing = !!itemToEdit;

    // Pré-remplir le formulaire si on est en mode édition
    useEffect(() => {
        if (isEditing) {
            setFormData({
                name: itemToEdit.name,
                unit: itemToEdit.unit,
                categoryId: itemToEdit.categoryId,
                stockFinal: itemToEdit.stockFinal,
            });
        } else {
            // Réinitialiser pour une nouvelle création
            setFormData({ name: '', unit: '', categoryId: '', stockFinal: 0 });
        }
    }, [itemToEdit, isOpen]);

    // Gérer les changements dans les champs du formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Gérer la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        // Vérifier que la catégorie est bien sélectionnée
        if (!formData.categoryId) {
            alert("Veuillez sélectionner une catégorie.");
            return;
        }
        onSave(formData, itemToEdit?.id); // Appelle la fonction de sauvegarde passée en props
        onClose(); // Ferme le modal après la sauvegarde
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md transform transition-all">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <Package />
                        {isEditing ? "Modifier l'article" : "Nouvel article"}
                    </h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
                        <X className="h-6 w-6 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'article</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-end focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Unité</label>
                        <input
                            type="text"
                            name="unit"
                            value={formData.unit}
                            onChange={handleChange}
                            placeholder="Ex: Pièce, Boîte, Kit..."
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-end focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                        <select
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-end focus:outline-none"
                            required
                        >
                            <option value="">Sélectionner une catégorie</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Stock Initial</label>
                        <input
                            type="number"
                            name="stockFinal" // On modifie directement stockFinal
                            value={formData.stockFinal}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-end focus:outline-none"
                            min="0"
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
                            Annuler
                        </button>
                        <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-primary-end text-white rounded-lg font-semibold hover:bg-teal-700">
                            <Save className="h-5 w-5" />
                            Sauvegarder
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

ItemForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    itemToEdit: PropTypes.object,
    categories: PropTypes.array.isRequired,
};