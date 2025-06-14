// CHEMIN : src/Pages/AccountantNew/MaterialsAccounting/ItemsListView.jsx

import { useState } from 'react';
import PropTypes from 'prop-types';
import { Package, Plus, Edit, PlusCircle } from 'lucide-react';

// Accepte toutes les fonctions nécessaires en props
export default function ItemsListView({ items, categories, onAddNewItem, onEditItem, onRecordMovement }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    const filteredItems = items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !categoryFilter || item.categoryId === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const getCategoryName = (categoryId) => {
        const category = categories.find(c => c.id === categoryId);
        return category ? category.name : 'Inconnue';
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                {/* Filtres */}
                <div className="flex-grow w-full md:w-auto">
                    <input
                        type="text"
                        placeholder="Rechercher un article..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-end focus:outline-none"
                    />
                </div>
                <div className="flex-grow w-full md:w-auto">
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-end focus:outline-none"
                    >
                        <option value="">Toutes les catégories</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                {/* Bouton d'ajout */}
                <button
                    onClick={onAddNewItem}
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-primary-end text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors"
                >
                    <Plus className="h-5 w-5" />
                    Ajouter un Article
                </button>
            </div>

            {/* Tableau */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Article</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Catégorie</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Unité</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Stock Actuel</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {filteredItems.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <Package className="h-5 w-5 text-gray-400 mr-3" />
                                    <span className="font-medium text-gray-900">{item.name}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">{getCategoryName(item.categoryId)}</td>
                            <td className="px-6 py-4 text-center text-sm text-gray-600">{item.unit}</td>
                            <td className={`px-6 py-4 text-center text-lg font-bold ${item.stockFinal < 50 ? 'text-red-500' : 'text-gray-800'}`}>
                                {item.stockFinal}
                            </td>
                            <td className="px-6 py-4 text-center">
                                <div className="flex justify-center gap-4">
                                    {/* === VERSION CORRIGÉE : Un seul bouton qui appelle onRecordMovement === */}
                                    <button
                                        onClick={() => onRecordMovement(item)}
                                        className="flex items-center text-sm text-primary-end font-semibold hover:text-teal-700"
                                        title="Enregistrer un mouvement"
                                    >
                                        <PlusCircle className="h-5 w-5 mr-1" />
                                        Mouvement
                                    </button>
                                    <button
                                        onClick={() => onEditItem(item)}
                                        className="text-gray-400 hover:text-yellow-600"
                                        title="Modifier"
                                    >
                                        <Edit className="h-5 w-5" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {filteredItems.length === 0 && (
                    <div className="text-center py-12">
                        <Package className="h-12 w-12 mx-auto text-gray-300" />
                        <h3 className="mt-2 text-lg font-medium text-gray-900">Aucun article trouvé</h3>
                        <p className="mt-1 text-sm text-gray-500">Essayez de modifier vos filtres ou d'ajouter un nouvel article.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// Définition des PropTypes
ItemsListView.propTypes = {
    items: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    onAddNewItem: PropTypes.func.isRequired,
    onEditItem: PropTypes.func.isRequired,
    onRecordMovement: PropTypes.func.isRequired,
};