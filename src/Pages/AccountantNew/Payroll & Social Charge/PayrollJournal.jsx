import React, { useState, useEffect } from 'react';
import { Calendar, Calculator, AlertTriangle, Download, Send, CheckCircle2, Clock } from 'lucide-react';
import {AccountantNavBar} from "../../Accountant/Components/AccountantNavBar.jsx";
import {FinancialAccountantDashBoard} from "../../AccountantNew/DashBoard.jsx";
import {FinancialAccountantNavLink} from "../NavLink.js";


export function  SocialChargesCalculator ()  {
    // État pour les données de charges sociales
    const [chargesData, setChargesData] = useState({
        masseSalariale: 45000000,
        effectif: 87,
        periode: '2025-06',
        declarations: []
    });

    // Configuration des taux des charges sociales au Cameroun
    const chargeRates = {
        cnpsSalarie: 0.042, // 4,2%
        cnpsEmployeur: 0.074, // 7,4%
        taxeFormation: 0.012, // 1,2%
        crtvMensuel: 1000 // 1000 FCFA par salarié par mois
    };

    // Calculs automatiques des charges
    const calculations = {
        cnpsEmployeeAmount: chargesData.masseSalariale * chargeRates.cnpsSalarie,
        cnpsEmployerAmount: chargesData.masseSalariale * chargeRates.cnpsEmployeur,
        trainingTaxAmount: chargesData.masseSalariale * chargeRates.taxeFormation,
        crtvAmount: chargesData.effectif * chargeRates.crtvMensuel,
        get totalCnps() {
            return this.cnpsEmployeeAmount + this.cnpsEmployerAmount;
        },
        get totalCharges() {
            return this.totalCnps + this.trainingTaxAmount + this.crtvAmount;
        }
    };

    // Échéances de déclaration selon la réglementation camerounaise
    const [deadlines, setDeadlines] = useState([
        {
            id: 1,
            type: 'CNPS',
            description: 'Déclaration et paiement CNPS',
            deadline: '2025-07-15',
            amount: calculations.totalCnps,
            status: 'pending',
            priority: 'high'
        },
        {
            id: 2,
            type: 'Formation',
            description: 'Taxe de formation professionnelle',
            deadline: '2025-07-31',
            amount: calculations.trainingTaxAmount,
            status: 'pending',
            priority: 'medium'
        },
        {
            id: 3,
            type: 'CRTV',
            description: 'Redevance audiovisuelle CRTV',
            deadline: '2025-07-10',
            amount: calculations.crtvAmount,
            status: 'pending',
            priority: 'high'
        }
    ]);

    // Structure détaillée des charges sociales
    const chargesBreakdown = [
        {
            category: 'CNPS - Caisse Nationale de Prévoyance Sociale',
            items: [
                {
                    label: 'Cotisation salarié',
                    rate: '4,2%',
                    base: chargesData.masseSalariale,
                    amount: calculations.cnpsEmployeeAmount,
                    payedBy: 'Retenue sur salaire'
                },
                {
                    label: 'Cotisation employeur',
                    rate: '7,4%',
                    base: chargesData.masseSalariale,
                    amount: calculations.cnpsEmployerAmount,
                    payedBy: 'Charge employeur'
                }
            ]
        },
        {
            category: 'Taxes Obligatoires',
            items: [
                {
                    label: 'Taxe formation professionnelle',
                    rate: '1,2%',
                    base: chargesData.masseSalariale,
                    amount: calculations.trainingTaxAmount,
                    payedBy: 'Charge employeur'
                },
                {
                    label: 'CRTV - Redevance audiovisuelle',
                    rate: '1 000 FCFA/salarié/mois',
                    base: chargesData.effectif,
                    amount: calculations.crtvAmount,
                    payedBy: 'Charge employeur'
                }
            ]
        }
    ];

    // Fonction de formatage des montants
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XAF',
            minimumFractionDigits: 0
        }).format(amount).replace('XAF', 'FCFA');
    };

    // Fonction pour formater les dates
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    // Calculer les jours restants avant échéance
    const getDaysUntilDeadline = (deadline) => {
        const today = new Date();
        const deadlineDate = new Date(deadline);
        const diffTime = deadlineDate.getTime() - today.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    // Obtenir la couleur de priorité selon l'échéance
    const getPriorityColor = (deadline) => {
        const days = getDaysUntilDeadline(deadline);
        if (days <= 5) return 'text-red-600 bg-red-50';
        if (days <= 15) return 'text-orange-600 bg-orange-50';
        return 'text-green-600 bg-green-50';
    };

    // Générer la déclaration CNPS
    const generateCnpsDeclaration = () => {
        const declaration = {
            periode: chargesData.periode,
            effectif: chargesData.effectif,
            masseSalariale: chargesData.masseSalariale,
            cotisationSalarie: calculations.cnpsEmployeeAmount,
            cotisationEmployeur: calculations.cnpsEmployerAmount,
            total: calculations.totalCnps,
            dateGeneration: new Date().toISOString()
        };

        // Simulation de génération du bordereau
        alert(`Bordereau CNPS généré pour ${formatCurrency(calculations.totalCnps)}`);

        // Marquer comme traité
        setDeadlines(prev => prev.map(d =>
            d.type === 'CNPS' ? { ...d, status: 'generated' } : d
        ));
    };

    // Mettre à jour les calculs quand les données changent
    const updateMasseSalariale = (newAmount) => {
        setChargesData(prev => ({ ...prev, masseSalariale: newAmount }));
    };

    const updateEffectif = (newCount) => {
        setChargesData(prev => ({ ...prev, effectif: newCount }));
    };

    return (
        <FinancialAccountantDashBoard linkList={FinancialAccountantNavLink} requiredRole={"Accountant"}>
            <AccountantNavBar></AccountantNavBar>
        <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
            {/* En-tête */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Calculator className="h-8 w-8 text-purple-600" />
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Charges Sociales</h1>
                            <p className="text-gray-600">Calculs automatiques et échéances de déclaration</p>
                        </div>
                    </div>

                    <div className="text-right">
                        <p className="text-sm text-gray-500">Période de paie</p>
                        <p className="text-lg font-semibold">{chargesData.periode}</p>
                    </div>
                </div>
            </div>

            {/* Paramètres de calcul */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Paramètres de Calcul</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Masse salariale brute (FCFA)
                        </label>
                        <input
                            type="number"
                            value={chargesData.masseSalariale}
                            onChange={(e) => updateMasseSalariale(parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre de salariés
                        </label>
                        <input
                            type="number"
                            value={chargesData.effectif}
                            onChange={(e) => updateEffectif(parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                </div>
            </div>

            {/* Récapitulatif des charges */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="text-center">
                        <p className="text-sm text-gray-600">Total CNPS</p>
                        <p className="text-2xl font-bold text-blue-600">{formatCurrency(calculations.totalCnps)}</p>
                        <p className="text-xs text-gray-500">Salarié + Employeur</p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="text-center">
                        <p className="text-sm text-gray-600">Taxe Formation</p>
                        <p className="text-2xl font-bold text-green-600">{formatCurrency(calculations.trainingTaxAmount)}</p>
                        <p className="text-xs text-gray-500">1,2% masse salariale</p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="text-center">
                        <p className="text-sm text-gray-600">CRTV</p>
                        <p className="text-2xl font-bold text-orange-600">{formatCurrency(calculations.crtvAmount)}</p>
                        <p className="text-xs text-gray-500">{chargesData.effectif} × 1 000 FCFA</p>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="text-center">
                        <p className="text-sm text-gray-600">Total Charges</p>
                        <p className="text-2xl font-bold text-purple-600">{formatCurrency(calculations.totalCharges)}</p>
                        <p className="text-xs text-gray-500">Toutes charges comprises</p>
                    </div>
                </div>
            </div>

            {/* Détail des charges sociales */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Détail des Charges Sociales</h2>

                <div className="space-y-6">
                    {chargesBreakdown.map((category, categoryIndex) => (
                        <div key={categoryIndex}>
                            <h3 className="font-semibold text-gray-900 mb-3">{category.category}</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2">Type de charge</th>
                                        <th className="text-left py-2">Taux</th>
                                        <th className="text-right py-2">Base de calcul</th>
                                        <th className="text-right py-2">Montant</th>
                                        <th className="text-left py-2">Prise en charge</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {category.items.map((item, itemIndex) => (
                                        <tr key={itemIndex} className="border-b hover:bg-gray-50">
                                            <td className="py-2">{item.label}</td>
                                            <td className="py-2 font-mono">{item.rate}</td>
                                            <td className="py-2 text-right">
                                                {typeof item.base === 'number' ? formatCurrency(item.base) : item.base}
                                            </td>
                                            <td className="py-2 text-right font-semibold">{formatCurrency(item.amount)}</td>
                                            <td className="py-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                              item.payedBy.includes('employeur') ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {item.payedBy}
                          </span>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Échéances de déclaration */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Échéances de Déclaration</h2>
                    <Calendar className="h-6 w-6 text-gray-400" />
                </div>

                <div className="space-y-4">
                    {deadlines.map((deadline) => {
                        const daysLeft = getDaysUntilDeadline(deadline.deadline);
                        const priorityClass = getPriorityColor(deadline.deadline);

                        return (
                            <div key={deadline.id} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3">
                                            <h3 className="font-semibold text-gray-900">{deadline.type}</h3>
                                            <span className={`px-2 py-1 rounded text-xs ${priorityClass}`}>
                        {daysLeft > 0 ? `${daysLeft} jours restants` : 'Échéance dépassée'}
                      </span>
                                        </div>
                                        <p className="text-gray-600 mt-1">{deadline.description}</p>
                                        <div className="flex items-center space-x-4 mt-2">
                      <span className="text-sm text-gray-500">
                        Échéance : {formatDate(deadline.deadline)}
                      </span>
                                            <span className="text-sm font-semibold">
                        Montant : {formatCurrency(deadline.amount)}
                      </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        {deadline.status === 'pending' && (
                                            <>
                                                {deadline.type === 'CNPS' && (
                                                    <button
                                                        onClick={generateCnpsDeclaration}
                                                        className="flex items-center px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                                    >
                                                        <Download className="h-4 w-4 mr-1" />
                                                        Générer Bordereau
                                                    </button>
                                                )}
                                                <button className="flex items-center px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                                                    <Send className="h-4 w-4 mr-1" />
                                                    Déclarer
                                                </button>
                                            </>
                                        )}

                                        {deadline.status === 'generated' && (
                                            <div className="flex items-center text-green-600">
                                                <CheckCircle2 className="h-5 w-5 mr-1" />
                                                Bordereau généré
                                            </div>
                                        )}

                                        {deadline.status === 'completed' && (
                                            <div className="flex items-center text-green-600">
                                                <CheckCircle2 className="h-5 w-5 mr-1" />
                                                Déclaré
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Alerte échéances proches */}
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
                        <div>
                            <h4 className="font-medium text-yellow-800">Rappel échéances</h4>
                            <p className="text-sm text-yellow-700">
                                {deadlines.filter(d => getDaysUntilDeadline(d.deadline) <= 15).length} déclaration(s)
                                à effectuer dans les 15 prochains jours
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </FinancialAccountantDashBoard>
    );
};

