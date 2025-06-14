// CHEMIN : src/Pages/AccountantNew/Comptabilité de Base/PlanComptable.jsx

import { useState } from "react";
import { Search, Plus, Edit2, Trash2, Calculator, Building, Package, Users, Banknote, TrendingDown, TrendingUp, Eye } from "lucide-react";
import { AccountantNavBar } from "../../Accountant/Components/AccountantNavBar.jsx";
import { AccountantDashBoard } from "../../Accountant/Components/AccountantDashboard.jsx";
import { FinancialAccountantNavLink } from "../NavLink.js";
import { AccountModal } from "./AccountModal.jsx";
import { ViewAccountDetailsModal } from "./ViewAccountDetailsModal.jsx";
import { Tooltip } from "antd";
import { useFinancialAccounting } from "../FinancialAccountingContext.jsx";

// Définition partagée des classes OHADA
export const ohadaClasses = {
    "1": { name: "Capitaux", icon: Building, color: "blue" },
    "2": { name: "Immobilisations", icon: Calculator, color: "green" },
    "3": { name: "Stocks", icon: Package, color: "yellow" },
    "4": { name: "Tiers", icon: Users, color: "purple" },
    "5": { name: "Trésorerie", icon: Banknote, color: "indigo" },
    "6": { name: "Charges", icon: TrendingDown, color: "red" },
    "7": { name: "Produits", icon: TrendingUp, color: "emerald" }
};

export function ChartOfAccounts() {
    // Utilisation du contexte global pour les données et les actions
    const { chartOfAccounts, addAccount, updateAccount } = useFinancialAccounting();

    // États locaux pour l'interface utilisateur
    const [searchTerm, setSearchTerm] = useState("");
    const [classFilter, setClassFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingAccount, setEditingAccount] = useState(null);
    const [viewingAccount, setViewingAccount] = useState(null);

    // Filtrage des comptes à partir des données du contexte
    const filteredAccounts = chartOfAccounts.filter((account) => {
        const matchesSearch =
            account.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            account.label.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesClass = !classFilter || account.class === classFilter;
        const matchesType = !typeFilter || account.type === typeFilter;
        return matchesSearch && matchesClass && matchesType;
    });

    // Fonctions de gestion des modaux
    const handleOpenCreateModal = () => {
        setEditingAccount(null);
        setShowCreateModal(true);
    };

    const handleOpenEditModal = (account) => {
        setEditingAccount(account);
        setShowCreateModal(true);
    };

    const handleSaveAccount = (formData) => {
        if (editingAccount) {
            updateAccount(editingAccount.id, formData);
        } else {
            addAccount(formData);
        }
        setShowCreateModal(false);
        setEditingAccount(null);
    };

    const handleViewDetails = (account) => {
        setViewingAccount(account);
    };

    // Fonctions utilitaires pour l'affichage
    function getClassIcon(classNumber) {
        const IconComponent = ohadaClasses[classNumber]?.icon || Calculator;
        return <IconComponent className="h-5 w-5" />;
    }

    function getClassColor(classNumber) {
        const colorMap = { "blue": "text-blue-600", "green": "text-green-600", "yellow": "text-yellow-600", "purple": "text-purple-600", "indigo": "text-indigo-600", "red": "text-red-600", "emerald": "text-emerald-600" };
        return colorMap[ohadaClasses[classNumber]?.color] || "text-gray-600";
    }

    function formatAmount(amount) {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XAF', minimumFractionDigits: 0 }).format(amount);
    }

    function formatDate(dateString) {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }

    return (
        <AccountantDashBoard linkList={FinancialAccountantNavLink} requiredRole={"Accountant"}>
            <AccountantNavBar />
            <div className="mx-auto p-12">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Plan Comptable OHADA</h1>
                    <button onClick={handleOpenCreateModal} className="flex items-center px-4 py-2 bg-primary-end text-white rounded-lg hover:bg-teal-700 transition-all duration-300">
                        <Plus className="h-5 w-5 mr-2" />
                        Nouveau compte
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-4 mb-6">
                    {Object.entries(ohadaClasses).map(([classNum, classInfo]) => {
                        const IconComponent = classInfo.icon;
                        const count = chartOfAccounts.filter(acc => acc.class === classNum).length;
                        return (
                            <div key={classNum} className="bg-white p-4 rounded-lg shadow border-l-4 border-primary-end">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Classe {classNum}</p>
                                        <p className="text-lg font-bold">{count}</p>
                                        <p className="text-xs text-gray-500">{classInfo.name}</p>
                                    </div>
                                    <IconComponent className={`h-8 w-8 ${getClassColor(classNum)}`} />
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input type="text" placeholder="Rechercher par code ou libellé..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-end focus:outline-none transition-all duration-300" />
                    </div>
                    <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-end focus:outline-none">
                        <option value="">Toutes les classes</option>
                        {Object.entries(ohadaClasses).map(([num, info]) => (<option key={num} value={num}>Classe {num} - {info.name}</option>))}
                    </select>
                    <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-end focus:outline-none">
                        <option value="">Tous les types</option>
                        <option value="Actif">Actif</option>
                        <option value="Passif">Passif</option>
                        <option value="Charge">Charge</option>
                        <option value="Produit">Produit</option>
                    </select>
                </div>

                {filteredAccounts.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full border-separate border-spacing-y-2">
                            <thead className="bg-primary-end">
                            <tr>
                                <th className="px-6 py-3 text-center text-md text-white font-bold uppercase rounded-l-xl">Code</th>
                                <th className="px-6 py-3 text-center text-md text-white font-bold uppercase">Libellé</th>
                                <th className="px-6 py-3 text-center text-md text-white font-bold uppercase">Classe</th>
                                <th className="px-6 py-3 text-center text-md text-white font-bold uppercase">Type</th>
                                <th className="px-6 py-3 text-center text-md text-white font-bold uppercase">Solde</th>
                                <th className="px-6 py-3 text-center text-md text-white font-bold uppercase">Dernière utilisation</th>
                                <th className="px-6 py-3 text-center text-md text-white font-bold uppercase rounded-r-xl">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white border-separate">
                            {filteredAccounts.map((account) => (
                                <tr key={account.id} className="bg-gray-50 hover:bg-gray-100">
                                    <td className="px-6 py-5 rounded-l-xl border-l-4 border-primary-end text-center">
                                        <div className="text-lg font-bold text-gray-900">{account.code}</div>
                                        <div className={`text-xs ${account.isActive ? 'text-green-600' : 'text-red-600'}`}>{account.isActive ? 'Actif' : 'Inactif'}</div>
                                    </td>
                                    <td className="px-6 py-5 text-center text-md font-medium text-gray-900">{account.label}</td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center justify-center">
                                            <div className={`${getClassColor(account.class)} mr-2`}>{getClassIcon(account.class)}</div>
                                            <div className="text-center">
                                                <div className="text-sm font-medium">Classe {account.class}</div>
                                                <div className="text-xs text-gray-500">{ohadaClasses[account.class]?.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${account.type === 'Actif' ? 'bg-green-100 text-green-800' : account.type === 'Passif' ? 'bg-blue-100 text-blue-800' : account.type === 'Charge' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'}`}>{account.type}</span>
                                    </td>
                                    <td className="px-6 py-5 text-center text-md font-semibold text-gray-900">{formatAmount(account.balance)}</td>
                                    <td className="px-6 py-5 text-center text-sm text-gray-600">{formatDate(account.lastUsed)}</td>
                                    <td className="px-6 py-5 rounded-r-xl">
                                        <div className="flex items-center justify-center gap-5">
                                            <Tooltip placement={"left"} title={"View Details"}><button onClick={() => handleViewDetails(account)} className="text-primary-end hover:text-blue-800 transition-colors"><Eye className="h-5 w-5" /></button></Tooltip>
                                            <Tooltip placement={"bottom"} title={"Edit"}><button onClick={() => handleOpenEditModal(account)} className="text-green-600 hover:text-green-800 transition-colors"><Edit2 className="h-5 w-5" /></button></Tooltip>
                                            <Tooltip placement={"right"} title={"Delete"}><button onClick={() => { if (confirm("Êtes-vous sûr de vouloir supprimer ce compte ?")) { console.log("Supprimer:", account.id); } }} className="text-red-600 hover:text-red-800 transition-colors"><Trash2 className="h-5 w-5" /></button></Tooltip>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-8 mt-24 flex items-center justify-center">
                        <div className="flex flex-col items-center">
                            <Calculator className="h-16 w-16 text-primary-end mb-4" />
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Aucun compte trouvé</h2>
                            <p className="text-gray-600 mb-4 text-center">Aucun compte ne correspond à vos critères. Essayez de modifier vos filtres.</p>
                        </div>
                    </div>
                )}

                {showCreateModal && (<AccountModal account={editingAccount} onClose={() => { setShowCreateModal(false); setEditingAccount(null); }} onSave={handleSaveAccount} />)}
                {viewingAccount && (<ViewAccountDetailsModal isOpen={!!viewingAccount} account={viewingAccount} onClose={() => setViewingAccount(null)} />)}
            </div>
        </AccountantDashBoard>
    );
}