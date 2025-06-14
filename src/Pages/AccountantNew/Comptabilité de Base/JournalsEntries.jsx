// CHEMIN : src/Pages/AccountantNew/Comptabilité de Base/JournalsEntries.jsx

import { useState, useEffect } from "react";
import { Search, Plus, Edit2, Trash2, Eye, BookOpen, CheckCircle, FileText, TrendingDown, TrendingUp, AlertTriangle, Save, Send, Filter, X } from "lucide-react";
import { AccountantDashBoard } from "../../Accountant/Components/AccountantDashboard.jsx";
import { v4 as uuidv4 } from 'uuid';
import { FinancialAccountantNavLink } from "../NavLink.js";
import { AccountantNavBar } from "../../Accountant/Components/AccountantNavBar.jsx";
import { useFinancialAccounting } from "../FinancialAccountingContext.jsx";

const themeColors = {
    primaryEnd: 'from-teal-600 to-teal-800',
    primaryStart: 'from-teal-500 to-teal-700',
    focusRing: 'focus:ring-teal-500',
    textPrimaryEnd: 'text-teal-800',
};

// ================== SOUS-COMPOSANT POUR LE MODAL ==================
function EntryModal({ entry, onClose, onSave, onValidate, viewMode, chartOfAccounts, journalTypes }) {
    const [formData, setFormData] = useState({
        journal: entry?.journal || "OD",
        date: entry?.date || new Date().toISOString().split('T')[0],
        reference: entry?.reference || "",
        generalLabel: entry?.generalLabel || "",
        lines: entry?.lines || [{ id: uuidv4(), accountId: "", lineLabel: "", debit: "", credit: "" }],
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

    useEffect(() => {
        if(entry) {
            setFormData(entry);
        } else {
            setFormData({
                journal: "OD",
                date: new Date().toISOString().split('T')[0],
                reference: "",
                generalLabel: "",
                lines: [{ id: uuidv4(), accountId: "", lineLabel: "", debit: "", credit: "" }],
                status: "Brouillon"
            });
        }
    }, [entry]);


    const handleInputChange = (e, field) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleLineChange = (index, field, value) => {
        const newLines = [...formData.lines];
        newLines[index][field] = value;
        if (field === "debit" && value !== "") newLines[index].credit = "";
        if (field === "credit" && value !== "") newLines[index].debit = "";
        setFormData(prev => ({ ...prev, lines: newLines }));
    };

    const addLine = () => {
        if (viewMode || formData.status === "Validée") return;
        setFormData(prev => ({ ...prev, lines: [...prev.lines, { id: uuidv4(), accountId: "", lineLabel: "", debit: "", credit: "" }] }));
    };

    const removeLine = (index) => {
        if (viewMode || formData.status === "Validée" || formData.lines.length <= 1) return;
        setFormData(prev => ({ ...prev, lines: formData.lines.filter((_, i) => i !== index) }));
    };

    const handleSubmit = () => {
        if (viewMode) { onClose(); return; }
        if (!formData.journal || !formData.date || !formData.reference || !formData.generalLabel) {
            alert("Veuillez remplir les informations générales.");
            return;
        }
        onSave({ ...formData, totalDebit, totalCredit });
    };

    const handleValidate = () => {
        if (!isBalanced) {
            alert("L'écriture doit être équilibrée pour être validée.");
            return;
        }
        onValidate(entry.id);
    };

    const canEdit = !viewMode && formData.status !== "Validée";
    const formatAmount = (amount) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XAF', minimumFractionDigits: 0 }).format(amount);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="flex items-center justify-between mb-8">
                    <h2 className={`text-3xl font-bold ${themeColors.textPrimaryEnd}`}>
                        {viewMode ? "Détail de l'écriture" : (entry?.id ? "Modifier l'écriture" : "➕ Nouvelle écriture comptable")}
                    </h2>
                    {formData.status === "Validée" && <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">Validée</span>}
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 transition-colors"><X/></button>
                </div>

                <div className="flex-grow overflow-y-auto pr-2 space-y-6">
                    <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-xl border border-teal-200">
                        <h3 className="text-lg font-semibold text-teal-800 mb-4 flex items-center"><BookOpen size={20} className="mr-2" />Informations générales</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="text" placeholder="N° Pièce" value={formData.reference} onChange={(e) => handleInputChange(e, 'reference')} disabled={!canEdit} className={`w-full px-4 py-3 border border-gray-300 rounded-xl ${themeColors.focusRing} ${!canEdit ? 'bg-gray-100' : ''}`} />
                            <input type="date" value={formData.date} onChange={(e) => handleInputChange(e, 'date')} disabled={!canEdit} className={`w-full px-4 py-3 border border-gray-300 rounded-xl ${themeColors.focusRing} ${!canEdit ? 'bg-gray-100' : ''}`} />
                            <input type="text" placeholder="Libellé général" value={formData.generalLabel} onChange={(e) => handleInputChange(e, 'generalLabel')} disabled={!canEdit} className={`w-full px-4 py-3 border border-gray-300 rounded-xl ${themeColors.focusRing} ${!canEdit ? 'bg-gray-100' : ''}`} />
                            <select value={formData.journal} onChange={(e) => handleInputChange(e, 'journal')} disabled={!canEdit} className={`w-full px-4 py-3 border border-gray-300 rounded-xl ${themeColors.focusRing} ${!canEdit ? 'bg-gray-100' : ''}`}>
                                {journalTypes.map(jt => <option key={jt.code} value={jt.code}>{jt.code} - {jt.name}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center"><TrendingUp size={20} className="mr-2 text-teal-600" />Lignes d'écriture</h3>
                            {canEdit && <button type="button" onClick={addLine} className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-medium"><Plus size={18} className="mr-2" />Ajouter</button>}
                        </div>
                        <div className="space-y-4">
                            {formData.lines.map((line, index) => (
                                <div key={line.id} className="grid grid-cols-12 gap-3 items-center p-4 bg-gray-50 rounded-xl border">
                                    <div className="col-span-12 md:col-span-3">
                                        <select value={line.accountId} disabled={!canEdit} onChange={(e) => handleLineChange(index, 'accountId', e.target.value)} className={`w-full px-3 py-2 border border-gray-300 rounded-lg text-sm ${themeColors.focusRing} ${!canEdit ? 'bg-gray-100' : ''}`}>
                                            <option value="">Choisir un compte</option>
                                            {chartOfAccounts.map(acc => <option key={acc.id} value={acc.id}>{acc.code} - {acc.label}</option>)}
                                        </select>
                                    </div>
                                    <input type="text" placeholder="Libellé" value={line.lineLabel} disabled={!canEdit} onChange={(e) => handleLineChange(index, 'lineLabel', e.target.value)} className={`col-span-12 md:col-span-4 px-3 py-2 border border-gray-300 rounded-lg text-sm ${themeColors.focusRing} ${!canEdit ? 'bg-gray-100' : ''}`} />
                                    <input type="number" placeholder="Débit" value={line.debit} disabled={!canEdit} onChange={(e) => handleLineChange(index, 'debit', e.target.value)} className={`col-span-5 md:col-span-2 px-3 py-2 border border-gray-300 rounded-lg text-sm text-right ${themeColors.focusRing} ${!canEdit ? 'bg-gray-100' : ''}`} />
                                    <input type="number" placeholder="Crédit" value={line.credit} disabled={!canEdit} onChange={(e) => handleLineChange(index, 'credit', e.target.value)} className={`col-span-5 md:col-span-2 px-3 py-2 border border-gray-300 rounded-lg text-sm text-right ${themeColors.focusRing} ${!canEdit ? 'bg-gray-100' : ''}`} />
                                    {canEdit && <button type="button" onClick={() => removeLine(index)} className="col-span-2 md:col-span-1 text-red-500 hover:text-red-700 p-2 rounded-lg" title="Supprimer"><Trash2 size={18} /></button>}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 border rounded-xl p-6">
                        <div className="flex justify-between items-center text-lg font-semibold mb-4">
                            <span className="flex items-center"><TrendingUp size={20} className="mr-2 text-green-600" />Total Débit: <span className="text-green-600 ml-2">{formatAmount(totalDebit)}</span></span>
                            <span className="flex items-center"><TrendingDown size={20} className="mr-2 text-red-600" />Total Crédit: <span className="text-red-600 ml-2">{formatAmount(totalCredit)}</span></span>
                        </div>
                        <div className={`text-center font-bold p-4 rounded-xl ${isBalanced ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {isBalanced ? <div className="flex items-center justify-center"><CheckCircle size={24} className="mr-2" />Écriture Équilibrée</div> : <div className="flex items-center justify-center"><AlertTriangle size={24} className="mr-2" />Déséquilibre: {formatAmount(totalDebit - totalCredit)}</div>}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 mt-auto">
                    <button type="button" onClick={onClose} className="px-6 py-3 border rounded-xl text-gray-700 hover:bg-gray-100 font-medium">Fermer</button>
                    {canEdit && <button type="button" onClick={handleSubmit} className="flex items-center px-6 py-3 border rounded-xl text-teal-600 hover:bg-teal-50 font-medium"><Save size={18} className="mr-2" />Sauvegarder</button>}
                    {canEdit && entry && <button type="button" onClick={handleValidate} disabled={!isBalanced} className="flex items-center px-6 py-3 text-white rounded-xl bg-gradient-to-r from-teal-600 to-teal-800 font-semibold hover:from-teal-700 disabled:opacity-50"><Send size={18} className="mr-2" />Valider</button>}
                </div>
            </div>
        </div>
    );
}

// ======================================================================

export function JournalEntries() {
    const { journalEntries, journalTypes, chartOfAccounts, addJournalEntry, updateJournalEntry, validateJournalEntry } = useFinancialAccounting();

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [journalFilter, setJournalFilter] = useState("");
    const [editingEntry, setEditingEntry] = useState(null);
    const [isViewMode, setIsViewMode] = useState(false);
    const [showEntryModal, setShowEntryModal] = useState(false);

    const filteredEntries = journalEntries.filter(entry => {
        const matchesSearch = entry.reference.toLowerCase().includes(searchTerm.toLowerCase()) || entry.generalLabel.toLowerCase().includes(searchTerm.toLowerCase());
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

    const handleSaveEntry = (entryData) => {
        let newStatus = 'Brouillon';
        if (entryData.totalDebit === entryData.totalCredit && entryData.totalDebit > 0) {
            newStatus = "Équilibrée";
        }
        if (editingEntry) {
            updateJournalEntry(editingEntry.id, { ...entryData, status: newStatus });
        } else {
            addJournalEntry({ ...entryData, status: newStatus });
        }
        setShowEntryModal(false);
    };

    const handleDeleteEntry = (entryId) => alert("Fonction de suppression à implémenter dans le contexte.");
    const formatAmount = (amount) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XAF', minimumFractionDigits: 0 }).format(amount);
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });

    return (
        <AccountantDashBoard linkList={FinancialAccountantNavLink} requiredRole={"Accountant"}>
            <AccountantNavBar />
            <div className="bg-white min-h-screen p-4 md:p-8">
                <div className="max-w-full mx-auto">
                    <div className={`bg-gradient-to-r ${themeColors.primaryEnd} ${themeColors.primaryStart} rounded-2xl text-white p-8 mb-8 shadow-2xl`}>
                        <h1 className="text-4xl font-bold mb-2 flex items-center">Saisie des Écritures Comptables</h1>
                        <p className="opacity-90 text-lg">Enregistrez et gérez les opérations financières.</p>
                        <button onClick={handleOpenCreateModal} className="mt-6 flex items-center px-6 py-3 bg-white text-teal-700 rounded-xl font-semibold shadow-lg hover:bg-gray-50"><Plus className="h-6 w-6 mr-2" />Nouvelle Écriture</button>
                    </div>

                    <div className="bg-gray-100 rounded-2xl shadow-xl p-6 mb-8">
                        <div className="flex items-center mb-4"><Filter className="h-6 w-6 text-primary-end mr-2" /><h2 className="text-xl font-semibold text-gray-800">Filtres</h2></div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <input type="text" placeholder="Rechercher..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-end" />
                            <select value={journalFilter} onChange={(e) => setJournalFilter(e.target.value)} className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-end"><option value="">Tous les journaux</option>{journalTypes.map(jt => <option key={jt.code} value={jt.code}>{jt.name} ({jt.code})</option>)}</select>
                            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-end"><option value="">Tous les statuts</option><option value="Brouillon">Brouillon</option><option value="Équilibrée">Équilibrée</option><option value="Validée">Validée</option></select>
                        </div>
                    </div>

                    {filteredEntries.length > 0 ? (
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                            <table className="w-full">
                                <thead className={`bg-gradient-to-r ${themeColors.primaryEnd} ${themeColors.primaryStart}`}>
                                <tr>{['Date', 'N° Pièce', 'Journal', 'Libellé', 'Débit', 'Crédit', 'Statut', 'Actions'].map(header => <th key={header} className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">{header}</th>)}</tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {filteredEntries.map(entry => (
                                    <tr key={entry.id} className="hover:bg-teal-50">
                                        <td className="px-6 py-4">{formatDate(entry.date)}</td>
                                        <td className="px-6 py-4">{entry.reference}</td>
                                        <td className="px-6 py-4"><span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">{entry.journal}</span></td>
                                        <td className="px-6 py-4 max-w-xs truncate">{entry.generalLabel}</td>
                                        <td className="px-6 py-4 text-green-600 font-bold text-right">{formatAmount(entry.totalDebit)}</td>
                                        <td className="px-6 py-4 text-red-600 font-bold text-right">{formatAmount(entry.totalCredit)}</td>
                                        <td className="px-6 py-4"><span className={`px-4 py-2 text-sm font-semibold rounded-full ${entry.status === 'Validée' ? 'bg-green-100 text-green-800' : entry.status === 'Équilibrée' ? 'bg-teal-100 text-teal-800' : 'bg-yellow-100 text-yellow-800'}`}>{entry.status}</span></td>
                                        <td className="px-6 py-4"><div className="flex gap-3">{<button onClick={() => handleOpenViewModal(entry)} title="Voir"><Eye/></button>}{entry.status !== "Validée" && <button onClick={() => handleOpenEditModal(entry)} title="Modifier"><Edit2/></button>}{entry.status === "Brouillon" && <button onClick={() => handleDeleteEntry(entry.id)} title="Supprimer"><Trash2/></button>}</div></td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center bg-white p-16 rounded-2xl shadow-xl">
                            <FileText className="h-24 w-24 mx-auto text-primary-end opacity-70" />
                            <h2 className="text-3xl font-bold text-teal-700 mb-4">Aucune écriture trouvée</h2>
                            <p className="text-gray-600 mb-8 text-lg">Créez votre première écriture ou ajustez vos filtres.</p>
                            <button onClick={handleOpenCreateModal} className={`inline-flex items-center px-8 py-4 text-white rounded-xl bg-gradient-to-r ${themeColors.primaryEnd} ${themeColors.primaryStart} font-semibold`}><Plus size={24} className="mr-3" />Créer une écriture</button>
                        </div>
                    )}

                    {showEntryModal && (
                        <EntryModal
                            entry={editingEntry}
                            viewMode={isViewMode}
                            onClose={() => setShowEntryModal(false)}
                            onSave={handleSaveEntry}
                            onValidate={validateJournalEntry}
                            chartOfAccounts={chartOfAccounts}
                            journalTypes={journalTypes}
                        />
                    )}
                </div>
            </div>
        </AccountantDashBoard>
    );
}