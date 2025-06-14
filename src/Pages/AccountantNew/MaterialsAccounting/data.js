// CHEMIN : src/Pages/AccountantNew/MaterialsAccounting/data.js

// Données de base pour simuler la comptabilité matière

// Catégories d'articles
export const initialCategories = [
    { id: 'cat-1', name: 'Médicaments' },
    { id: 'cat-2', name: 'Consommables Médicaux' },
    { id: 'cat-3', name: 'Réactifs de Laboratoire' },
];

// Services hospitaliers
export const initialServices = [
    { id: 'serv-1', name: 'Pharmacie' },
    { id: 'serv-2', name: 'Service Pédiatrie' },
    { id: 'serv-3', name: 'Laboratoire' },
    { id: 'serv-4', name: 'Chirurgie' },
];

// Liste des articles avec leur stock
export const initialItems = [
    {
        id: 'item-1',
        name: 'Paracétamol 500mg',
        unit: 'Boîte',
        categoryId: 'cat-1',
        stockFinal: 150,
    },
    {
        id: 'item-2',
        name: 'Seringues 5ml',
        unit: 'Pièce',
        categoryId: 'cat-2',
        stockFinal: 800,
    },
    {
        id: 'item-3',
        name: 'Compresses Stériles',
        unit: 'Paquet',
        categoryId: 'cat-2',
        stockFinal: 250,
    },
    {
        id: 'item-4',
        name: 'Réactif Glycémie',
        unit: 'Kit',
        categoryId: 'cat-3',
        stockFinal: 45,
    },
];

// Journal des mouvements de stock
export const initialMovements = [
    {
        id: 'move-1',
        itemId: 'item-2', // Seringues 5ml
        type: 'ENTREE',
        quantity: 500,
        date: '2025-06-12T10:00:00Z',
        serviceId: 'serv-1', // Reçu par la Pharmacie
        observation: 'Commande N°123',
    },
    {
        id: 'move-2',
        itemId: 'item-2', // Seringues 5ml
        type: 'SORTIE',
        quantity: 50,
        date: '2025-06-13T14:30:00Z',
        serviceId: 'serv-4', // Pour le service Chirurgie
        observation: 'Urgence chirurgicale',
    },
    {
        id: 'move-3',
        itemId: 'item-1', // Paracétamol
        type: 'SORTIE',
        quantity: 20,
        date: '2025-06-14T09:15:00Z',
        serviceId: 'serv-2', // Pour le service Pédiatrie
        observation: 'Dotation hebdomadaire',
    },
];