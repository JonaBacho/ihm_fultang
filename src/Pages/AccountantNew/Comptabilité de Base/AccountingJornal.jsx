// CHEMIN : src/Pages/AccountantNew/Comptabilité de Base/AccountingJornal.jsx

import { useState } from 'react';
import { FileText, CreditCard, Wallet, Settings, Filter, Search, Eye, CheckCircle, AlertCircle, PieChart } from 'lucide-react';
import { AccountantDashBoard } from "../../Accountant/Components/AccountantDashboard.jsx";
import { FinancialAccountantNavLink } from "../NavLink.js";
import { AccountantNavBar } from "../../Accountant/Components/AccountantNavBar.jsx";
import { useFinancialAccounting } from "../FinancialAccountingContext.jsx"; // === MODIFICATION ===

// === MODIFICATION : Ce composant utilise maintenant les données du contexte ===
export function JournauxComptables() {
    // === MODIFICATION : Récupération des données depuis le contexte ===
    const { journalEntries, journalTypes, chartOfAccounts } = useFinancialAccounting();

    const [selectedJournal, setSelectedJournal] = useState('AC'); // Journal des Achats par défaut
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    // Création de la structure des journaux dynamiquement
    const journaux = journalTypes.reduce((acc, journalType) => {
        const entriesForJournal = journalEntries.filter(e => e.journal === journalType.code);
        const total = entriesForJournal.reduce((sum, entry) => sum + entry.totalDebit, 0); // Total basé sur les débits pour la simplicité

        acc[journalType.code] = {
            name: journalType.name,
            icon: getJournalIcon(journalType.code), // Fonction pour obtenir une icône
            color: getJournalColor(journalType.code), // Fonction pour la couleur
            total: total,
            entries: entriesForJournal
        };
        return acc;
    }, {});

    const currentJournal = journaux[selectedJournal];

    // Filtrage des écritures du journal sélectionné
    const filteredEntries = (currentJournal?.entries || []).filter(entry =>
        entry.generalLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.reference.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Fonctions utilitaires pour l'affichage
    function getJournalIcon(code) {
        switch (code) {
            case 'AC': return CreditCard;
            case 'VT': return FileText;
            case 'BQ': return Wallet;
            case 'OD': return Settings;
            default: return FileText;
        }
    }

    function getJournalColor(code) {
        switch (code) {
            case 'AC': return 'bg-red-500';
            case 'VT': return 'bg-green-500';
            case 'BQ': return 'bg-blue-500';
            case 'OD': return 'bg-purple-500';
            default: return 'bg-gray-500';
        }
    }

    function getAccountLabel(accountId) {
        const account = chartOfAccounts.find(acc => acc.id === accountId);
        return account ? `${account.code} - ${account.label}` : 'Compte inconnu';
    }


    return (
        <AccountantDashBoard linkList={FinancialAccountantNavLink} requiredRole={"Accountant"}>
            <AccountantNavBar />
            <div className="min-h-screen p-4">
                <div className="ml-5 bg-gradient-to-r from-primary-end to-primary-start rounded-xl text-white p-6 md:p-8 mb-8 shadow-xl">
                    <h1 className="text-3xl font-bold mb-1">Journaux Comptables</h1>
                    <p className="opacity-90 text-sm">Consultez et analysez les écritures par type de journal.</p>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Sidebar - Liste des Journaux */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-sm border">
                                <div className="p-6 border-b">
                                    <h3 className="text-lg font-semibold text-gray-900">Types de Journaux</h3>
                                </div>
                                <div className="p-4">
                                    {Object.entries(journaux).map(([code, journal]) => {
                                        const Icon = journal.icon;
                                        return (
                                            <button
                                                key={code}
                                                onClick={() => setSelectedJournal(code)}
                                                className={`w-full flex items-center p-3 rounded-lg mb-2 transition-colors ${
                                                    selectedJournal === code
                                                        ? `${journal.color} text-white`
                                                        : 'text-gray-700 hover:bg-gray-100'
                                                }`}
                                            >
                                                <Icon className="w-5 h-5 mr-3" />
                                                <div className="text-left">
                                                    <div className="font-medium text-sm">{code}</div>
                                                    <div className="text-xs opacity-90">{journal.name}</div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Main Content - Détail du journal */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-xl shadow-sm border">
                                {/* Header du journal */}
                                <div className="p-6 border-b">
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex items-center">
                                            {currentJournal && <currentJournal.icon className={`w-6 h-6 text-white p-1 rounded ${currentJournal.color} mr-3`} />}
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-900">{currentJournal?.name || 'Journal non sélectionné'}</h3>
                                                <p className="text-sm text-gray-600">Journal {selectedJournal}</p>
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Rechercher..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-end" />
                                        </div>
                                    </div>
                                </div>

                                {/* Table des écritures */}
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Référence</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Libellé</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Débit</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Crédit</th>
                                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Statut</th>
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredEntries.map((entry) => (
                                            <tr key={entry.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 text-sm text-gray-900">{new Date(entry.date).toLocaleDateString('fr-FR')}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{entry.reference}</td>
                                                <td className="px-6 py-4 text-sm text-gray-900">{entry.generalLabel}</td>
                                                <td className="px-6 py-4 text-right text-sm font-medium text-green-600">{entry.totalDebit.toLocaleString()}</td>
                                                <td className="px-6 py-4 text-right text-sm font-medium text-red-600">{entry.totalCredit.toLocaleString()}</td>
                                                <td className="px-6 py-4 text-center">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                            entry.status === 'Validée' ? 'bg-green-100 text-green-800' :
                                                                entry.status === 'Équilibrée' ? 'bg-blue-100 text-blue-800' :
                                                                    'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                            {entry.status}
                                                        </span>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                    {filteredEntries.length === 0 && <p className="text-center p-8 text-gray-500">Aucune écriture trouvée pour ce journal.</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AccountantDashBoard>
    );
}