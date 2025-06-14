// CHEMIN : src/Pages/AccountantNew/data.js

// Données de simulation centralisées pour la comptabilité financière

// 1. Plan Comptable OHADA
export const initialChartOfAccounts = [
    { id: 'acc-1', code: "2154", label: "Équipements de radiologie", class: "2", type: "Actif", balance: 125000, isActive: true, createdDate: "2024-01-15T10:30:00Z", lastUsed: "2024-06-10T14:20:00Z" },
    { id: 'acc-2', code: "7011", label: "Consultations médicales", class: "7", type: "Produit", balance: 45000, isActive: true, createdDate: "2024-01-10T08:15:00Z", lastUsed: "2024-06-14T09:30:00Z" },
    { id: 'acc-3', code: "4111", label: "Clients", class: "4", type: "Actif", balance: 15000, isActive: true, createdDate: "2024-02-01T11:45:00Z", lastUsed: "2024-06-13T16:10:00Z" },
    { id: 'acc-4', code: "6011", label: "Achats de médicaments", class: "6", type: "Charge", balance: 28000, isActive: true, createdDate: "2024-01-20T14:00:00Z", lastUsed: "2024-06-12T11:25:00Z" },
    { id: 'acc-5', code: "5121", label: "Banque BICEC", class: "5", type: "Actif", balance: 85000, isActive: true, createdDate: "2024-01-05T09:20:00Z", lastUsed: "2024-06-14T08:45:00Z" },
    { id: 'acc-6', code: "6132", label: "Loyers", class: "6", type: "Charge", balance: 500000, isActive: true, createdDate: "2024-01-01T09:00:00Z", lastUsed: "2024-07-01T10:00:00Z" }
];

// 2. Types de Journaux Comptables
export const initialJournalTypes = [
    { code: "AC", name: "Achats" },
    { code: "VT", name: "Ventes" },
    { code: "BQ", name: "Banque" },
    { code: "OD", name: "Opérations Diverses" },
];

// 3. Écritures Comptables
export const initialJournalEntries = [
    {
        id: 'entry-1',
        journal: "OD",
        date: "2024-07-20",
        reference: "LOY-2024-07",
        generalLabel: "Loyer juillet 2024",
        status: "Validée",
        totalDebit: 500000,
        totalCredit: 500000,
        lines: [
            { id: 'line-1-1', accountId: "acc-6", lineLabel: "Loyer Bureau Principal", debit: 500000, credit: "" },
            { id: 'line-1-2', accountId: "acc-5", lineLabel: "Paiement Loyer via BICEC", debit: "", credit: 500000 }
        ],
        validatedAt: "2024-07-21T10:00:00Z"
    },
    {
        id: 'entry-2',
        journal: "VT",
        date: "2024-07-19",
        reference: "FAC-00123",
        generalLabel: "Facture Consultation M. Kamdem",
        status: "Brouillon",
        totalDebit: 15000,
        totalCredit: 0, // Déséquilibrée
        lines: [
            { id: 'line-2-1', accountId: "acc-3", lineLabel: "Créance client Kamdem", debit: 15000, credit: "" }
            // Ligne de crédit manquante pour le produit 'acc-2'
        ]
    }
];