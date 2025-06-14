// CHEMIN : src/Pages/AccountantNew/MaterialsAccounting/MovementsLogView.jsx

import { useState } from 'react';
import PropTypes from 'prop-types';
import { History, ArrowDown, ArrowUp, AlertTriangle } from 'lucide-react';

export default function MovementsLogView({ movements, items, services, categories }) {
    const [typeFilter, setTypeFilter] = useState('');

    // Filtrer les mouvements par type
    const filteredMovements = movements.filter(movement => {
        return !typeFilter || movement.type === typeFilter;
    });

    // Fonctions pour récupérer les noms à partir des IDs
    const getItemName = (itemId) => items.find(i => i.id === itemId)?.name || 'Article inconnu';
    const getServiceName = (serviceId) => services.find(s => s.id === serviceId)?.name || 'N/A';

    // Fonction pour afficher une icône et une couleur selon le type de mouvement
    const getMovementStyle = (type) => {
        switch (type) {
            case 'ENTREE':
                return { icon: <ArrowUp className="text-green-500" />, color: 'bg-green-100 text-green-800' };
            case 'SORTIE':
                return { icon: <ArrowDown className="text-red-500" />, color: 'bg-red-100 text-red-800' };
            case 'PERTE':
                return { icon: <AlertTriangle className="text-yellow-500" />, color: 'bg-yellow-100 text-yellow-800' };
            default:
                return { icon: null, color: 'bg-gray-100 text-gray-800' };
        }
    };

    return (
        <div className="space-y-6">
            {/* Barre de filtre */}
            <div className="flex justify-end">
                <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full md:w-auto p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-end focus:outline-none"
                >
                    <option value="">Tous les types</option>
                    <option value="ENTREE">Entrées</option>
                    <option value="SORTIE">Sorties</option>
                    <option value="PERTE">Pertes</option>
                </select>
            </div>

            {/* Journal des mouvements */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Article</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Type</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Quantité</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Observation</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {filteredMovements.map((movement) => {
                        const style = getMovementStyle(movement.type);
                        return (
                            <tr key={movement.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {new Date(movement.date).toLocaleString('fr-FR')}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">{getItemName(movement.itemId)}</td>
                                <td className="px-6 py-4 text-center">
                                        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${style.color}`}>
                                            {style.icon}
                                            {movement.type}
                                        </span>
                                </td>
                                <td className="px-6 py-4 text-center text-lg font-bold">
                                    {movement.quantity}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">{getServiceName(movement.serviceId)}</td>
                                <td className="px-6 py-4 text-sm text-gray-500 italic">{movement.observation || 'Aucune'}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
                {filteredMovements.length === 0 && (
                    <div className="text-center py-12">
                        <History className="h-12 w-12 mx-auto text-gray-300" />
                        <h3 className="mt-2 text-lg font-medium text-gray-900">Aucun mouvement trouvé</h3>
                        <p className="mt-1 text-sm text-gray-500">Le journal des mouvements pour cette période est vide.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

MovementsLogView.propTypes = {
    movements: PropTypes.array.isRequired,
    items: PropTypes.array.isRequired,
    services: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
};