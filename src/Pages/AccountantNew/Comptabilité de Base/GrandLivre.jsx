// CHEMIN : src/Pages/AccountantNew/Comptabilité de Base/GrandLivre.jsx

import { useState, useMemo } from 'react';
import { Calculator, BarChart3, Search, Download, Eye, Layers, CheckCircle2, AlertTriangle, TrendingUp, TrendingDown, Minus, ArrowLeft } from 'lucide-react';
import { AccountantDashBoard } from "../../Accountant/Components/AccountantDashboard.jsx";
import { FinancialAccountantNavLink } from "../NavLink.js";
import { AccountantNavBar } from "../../Accountant/Components/AccountantNavBar.jsx";
import { useFinancialAccounting } from "../FinancialAccountingContext.jsx"; // === MODIFICATION ===

export function GrandLivreBalance() {
    // === MODIFICATION : Récupération des données depuis le contexte ===
    const { chartOfAccounts, journalEntries } = useFinancialAccounting();

    const [activeView, setActiveView] = useState('balance');
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClass, setSelectedClass] = useState('all');

    // Calcule les mouvements et les soldes pour chaque compte
    const accountsWithMovements = useMemo(() => {
        return chartOfAccounts.map(account => {
            const movements = journalEntries
                .filter(entry => entry.status === 'Validée') // Uniquement les écritures validées
                .flatMap(entry => entry.lines.filter(line => line.accountId === account.id)
                    .map(line => ({ ...line, entryDate: entry.date, entryRef: entry.reference, entryLabel: entry.generalLabel }))
                );

            const totalDebit = movements.reduce((sum, move) => sum + (parseFloat(move.debit) || 0), 0);
            const totalCredit = movements.reduce((sum, move) => sum + (parseFloat(move.credit) || 0), 0);
            const solde = totalDebit - totalCredit;

            return { ...account, movements, totalDebit, totalCredit, solde };
        });
    }, [chartOfAccounts, journalEntries]);

    // Filtrage pour la vue "Balance"
    const filteredBalance = accountsWithMovements.filter(account => {
        const matchesSearch = account.code.includes(searchTerm) || account.label.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesClass = selectedClass === 'all' || account.class.toString() === selectedClass;
        return matchesSearch && matchesClass;
    });

    const totalDebitBalance = filteredBalance.reduce((sum, acc) => sum + acc.totalDebit, 0);
    const totalCreditBalance = filteredBalance.reduce((sum, acc) => sum + acc.totalCredit, 0);

    const handleAccountClick = (account) => {
        setSelectedAccount(account);
        setActiveView('ledger');
    };

    const classesComptes = [
        { value: 'all', label: 'Toutes les classes', color: 'bg-gray-500' },
        { value: '1', label: 'Classe 1 - Capitaux', color: 'bg-blue-500' },
        { value: '2', label: 'Classe 2 - Immobilisations', color: 'bg-green-500' },
        { value: '3', label: 'Classe 3 - Stocks', color: 'bg-yellow-500' },
        { value: '4', label: 'Classe 4 - Tiers', color: 'bg-purple-500' },
        { value: '5', label: 'Classe 5 - Trésorerie', color: 'bg-indigo-500' },
        { value: '6', label: 'Classe 6 - Charges', color: 'bg-red-500' },
        { value: '7', label: 'Classe 7 - Produits', color: 'bg-emerald-500' }
    ];

    return (
        <AccountantDashBoard linkList={FinancialAccountantNavLink} requiredRole={"Accountant"}>
            <AccountantNavBar />
            <div className="min-h-screen p-4">
                <div className="ml-5 bg-gradient-to-r from-primary-end to-primary-start rounded-xl text-white p-6 md:p-8 mb-8 shadow-xl">
                    <h1 className="text-3xl font-bold mb-1">Grand Livre & Balance</h1>
                    <p className="opacity-90 text-sm">Consultez les soldes et les mouvements détaillés de chaque compte.</p>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

                    {/* === VUE BALANCE GÉNÉRALE === */}
                    {activeView === 'balance' && (
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                            {/* Sidebar - Filtres */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Filtres</h3>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Rechercher</label>
                                        <div className="relative"><Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Code ou libellé..." className="w-full pl-10 pr-4 py-2 border rounded-lg" /></div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Classe de comptes</label>
                                        <div className="space-y-2">{classesComptes.map((classe) => (<button key={classe.value} onClick={() => setSelectedClass(classe.value)} className={`w-full flex items-center p-2 rounded-lg text-sm ${selectedClass === classe.value ? `${classe.color} text-white` : 'hover:bg-gray-100'}`}><div className={`w-3 h-3 rounded-full ${classe.color} mr-3`}></div>{classe.label}</button>))}</div>
                                    </div>
                                </div>
                            </div>
                            {/* Table Balance */}
                            <div className="lg:col-span-3">
                                <div className="bg-white rounded-xl shadow-sm border">
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Compte</th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Débit</th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Crédit</th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Solde</th>
                                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Action</th>
                                            </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredBalance.map((account) => (
                                                <tr key={account.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleAccountClick(account)}>
                                                    <td className="px-6 py-4"><div className="text-sm font-medium text-gray-900">{account.code}</div><div className="text-sm text-gray-600">{account.label}</div></td>
                                                    <td className="px-6 py-4 text-right text-sm">{account.totalDebit > 0 ? account.totalDebit.toLocaleString() : '-'}</td>
                                                    <td className="px-6 py-4 text-right text-sm">{account.totalCredit > 0 ? account.totalCredit.toLocaleString() : '-'}</td>
                                                    <td className="px-6 py-4 text-right text-sm font-medium"><span className={account.solde >= 0 ? 'text-green-600' : 'text-red-600'}>{Math.abs(account.solde).toLocaleString()} {account.solde < 0 ? '(Cr)' : '(Db)'}</span></td>
                                                    <td className="px-6 py-4 text-center"><button className="text-primary-end hover:text-teal-800"><Eye className="w-4 h-4" /></button></td>
                                                </tr>
                                            ))}
                                            </tbody>
                                            <tfoot className="bg-gray-100 font-bold">
                                            <tr>
                                                <td className="px-6 py-4">TOTAUX</td>
                                                <td className="px-6 py-4 text-right">{totalDebitBalance.toLocaleString()}</td>
                                                <td className="px-6 py-4 text-right">{totalCreditBalance.toLocaleString()}</td>
                                                <td className="px-6 py-4 text-right" colSpan={2}>{totalDebitBalance === totalCreditBalance ? <span className="text-green-600 flex items-center justify-end"><CheckCircle2 className="mr-2"/>Équilibré</span> : <span className="text-red-600 flex items-center justify-end"><AlertTriangle className="mr-2"/>Déséquilibré</span>}</td>
                                            </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* === VUE GRAND LIVRE D'UN COMPTE === */}
                    {activeView === 'ledger' && selectedAccount && (
                        <div className="bg-white rounded-xl shadow-sm border">
                            <div className="p-6 border-b">
                                <button onClick={() => setActiveView('balance')} className="flex items-center text-primary-end mb-4"><ArrowLeft className="mr-2"/>Retour à la Balance</button>
                                <h3 className="text-xl font-semibold">{selectedAccount.code} - {selectedAccount.label}</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Réf.</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Libellé</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Débit</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Crédit</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {selectedAccount.movements.map((move, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 text-sm">{new Date(move.entryDate).toLocaleDateString('fr-FR')}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{move.entryRef}</td>
                                            <td className="px-6 py-4 text-sm">{move.lineLabel || move.entryLabel}</td>
                                            <td className="px-6 py-4 text-right text-sm">{move.debit || '-'}</td>
                                            <td className="px-6 py-4 text-right text-sm">{move.credit || '-'}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                    <tfoot className="bg-gray-100 font-bold">
                                    <tr>
                                        <td colSpan={3} className="px-6 py-4">Solde final</td>
                                        <td className="px-6 py-4 text-right">{selectedAccount.totalDebit.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-right">{selectedAccount.totalCredit.toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3} className="px-6 py-4">Solde</td>
                                        <td colSpan={2} className={`px-6 py-4 text-right ${selectedAccount.solde >= 0 ? 'text-green-600' : 'text-red-600'}`}>{Math.abs(selectedAccount.solde).toLocaleString()} {selectedAccount.solde < 0 ? '(Cr)' : '(Db)'}</td>
                                    </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AccountantDashBoard>
    );
}