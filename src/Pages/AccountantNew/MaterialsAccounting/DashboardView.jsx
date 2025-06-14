// CHEMIN : src/Pages/AccountantNew/MaterialsAccounting/DashboardView.jsx

import PropTypes from 'prop-types';
import { Package, TrendingDown, Clock, AlertTriangle } from 'lucide-react';

// === Composant StatCard réutilisé et adapté ===
function StatCard({ icon: Icon, title, value, description, color }) {
    return (
        <div className="bg-white rounded-lg shadow p-5 flex items-center gap-4 border-l-4" style={{ borderColor: color }}>
            <div className="p-3 rounded-full" style={{ backgroundColor: `${color}1A` }}> {/* Fond léger */}
                <Icon className="w-7 h-7" style={{ color: color }}/>
            </div>
            <div>
                <p className="text-gray-500 font-medium">{title}</p>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
                <p className="text-sm text-gray-400">{description}</p>
            </div>
        </div>
    );
}

StatCard.propTypes = {
    icon: PropTypes.elementType.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
};

// === Composant principal de la vue Dashboard ===
export default function DashboardView({ items, movements }) {
    // Calcul des statistiques à partir des données reçues en props
    const totalItems = items.length;
    const itemsWithLowStock = items.filter(item => item.stockFinal < 50).length; // Seuil de stock bas arbitraire
    const totalStockValue = items.reduce((acc, item) => acc + item.stockFinal, 0); // Ici, juste la somme des unités

    // Récupérer les 5 derniers mouvements
    const recentMovements = movements
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    return (
        <div className="space-y-8">
            {/* Section des indicateurs clés (KPIs) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={Package}
                    title="Articles distincts"
                    value={totalItems}
                    description="Nombre total de types d'articles"
                    color="#3B82F6" // Bleu
                />
                <StatCard
                    icon={TrendingDown}
                    title="Unités en Stock"
                    value={totalStockValue.toLocaleString()}
                    description="Somme des stocks de tous les articles"
                    color="#10B981" // Vert
                />
                <StatCard
                    icon={AlertTriangle}
                    title="Stocks Faibles"
                    value={itemsWithLowStock}
                    description="Articles nécessitant un réapprovisionnement"
                    color="#F59E0B" // Orange
                />
                <StatCard
                    icon={Clock}
                    title="Derniers Mouvements"
                    value={movements.length}
                    description="Total des entrées/sorties enregistrées"
                    color="#8B5CF6" // Violet
                />
            </div>

            {/* Section des mouvements récents */}
            <div>
                <h2 className="text-xl font-bold text-gray-700 mb-4">Derniers Mouvements de Stock</h2>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Article</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Quantité</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {recentMovements.map((movement) => {
                            const item = items.find(i => i.id === movement.itemId);
                            const isEntry = movement.type === 'ENTREE';
                            return (
                                <tr key={movement.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-800">{item ? item.name : 'Article inconnu'}</td>
                                    <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                isEntry ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                                {movement.type}
                                            </span>
                                    </td>
                                    <td className={`px-6 py-4 text-center font-bold ${isEntry ? 'text-green-600' : 'text-red-600'}`}>
                                        {isEntry ? '+' : '-'}{movement.quantity}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(movement.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
                {recentMovements.length === 0 && <p className="text-center text-gray-500 mt-4">Aucun mouvement récent à afficher.</p>}
            </div>
        </div>
    );
}

DashboardView.propTypes = {
    items: PropTypes.array.isRequired,
    movements: PropTypes.array.isRequired,
};