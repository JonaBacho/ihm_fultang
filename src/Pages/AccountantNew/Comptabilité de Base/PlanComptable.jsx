"use client"

import { useState, useEffect, useCallback } from "react";
import { Search, Plus, Edit2, Trash2, Calculator, Building, Package, Users, Banknote, TrendingDown, TrendingUp, Eye } from "lucide-react";
import {AccountantNavBar} from "../../Accountant/Components/AccountantNavBar.jsx";
import {AccountantDashBoard} from "../../Accountant/Components/AccountantDashboard.jsx";
import {FinancialAccountantNavLink} from "../NavLink.js";

export function ChartOfAccounts() {
    const [searchTerm, setSearchTerm] = useState("");
    const [classFilter, setClassFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [accountsList, setAccountsList] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingAccount, setEditingAccount] = useState(null);
    const [errorStatus, setErrorStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    // Classes OHADA avec leurs icônes et descriptions
    const ohadaClasses = {
        "1": { name: "Capitaux", icon: Building, color: "blue" },
        "2": { name: "Immobilisations", icon: Calculator, color: "green" },
        "3": { name: "Stocks", icon: Package, color: "yellow" },
        "4": { name: "Tiers", icon: Users, color: "purple" },
        "5": { name: "Trésorerie", icon: Banknote, color: "indigo" },
        "6": { name: "Charges", icon: TrendingDown, color: "red" },
        "7": { name: "Produits", icon: TrendingUp, color: "emerald" }
    };

    // Données d'exemple pour la démonstration
    const sampleAccounts = [
        {
            id: 1,
            code: "2154",
            label: "Équipements de radiologie",
            class: "2",
            type: "Actif",
            balance: 125000,
            isActive: true,
            createdDate: "2024-01-15T10:30:00Z",
            lastUsed: "2024-06-10T14:20:00Z"
        },
        {
            id: 2,
            code: "7011",
            label: "Consultations médicales",
            class: "7",
            type: "Produit",
            balance: 45000,
            isActive: true,
            createdDate: "2024-01-10T08:15:00Z",
            lastUsed: "2024-06-14T09:30:00Z"
        },
        {
            id: 3,
            code: "4111",
            label: "Patients débiteurs",
            class: "4",
            type: "Actif",
            balance: 15000,
            isActive: true,
            createdDate: "2024-02-01T11:45:00Z",
            lastUsed: "2024-06-13T16:10:00Z"
        },
        {
            id: 4,
            code: "6011",
            label: "Achats de médicaments",
            class: "6",
            type: "Charge",
            balance: 28000,
            isActive: true,
            createdDate: "2024-01-20T14:00:00Z",
            lastUsed: "2024-06-12T11:25:00Z"
        },
        {
            id: 5,
            code: "5121",
            label: "Banque BICEC",
            class: "5",
            type: "Actif",
            balance: 85000,
            isActive: true,
            createdDate: "2024-01-05T09:20:00Z",
            lastUsed: "2024-06-14T08:45:00Z"
        }
    ];

    // Simulation du chargement des données
    const loadChartOfAccounts = useCallback(async () => {
        setIsLoading(true);
        try {
            // Simulation d'un appel API
            await new Promise(resolve => setTimeout(resolve, 1000));
            setAccountsList(sampleAccounts);
            setErrorStatus(null);
            setErrorMessage("");
        } catch (error) {
            console.error(error);
            setErrorStatus(500);
            setErrorMessage("Une erreur est survenue lors du chargement du plan comptable.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadChartOfAccounts();
    }, [loadChartOfAccounts]);

    // Filtrage des comptes
    const filteredAccounts = accountsList.filter((account) => {
        const matchesSearch =
            account.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            account.label.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesClass = !classFilter || account.class === classFilter;
        const matchesType = !typeFilter || account.type === typeFilter;
        return matchesSearch && matchesClass && matchesType;
    });

    // Fonction pour obtenir l'icône d'une classe
    function getClassIcon(classNumber) {
        const IconComponent = ohadaClasses[classNumber]?.icon || Calculator;
        return <IconComponent className="h-5 w-5" />;
    }

    // Fonction pour obtenir la couleur d'une classe
    function getClassColor(classNumber) {
        const colorMap = {
            "blue": "text-blue-600",
            "green": "text-green-600",
            "yellow": "text-yellow-600",
            "purple": "text-purple-600",
            "indigo": "text-indigo-600",
            "red": "text-red-600",
            "emerald": "text-emerald-600"
        };
        return colorMap[ohadaClasses[classNumber]?.color] || "text-gray-600";
    }

    // Fonction pour formater le montant
    function formatAmount(amount) {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XAF',
            minimumFractionDigits: 0
        }).format(amount);
    }

    // Fonction pour formater la date
    function formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    // Composant Modal pour créer/modifier un compte
    function AccountModal({ account, onClose, onSave }) {
        const [formData, setFormData] = useState({
            code: account?.code || "",
            label: account?.label || "",
            class: account?.class || "",
            type: account?.type || "",
            isActive: account?.isActive ?? true
        });

        const handleSubmit = () => {
            // Validation du code OHADA (doit commencer par le numéro de classe)
            if (!formData.code.startsWith(formData.class)) {
                alert("Le code compte doit commencer par le numéro de classe sélectionné");
                return;
            }
            onSave(formData);
            onClose();
        };

        return (

            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                    <h2 className="text-xl font-bold mb-4">
                        {account ? "Modifier le compte" : "Nouveau compte"}
                    </h2>
                    <div className="space-y-4">
                        <div className="mb-4">
                            <select
                                value={formData.class}
                                onChange={(e) => setFormData({...formData, class: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Sélectionner une classe</option>
                                {Object.entries(ohadaClasses).map(([num, info]) => (
                                    <option key={num} value={num}>
                                        Classe {num} - {info.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Code compte</label>
                            <input
                                type="text"
                                value={formData.code}
                                onChange={(e) => setFormData({...formData, code: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Ex: 2154"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Libellé</label>
                            <input
                                type="text"
                                value={formData.label}
                                onChange={(e) => setFormData({...formData, label: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Ex: Équipements de radiologie"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Type</label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({...formData, type: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Sélectionner un type</option>
                                <option value="Actif">Actif</option>
                                <option value="Passif">Passif</option>
                                <option value="Charge">Charge</option>
                                <option value="Produit">Produit</option>
                            </select>
                        </div>
                        <div className="mb-6">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={formData.isActive}
                                    onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                                    className="mr-2"
                                />
                                Compte actif
                            </label>
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                {account ? "Modifier" : "Créer"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }


    if (isLoading) {
        return (
            <div className="mx-auto p-6">
                <div className="h-[500px] w-full flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    if (errorStatus) {
        return (
            <div className="mx-auto p-6">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-red-600 mb-2">Erreur {errorStatus}</h2>
                    <p className="text-gray-600">{errorMessage}</p>
                </div>
            </div>
        );
    }

    return (
        <AccountantDashBoard linkList={FinancialAccountantNavLink} requiredRole={"Accountant"}>
            <AccountantNavBar></AccountantNavBar>
        <div className="mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Plan Comptable OHADA</h1>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    Nouveau compte
                </button>
            </div>

            {/* Statistiques des classes OHADA */}
            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-4 mb-6">
                {Object.entries(ohadaClasses).map(([classNum, classInfo]) => {
                    const IconComponent = classInfo.icon;
                    const count = accountsList.filter(acc => acc.class === classNum).length;
                    return (
                        <div key={classNum} className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
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

            {/* Filtres */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                        type="text"
                        placeholder="Rechercher par code ou libellé..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
                    />
                </div>
                <select
                    value={classFilter}
                    onChange={(e) => setClassFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                    <option value="">Toutes les classes</option>
                    {Object.entries(ohadaClasses).map(([num, info]) => (
                        <option key={num} value={num}>Classe {num} - {info.name}</option>
                    ))}
                </select>
                <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                    <option value="">Tous les types</option>
                    <option value="Actif">Actif</option>
                    <option value="Passif">Passif</option>
                    <option value="Charge">Charge</option>
                    <option value="Produit">Produit</option>
                </select>
            </div>

            {/* Table des comptes */}
            {filteredAccounts && filteredAccounts.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full border-separate border-spacing-y-2">
                        <thead>
                        <tr>
                            <th className="px-6 py-3 bg-blue-600 rounded-l-xl text-center text-md text-white font-bold uppercase">
                                Code
                            </th>
                            <th className="px-6 py-3 bg-blue-600 text-center text-md text-white font-bold uppercase">
                                Libellé
                            </th>
                            <th className="px-6 py-3 bg-blue-600 text-center text-md text-white font-bold uppercase">
                                Classe
                            </th>
                            <th className="px-6 py-3 bg-blue-600 text-center text-md text-white font-bold uppercase">
                                Type
                            </th>
                            <th className="px-6 py-3 bg-blue-600 text-center text-md text-white font-bold uppercase">
                                Solde
                            </th>
                            <th className="px-6 py-3 bg-blue-600 text-center text-md text-white font-bold uppercase">
                                Dernière utilisation
                            </th>
                            <th className="px-6 py-3 text-center text-md text-white font-bold bg-blue-600 rounded-r-xl uppercase">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white border-separate">
                        {filteredAccounts.map((account) => (
                            <tr key={account.id}>
                                <td className="px-6 py-5 rounded-l-xl bg-gray-50 border-l-4 border-blue-500">
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-gray-900">{account.code}</div>
                                        <div className={`text-xs ${account.isActive ? 'text-green-600' : 'text-red-600'}`}>
                                            {account.isActive ? 'Actif' : 'Inactif'}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5 bg-gray-50">
                                    <div className="text-center">
                                        <div className="text-md font-medium text-gray-900">{account.label}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-5 bg-gray-50">
                                    <div className="flex items-center justify-center">
                                        <div className={`${getClassColor(account.class)} mr-2`}>
                                            {getClassIcon(account.class)}
                                        </div>
                                        <div className="text-center">
                                            <div className="text-sm font-medium">Classe {account.class}</div>
                                            <div className="text-xs text-gray-500">{ohadaClasses[account.class]?.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5 bg-gray-50">
                                    <div className="text-center">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                account.type === 'Actif' ? 'bg-green-100 text-green-800' :
                                                    account.type === 'Passif' ? 'bg-blue-100 text-blue-800' :
                                                        account.type === 'Charge' ? 'bg-red-100 text-red-800' :
                                                            'bg-emerald-100 text-emerald-800'
                                            }`}>
                                                {account.type}
                                            </span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 bg-gray-50">
                                    <div className="text-center text-md font-semibold text-gray-900">
                                        {formatAmount(account.balance)}
                                    </div>
                                </td>
                                <td className="px-6 py-5 bg-gray-50">
                                    <div className="text-center text-sm text-gray-600">
                                        {formatDate(account.lastUsed)}
                                    </div>
                                </td>
                                <td className="px-6 py-5 bg-gray-50 rounded-r-xl">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => console.log("Voir détails:", account.id)}
                                            className="text-blue-600 hover:text-blue-800 transition-colors"
                                            title="Voir détails"
                                        >
                                            <Eye className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => setEditingAccount(account)}
                                            className="text-green-600 hover:text-green-800 transition-colors"
                                            title="Modifier"
                                        >
                                            <Edit2 className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (confirm("Êtes-vous sûr de vouloir supprimer ce compte ?")) {
                                                    console.log("Supprimer:", account.id);
                                                }
                                            }}
                                            className="text-red-600 hover:text-red-800 transition-colors"
                                            title="Supprimer"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="p-8 mt-24 flex items-center justify-center">
                    <div className="flex flex-col">
                        <Calculator className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-800 mb-2 mx-auto">Aucun compte trouvé</h2>
                        <p className="text-gray-600 mb-4 mx-auto text-center">
                            Aucun compte ne correspond à vos critères de recherche. Essayez de modifier vos filtres ou créez un nouveau compte.
                        </p>
                        <button
                            className="px-4 hover:bg-blue-700 duration-300 mx-auto py-2 bg-blue-600 text-white rounded-lg transition-all"
                            onClick={() => setShowCreateModal(true)}
                        >
                            Créer un compte
                        </button>
                    </div>
                </div>
            )}

            {/* Modal de création/modification */}
            {(showCreateModal || editingAccount) && (
                <AccountModal
                    account={editingAccount}
                    onClose={() => {
                        setShowCreateModal(false);
                        setEditingAccount(null);
                    }}
                    onSave={(formData) => {
                        console.log("Sauvegarder:", formData);
                        // Ici on ferait l'appel API pour sauvegarder
                        loadChartOfAccounts(); // Recharger les données
                    }}
                />
            )}
        </div>
        </AccountantDashBoard>
    );
}