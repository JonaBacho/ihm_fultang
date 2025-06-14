"use client"

import { useState, useEffect, useCallback } from "react";
import { Search, Plus, Edit2, Trash2, Eye, CalendarDays, BookOpen, CheckCircle, XCircle, FileText, TrendingDown, TrendingUp, AlertTriangle, Save, Send } from "lucide-react";
import {AccountantNavBar} from "../../Accountant/Components/AccountantNavBar.jsx"; // Ajustez le chemin
import {AccountantDashBoard} from "../../Accountant/Components/AccountantDashboard.jsx"; // Ajustez le chemin
import {FinancialAccountantNavLink} from "../NavLink.js"; // Ajustez le chemin
// Pour générer des IDs uniques pour les lignes d'écriture
import { v4 as uuidv4 } from 'uuid';

// Simulez vos couleurs de thème
const themeColors = {
    primaryEnd: 'blue-700',
    primaryStart: 'blue-500',
    focusRing: 'focus:ring-blue-500',
    textPrimaryEnd: 'text-blue-700',
    textPrimaryStart: 'text-blue-500',
};

// Données d'exemple pour les comptes (normalement viendraient d'une API)
const sampleChartOfAccounts = [
    { code: "6132", label: "Loyers", type: "Charge" },
    { code: "5121", label: "Banque BICEC", type: "Actif" },
    { code: "7011", label: "Consultations médicales", type: "Produit" },
    { code: "4011", label: "Fournisseurs", type: "Passif" },
    { code: "4111", label: "Clients", type: "Actif" },
];

// Données d'exemple pour les journaux
const journalTypes = [
    { code: "AC", name: "Achats" },
    { code: "VT", name: "Ventes" },
    { code: "BQ", name: "Banque" },
    { code: "OD", name: "Opérations Diverses" },
];

export function JournalEntries() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [journalFilter, setJournalFilter] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [entriesList, setEntriesList] = useState([]);
    const [showEntryModal, setShowEntryModal] = useState(false);
    const [editingEntry, setEditingEntry] = useState(null); // Pour la modification ou la vue
    const [isViewMode, setIsViewMode] = useState(false);
    const [errorStatus, setErrorStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const initialEntryLine = () => ({
        id: uuidv4(),
        accountId: "", // Sera le code du compte
        accountLabel: "",
        lineLabel: "",
        debit: "",
        credit: ""
    });

    const sampleEntries = [
        {
            id: 'entry1',
            journal: "OD",
            date: "2024-07-20",
            reference: "LOY-2024-07",
            generalLabel: "Loyer juillet 2024",
            status: "Validée", // Brouillon, Équilibrée, Validée
            totalDebit: 500000,
            totalCredit: 500000,
            lines: [
                { id: uuidv4(), accountId: "6132", accountLabel: "Loyers", lineLabel: "Loyer Bureau Principal", debit: 500000, credit: "" },
                { id: uuidv4(), accountId: "5121", accountLabel: "Banque BICEC", lineLabel: "Paiement Loyer", debit: "", credit: 500000 }
            ],
            validatedAt: "2024-07-21T10:00:00Z"
        },
        {
            id: 'entry2',
            journal: "AC",
            date: "2024-07-19",
            reference: "FAC-00123",
            generalLabel: "Achat fournitures de bureau",
            status: "Brouillon",
            totalDebit: 75000,
            totalCredit: 0, // Déséquilibré pour l'exemple
            lines: [
                { id: uuidv4(), accountId: "6064", accountLabel: "Fournitures de bureau", lineLabel: "", debit: 75000, credit: "" }
            ]
        }
    ];

    const loadJournalEntries = useCallback(async () => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simule un appel API
            setEntriesList(sampleEntries);
            setErrorStatus(null);
        } catch (error) {
            console.error(error);
            setErrorStatus(500);
            setErrorMessage("Erreur lors du chargement des écritures.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadJournalEntries();
    }, [loadJournalEntries]);

    const filteredEntries = entriesList.filter(entry => {
        const matchesSearch = entry.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.generalLabel.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = !statusFilter || entry.status === statusFilter;
        const matchesJournal = !journalFilter || entry.journal === journalFilter;
        return matchesSearch && matchesStatus && matchesJournal;
    });

    const handleOpenCreateModal = () => {
        setEditingEntry(null);
        setIsViewMode(false);
        setShowEntryModal(true);
    };

    const handleOpenEditModal = (entry) => {
        setEditingEntry(entry);
        setIsViewMode(false);
        setShowEntryModal(true);
    };

    const handleOpenViewModal = (entry) => {
        setEditingEntry(entry);
        setIsViewMode(true);
        setShowEntryModal(true);
    };

    const handleSaveEntry = async (entryData, isValidationIntent) => {
        console.log("Saving entry:", entryData, "Validation Intent:", isValidationIntent);
        // Simulation d'un appel API
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));

        let newStatus = entryData.status;
        if (isValidationIntent) {
            if (entryData.totalDebit === entryData.totalCredit && entryData.totalDebit > 0) {
                newStatus = "Validée";
                // Simuler POST /api/accounting/journal-entries/{id}/validate/
                console.log("Simulating validation for entry ID:", entryData.id);
            } else {
                alert("L'écriture doit être équilibrée pour être validée.");
                setIsLoading(false);
                return; // Ne pas fermer le modal ni changer le statut si la validation échoue
            }
        } else {
            // Si simple sauvegarde, vérifier équilibre pour statut "Équilibrée"
            if (entryData.totalDebit === entryData.totalCredit && entryData.totalDebit > 0) {
                newStatus = "Équilibrée";
            } else {
                newStatus = "Brouillon";
            }
        }

        const finalEntryData = {...entryData, status: newStatus};

        if (editingEntry && editingEntry.id) { // Modification
            setEntriesList(prev => prev.map(e => e.id === finalEntryData.id ? finalEntryData : e));
        } else { // Création
            setEntriesList(prev => [{ ...finalEntryData, id: uuidv4() }, ...prev]);
        }
        setShowEntryModal(false);
        setEditingEntry(null);
        setIsLoading(false);
        // loadJournalEntries(); // Recharger depuis le "serveur"
    };

    const handleDeleteEntry = async (entryId) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer cette écriture (si brouillon) ?")) {
            // Simuler DELETE (seulement si brouillon)
            const entryToDelete = entriesList.find(e => e.id === entryId);
            if (entryToDelete && entryToDelete.status === "Brouillon") {
                setIsLoading(true);
                await new Promise(resolve => setTimeout(resolve, 500));
                setEntriesList(prev => prev.filter(e => e.id !== entryId));
                setIsLoading(false);
            } else {
                alert("Seules les écritures en brouillon peuvent être supprimées.");
            }
        }
    };


    function formatAmount(amount) {
        if (amount === "" || amount === null || amount === undefined) return "";
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XAF', minimumFractionDigits: 0 }).format(amount);
    }

    function formatDate(dateString) {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }

    function EntryModal({ entry, onClose, onSave, viewMode }) {
        const [formData, setFormData] = useState({
            journal: entry?.journal || "OD",
            date: entry?.date || new Date().toISOString().split('T')[0],
            reference: entry?.reference || "",
            generalLabel: entry?.generalLabel || "",
            lines: entry?.lines?.map(l => ({...l, debit: l.debit || "", credit: l.credit || ""})) || [initialEntryLine()],
            status: entry?.status || "Brouillon"
        });
        const [totalDebit, setTotalDebit] = useState(0);
        const [totalCredit, setTotalCredit] = useState(0);
        const [isBalanced, setIsBalanced] = useState(false);

        useEffect(() => {
            const debits = formData.lines.reduce((sum, line) => sum + (parseFloat(line.debit) || 0), 0);
            const credits = formData.lines.reduce((sum, line) => sum + (parseFloat(line.credit) || 0), 0);
            setTotalDebit(debits);
            setTotalCredit(credits);
            setIsBalanced(debits === credits && debits > 0);
        }, [formData.lines]);

        const handleInputChange = (e, field) => {
            setFormData(prev => ({ ...prev, [field]: e.target.value }));
        };

        const handleLineChange = (index, field, value) => {
            const newLines = [...formData.lines];
            newLines[index][field] = value;

            // Si un compte est sélectionné, mettre à jour son libellé
            if (field === "accountId") {
                const selectedAccount = sampleChartOfAccounts.find(acc => acc.code === value);
                newLines[index].accountLabel = selectedAccount ? selectedAccount.label : "";
            }

            // Assurer que débit et crédit ne sont pas remplis en même temps sur une ligne
            if (field === "debit" && value !== "") newLines[index].credit = "";
            if (field === "credit" && value !== "") newLines[index].debit = "";

            setFormData(prev => ({ ...prev, lines: newLines }));
        };

        const addLine = () => {
            if (viewMode || formData.status === "Validée") return;
            setFormData(prev => ({ ...prev, lines: [...prev.lines, initialEntryLine()] }));
        };

        const removeLine = (index) => {
            if (viewMode || formData.status === "Validée") return;
            if (formData.lines.length <= 1) { // Toujours garder au moins une ligne pour la saisie
                alert("Une écriture doit comporter au moins une ligne.");
                return;
            }
            const newLines = formData.lines.filter((_, i) => i !== index);
            setFormData(prev => ({ ...prev, lines: newLines }));
        };

        const handleSubmit = (isValidationIntent = false) => {
            if (viewMode) { onClose(); return; }

            // Validations
            if (!formData.journal || !formData.date || !formData.reference || !formData.generalLabel) {
                alert("Veuillez remplir les informations générales de l'écriture (Journal, Date, N° Pièce, Libellé).");
                return;
            }
            if (formData.lines.length < 2 && !isValidationIntent) { // Sauf si c'est un brouillon qu'on sauvegarde
                // alert("Une écriture doit comporter au moins deux lignes pour être équilibrée.");
                // return; // On peut sauvegarder un brouillon avec une seule ligne
            }
            if (formData.lines.some(line => !line.accountId || (line.debit === "" && line.credit === ""))) {
                alert("Chaque ligne doit avoir un compte et un montant (débit ou crédit).");
                return;
            }

            if (isValidationIntent && !isBalanced) {
                alert("L'écriture doit être équilibrée (Total Débit = Total Crédit et > 0) pour être validée.");
                return;
            }

            onSave({ ...formData, totalDebit, totalCredit, status: formData.status }, isValidationIntent);
        };

        const canEdit = !viewMode && formData.status !== "Validée";

        return (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 overflow-y-auto">
                <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-3xl transform transition-all max-h-[90vh] flex flex-col">
                    <h2 className={`text-2xl font-bold mb-6 ${themeColors.textPrimaryEnd}`}>
                        {viewMode ? "Détail de l'écriture" : (entry?.id ? "Modifier l'écriture" : "Nouvelle écriture comptable")}
                        {formData.status === "Validée" && <span className="text-sm ml-2 text-green-600">(Validée)</span>}
                    </h2>

                    <div className="flex-grow overflow-y-auto pr-2 space-y-4">
                        {/* Infos générales */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Journal</label>
                                <select value={formData.journal} onChange={(e) => handleInputChange(e, 'journal')} disabled={!canEdit}
                                        className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${themeColors.focusRing} ${!canEdit ? 'bg-gray-100' : ''}`}>
                                    {journalTypes.map(jt => <option key={jt.code} value={jt.code}>{jt.code} - {jt.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                <input type="date" value={formData.date} onChange={(e) => handleInputChange(e, 'date')} disabled={!canEdit}
                                       className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${themeColors.focusRing} ${!canEdit ? 'bg-gray-100' : ''}`} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">N° Pièce</label>
                                <input type="text" placeholder="Ex: LOY-2025-06" value={formData.reference} onChange={(e) => handleInputChange(e, 'reference')} disabled={!canEdit}
                                       className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${themeColors.focusRing} ${!canEdit ? 'bg-gray-100' : ''}`} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Libellé général</label>
                                <input type="text" placeholder="Ex: Loyer juin 2025" value={formData.generalLabel} onChange={(e) => handleInputChange(e, 'generalLabel')} disabled={!canEdit}
                                       className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${themeColors.focusRing} ${!canEdit ? 'bg-gray-100' : ''}`} />
                            </div>
                        </div>

                        {/* Lignes d'écriture */}
                        <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Lignes d'écriture</h3>
                        <div className="space-y-3">
                            {formData.lines.map((line, index) => (
                                <div key={line.id} className="grid grid-cols-12 gap-2 items-center p-3 bg-gray-50 rounded-lg">
                                    <div className="col-span-12 md:col-span-3">
                                        {index === 0 && <label className="text-xs font-medium text-gray-600 md:hidden">Compte</label>}
                                        <select value={line.accountId} disabled={!canEdit}
                                                onChange={(e) => handleLineChange(index, 'accountId', e.target.value)}
                                                className={`w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm ${themeColors.focusRing} ${!canEdit ? 'bg-gray-100' : ''}`}>
                                            <option value="">Choisir un compte</option>
                                            {sampleChartOfAccounts.map(acc => <option key={acc.code} value={acc.code}>{acc.code} - {acc.label}</option>)}
                                        </select>
                                    </div>
                                    <div className="col-span-12 md:col-span-4">
                                        {index === 0 && <label className="text-xs font-medium text-gray-600 md:hidden">Libellé ligne (optionnel)</label>}
                                        <input type="text" placeholder="Libellé spécifique" value={line.lineLabel} disabled={!canEdit}
                                               onChange={(e) => handleLineChange(index, 'lineLabel', e.target.value)}
                                               className={`w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm ${themeColors.focusRing} ${!canEdit ? 'bg-gray-100' : ''}`} />
                                    </div>
                                    <div className="col-span-5 md:col-span-2">
                                        {index === 0 && <label className="text-xs font-medium text-gray-600 md:hidden">Débit</label>}
                                        <input type="number" placeholder="Débit" value={line.debit} disabled={!canEdit}
                                               onChange={(e) => handleLineChange(index, 'debit', e.target.value)}
                                               className={`w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm text-right ${themeColors.focusRing} ${!canEdit ? 'bg-gray-100' : ''}`} />
                                    </div>
                                    <div className="col-span-5 md:col-span-2">
                                        {index === 0 && <label className="text-xs font-medium text-gray-600 md:hidden">Crédit</label>}
                                        <input type="number" placeholder="Crédit" value={line.credit} disabled={!canEdit}
                                               onChange={(e) => handleLineChange(index, 'credit', e.target.value)}
                                               className={`w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm text-right ${themeColors.focusRing} ${!canEdit ? 'bg-gray-100' : ''}`} />
                                    </div>
                                    <div className="col-span-2 md:col-span-1 text-right">
                                        {canEdit && formData.lines.length > 0 && ( // On ne peut pas supprimer la dernière ligne si on veut forcer au moins 1 ligne
                                            <button type="button" onClick={() => removeLine(index)} className="text-red-500 hover:text-red-700 p-1" title="Supprimer ligne">
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {canEdit && (
                            <button type="button" onClick={addLine} className={`mt-3 flex items-center text-sm ${themeColors.textPrimaryStart} hover:${themeColors.textPrimaryEnd} font-medium`}>
                                <Plus size={18} className="mr-1" /> Ajouter une ligne
                            </button>
                        )}

                        {/* Totaux et Équilibre */}
                        <div className="mt-6 pt-4 border-t border-gray-200">
                            <div className="flex justify-between items-center text-lg font-semibold">
                                <span>Total Débit: <span className="text-green-600">{formatAmount(totalDebit)}</span></span>
                                <span>Total Crédit: <span className="text-red-600">{formatAmount(totalCredit)}</span></span>
                            </div>
                            <div className={`mt-2 text-center font-bold p-2 rounded-md ${isBalanced ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {isBalanced ? <><CheckCircle size={20} className="inline mr-1" /> Écriture Équilibrée</> : <><AlertTriangle size={20} className="inline mr-1" /> Écriture Déséquilibrée: {formatAmount(totalDebit - totalCredit)}</>}
                            </div>
                        </div>
                    </div>

                    {/* Actions du Modal */}
                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 mt-auto">
                        <button type="button" onClick={onClose}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                            {viewMode ? "Fermer" : "Annuler"}
                        </button>
                        {!viewMode && formData.status !== "Validée" && (
                            <button type="button" onClick={() => handleSubmit(false)} disabled={isLoading}
                                    className={`flex items-center px-4 py-2 border border-gray-300 rounded-lg text-${themeColors.primaryStart} hover:bg-gray-50 transition-colors font-medium`}>
                                <Save size={18} className="mr-2" /> Sauvegarder Brouillon
                            </button>
                        )}
                        {!viewMode && formData.status !== "Validée" && (
                            <button type="button" onClick={() => handleSubmit(true)} disabled={isLoading || !isBalanced}
                                    className={`flex items-center px-4 py-2 text-white rounded-lg bg-gradient-to-r from-${themeColors.primaryStart} to-${themeColors.primaryEnd} font-semibold hover:from-${themeColors.primaryEnd} hover:to-${themeColors.primaryStart} transition-all disabled:opacity-50`}>
                                <Send size={18} className="mr-2" /> {entry?.status === "Équilibrée" ? "Valider l'écriture" : "Sauvegarder et Valider"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }


    if (isLoading && !showEntryModal) { // Ne pas afficher le spinner global si le modal est ouvert et charge
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className={`animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-${themeColors.primaryEnd}`}></div>
            </div>
        );
    }

    if (errorStatus) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-xl shadow-xl text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-3">Erreur {errorStatus}</h2>
                    <p className="text-gray-700">{errorMessage}</p>
                </div>
            </div>
        );
    }

    return (
        <AccountantDashBoard linkList={FinancialAccountantNavLink} requiredRole={"Accountant"}>
            <AccountantNavBar />
            <div className="min-h-screen  p-4 md:p-8">
                <div className="max-w-full mx-auto">
                    <div className={`bg-gradient-to-r from-primary-end to-primary-start rounded-xl text-white p-6 md:p-8 mb-8 shadow-xl`}>
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold mb-1">Saisie des Écritures Comptables</h1>
                                <p className="opacity-90 text-sm">Enregistrez et gérez les opérations financières.</p>
                            </div>
                            <button onClick={handleOpenCreateModal}
                                    className={`mt-4 md:mt-0 flex items-center px-4 py-2 bg-white text-${themeColors.primaryEnd} rounded-lg font-semibold shadow-md hover:bg-gray-50 hover:shadow-lg transition-all`}>
                                <Plus className="h-5 w-5 mr-2" />
                                Nouvelle Écriture
                            </button>
                        </div>
                    </div>

                    {/* Filtres */}
                    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input type="text" placeholder="Rechercher par N° Pièce ou Libellé..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                                       className={`w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg ${themeColors.focusRing} focus:border-${themeColors.primaryEnd}`} />
                            </div>
                            <select value={journalFilter} onChange={(e) => setJournalFilter(e.target.value)}
                                    className={`px-4 py-2.5 border border-gray-300 rounded-lg ${themeColors.focusRing} focus:border-${themeColors.primaryEnd}`}>
                                <option value="">Tous les journaux</option>
                                {journalTypes.map(jt => <option key={jt.code} value={jt.code}>{jt.name} ({jt.code})</option>)}
                            </select>
                            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
                                    className={`px-4 py-2.5 border border-gray-300 rounded-lg ${themeColors.focusRing} focus:border-${themeColors.primaryEnd}`}>
                                <option value="">Tous les statuts</option>
                                <option value="Brouillon">Brouillon</option>
                                <option value="Équilibrée">Équilibrée</option>
                                <option value="Validée">Validée</option>
                            </select>
                        </div>
                    </div>

                    {/* Tableau des écritures */}
                    {filteredEntries && filteredEntries.length > 0 ? (
                        <div className="overflow-x-auto bg-white rounded-xl shadow-xl">
                            <table className="w-full">
                                <thead className={`bg-${themeColors.primaryEnd}`}>
                                <tr>
                                    {['Date', 'N° Pièce', 'Journal', 'Libellé', 'Débit', 'Crédit', 'Statut', 'Actions'].map(header => (
                                        <th key={header} className="px-5 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider first:rounded-tl-xl last:rounded-tr-xl">{header}</th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                {filteredEntries.map((entry, index) => (
                                    <tr key={entry.id} className={`border-b border-gray-200 hover:bg-gray-50 ${index === filteredEntries.length - 1 ? 'border-b-0' : ''}`}>
                                        <td className={`px-5 py-4 whitespace-nowrap border-l-4 ${entry.status === "Validée" ? 'border-green-500' : entry.status === "Équilibrée" ? `border-${themeColors.primaryStart}` : 'border-yellow-500'}`}>
                                            <div className="text-sm text-gray-900">{formatDate(entry.date)}</div>
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700">{entry.reference}</td>
                                        <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700">{entry.journal}</td>
                                        <td className="px-5 py-4 text-sm text-gray-700 max-w-xs truncate" title={entry.generalLabel}>{entry.generalLabel}</td>
                                        <td className="px-5 py-4 whitespace-nowrap text-sm text-green-600 font-semibold text-right">{formatAmount(entry.totalDebit)}</td>
                                        <td className="px-5 py-4 whitespace-nowrap text-sm text-red-600 font-semibold text-right">{formatAmount(entry.totalCredit)}</td>
                                        <td className="px-5 py-4 whitespace-nowrap text-center">
                                                <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    entry.status === 'Validée' ? 'bg-green-100 text-green-800' :
                                                        entry.status === 'Équilibrée' ? `bg-${themeColors.primaryStart} bg-opacity-10 text-${themeColors.primaryEnd}` :
                                                            'bg-yellow-100 text-yellow-800' // Brouillon
                                                }`}>
                                                    {entry.status}
                                                </span>
                                        </td>
                                        <td className="px-5 py-4 whitespace-nowrap text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button onClick={() => handleOpenViewModal(entry)} className={`${themeColors.textPrimaryStart} hover:${themeColors.textPrimaryEnd}`} title="Voir détails"><Eye size={18} /></button>
                                                {entry.status !== "Validée" && (
                                                    <button onClick={() => handleOpenEditModal(entry)} className="text-yellow-500 hover:text-yellow-600" title="Modifier"><Edit2 size={18} /></button>
                                                )}
                                                {entry.status === "Brouillon" && (
                                                    <button onClick={() => handleDeleteEntry(entry.id)} className="text-red-500 hover:text-red-600" title="Supprimer"><Trash2 size={18} /></button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center bg-white p-12 rounded-xl shadow-lg">
                            <FileText className={`${themeColors.textPrimaryEnd} h-16 w-16 mx-auto mb-4 opacity-70`} />
                            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Aucune écriture trouvée</h2>
                            <p className="text-gray-500 mb-6">
                                Essayez d'ajuster vos filtres ou créez une nouvelle écriture comptable.
                            </p>
                            <button onClick={handleOpenCreateModal}
                                    className={`px-5 py-2.5 text-white rounded-lg bg-gradient-to-r from-${themeColors.primaryStart} to-${themeColors.primaryEnd} font-semibold hover:from-${themeColors.primaryEnd} hover:to-${themeColors.primaryStart} transition-all`}>
                                Créer une écriture
                            </button>
                        </div>
                    )}

                    {(showEntryModal) && (
                        <EntryModal
                            entry={editingEntry}
                            viewMode={isViewMode}
                            onClose={() => { setShowEntryModal(false); setEditingEntry(null); setIsViewMode(false); }}
                            onSave={handleSaveEntry}
                        />
                    )}
                </div>
            </div>
        </AccountantDashBoard>
    );
}