// CHEMIN : src/Pages/AccountantNew/FinancialAccountingContext.jsx

import { useState, useMemo } from 'react';
import constate from 'constate';
import { v4 as uuidv4 } from 'uuid';

// Import des données initiales
import {
    initialChartOfAccounts,
    initialJournalEntries,
    initialJournalTypes
} from './data.js';

// 1. Définir le hook qui gère l'état
function useFinancialAccountingState() {
    // === DÉCLARATION DES ÉTATS ===
    const [chartOfAccounts, setChartOfAccounts] = useState(initialChartOfAccounts);
    const [journalEntries, setJournalEntries] = useState(initialJournalEntries);
    const [journalTypes, setJournalTypes] = useState(initialJournalTypes);

    // === FONCTIONS DE LOGIQUE MÉTIER ===

    // --- Logique pour le Plan Comptable ---
    const addAccount = (newAccountData) => {
        const newAccount = {
            ...newAccountData,
            id: `acc-${uuidv4()}`,
            balance: 0,
            isActive: true,
            createdDate: new Date().toISOString(),
            lastUsed: null
        };
        setChartOfAccounts(prev => [...prev, newAccount]);
        console.log("Account added:", newAccount);
    };

    const updateAccount = (accountId, updatedData) => {
        setChartOfAccounts(prev =>
            prev.map(acc => (acc.id === accountId ? { ...acc, ...updatedData } : acc))
        );
        console.log("Account updated:", accountId);
    };

    // --- Logique pour les Écritures Comptables ---
    const addJournalEntry = (newEntryData) => {
        const newEntry = {
            ...newEntryData,
            id: `entry-${uuidv4()}`,
            status: 'Brouillon' // Toujours en brouillon à la création
        };
        setJournalEntries(prev => [newEntry, ...prev]);
        console.log("Journal entry added:", newEntry);
    };

    const updateJournalEntry = (entryId, updatedData) => {
        setJournalEntries(prev =>
            prev.map(entry => (entry.id === entryId ? { ...entry, ...updatedData } : entry))
        );
        console.log("Journal entry updated:", entryId);
    };

    const validateJournalEntry = (entryId) => {
        const entry = journalEntries.find(e => e.id === entryId);
        if (entry && entry.totalDebit === entry.totalCredit && entry.totalDebit > 0) {
            updateJournalEntry(entryId, { status: 'Validée', validatedAt: new Date().toISOString() });

            // Mettre à jour les soldes des comptes (logique simplifiée)
            entry.lines.forEach(line => {
                const debitAmount = parseFloat(line.debit) || 0;
                const creditAmount = parseFloat(line.credit) || 0;

                setChartOfAccounts(prevAccounts => prevAccounts.map(acc => {
                    if (acc.id === line.accountId) {
                        // Pour un compte d'Actif ou de Charge, un débit augmente le solde.
                        // Pour un compte de Passif ou de Produit, un crédit augmente le solde (convention de signe).
                        // Nous allons simplement additionner/soustraire pour la simulation.
                        const newBalance = acc.balance + debitAmount - creditAmount;
                        return { ...acc, balance: newBalance, lastUsed: new Date().toISOString() };
                    }
                    return acc;
                }));
            });
            console.log("Balances updated for entry:", entryId);

        } else {
            alert("Impossible de valider une écriture déséquilibrée.");
        }
    };


    // 2. Renvoyer les données et fonctions via un objet mémoïsé
    return useMemo(() => ({
        // Données
        chartOfAccounts,
        journalEntries,
        journalTypes,
        // Fonctions
        addAccount,
        updateAccount,
        addJournalEntry,
        updateJournalEntry,
        validateJournalEntry
    }), [chartOfAccounts, journalEntries, journalTypes]);
}

// 3. Créer le Provider et le Hook personnalisé avec constate
export const [FinancialAccountingProvider, useFinancialAccounting] = constate(useFinancialAccountingState);