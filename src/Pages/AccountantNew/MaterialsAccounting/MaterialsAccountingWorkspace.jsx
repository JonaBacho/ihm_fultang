// CHEMIN : src/Pages/AccountantNew/MaterialsAccounting/MaterialsAccountingWorkspace.jsx

import { useState } from "react";
import { FinancialAccountantDashBoard } from "../DashBoard.jsx";
import { FinancialAccountantNavLink } from "../NavLink.js";
import { FinancialAccountantNavBar } from "../NavBar.jsx";
import { BarChart3, Package, History } from "lucide-react";

// Import des données de simulation
import { initialItems, initialMovements, initialCategories, initialServices } from "./data.js";

// Import des vues et des formulaires
import DashboardView from "./DashboardView.jsx";
import ItemsListView from "./ItemsListView.jsx";
import ItemForm from "./ItemForm.jsx";
import MovementForm from "./MovementForm.jsx";
import MovementsLogView from "./MovementsLogView.jsx"; // <-- Import unique et correct

export default function MaterialsAccountingWorkspace() {
    // === ÉTATS ===
    const [items, setItems] = useState(initialItems);
    const [movements, setMovements] = useState(initialMovements);
    const [categories, setCategories] = useState(initialCategories);
    const [services, setServices] = useState(initialServices);
    const [activeTab, setActiveTab] = useState('dashboard');

    // États pour les modaux
    const [isItemFormOpen, setIsItemFormOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null);
    const [isMovementFormOpen, setIsMovementFormOpen] = useState(false);
    const [itemForMovement, setItemForMovement] = useState(null);

    // === GESTIONNAIRES D'ÉVÉNEMENTS POUR LES ARTICLES ===
    const handleAddNewItem = () => {
        setItemToEdit(null);
        setIsItemFormOpen(true);
    };

    const handleEditItem = (item) => {
        setItemToEdit(item);
        setIsItemFormOpen(true);
    };

    const handleSaveItem = (formData, itemId) => {
        if (itemId) {
            setItems(items.map(item =>
                item.id === itemId ? { ...item, ...formData, stockFinal: Number(formData.stockFinal) } : item
            ));
        } else {
            const newItem = {
                id: `item-${Date.now()}`,
                ...formData,
                stockFinal: Number(formData.stockFinal),
            };
            setItems([...items, newItem]);
        }
        setIsItemFormOpen(false);
    };

    // === GESTIONNAIRES D'ÉVÉNEMENTS POUR LES MOUVEMENTS ===
    const handleRecordMovement = (item) => {
        setItemForMovement(item);
        setIsMovementFormOpen(true);
    };

    const handleSaveMovement = (formData, itemId) => {
        const newMovement = {
            id: `move-${Date.now()}`,
            itemId: itemId,
            ...formData,
            quantity: Number(formData.quantity)
        };
        setMovements(prev => [newMovement, ...prev]);

        setItems(items.map(item => {
            if (item.id === itemId) {
                const newStock = formData.type === 'ENTREE'
                    ? item.stockFinal + Number(formData.quantity)
                    : item.stockFinal - Number(formData.quantity);
                return { ...item, stockFinal: newStock };
            }
            return item;
        }));
        setIsMovementFormOpen(false);
    };


    // === CONFIGURATION DES ONGLETS ===
    const tabs = [
        { id: 'dashboard', label: 'Tableau de Bord', icon: BarChart3 },
        { id: 'items', label: 'Articles & Stocks', icon: Package },
        { id: 'movements', label: 'Journal des Mouvements', icon: History },
    ];

    const getTabClass = (tabId) => {
        return `flex items-center gap-2 px-4 py-3 font-semibold rounded-t-lg cursor-pointer transition-all duration-300 ${
            activeTab === tabId
                ? 'bg-white text-primary-end border-b-4 border-primary-end'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
        }`;
    };

    // === RENDU CONDITIONNEL DE LA VUE ACTIVE ===
    const renderActiveView = () => {
        switch (activeTab) {
            case 'dashboard':
                return <DashboardView items={items} movements={movements} />;
            case 'items':
                return <ItemsListView
                    items={items}
                    categories={categories}
                    onAddNewItem={handleAddNewItem}
                    onEditItem={handleEditItem}
                    onRecordMovement={handleRecordMovement}
                />;
            case 'movements':
                return <MovementsLogView
                    movements={movements}
                    items={items}
                    services={services}
                    categories={categories}
                />;
            default:
                return <DashboardView items={items} movements={movements} />;
        }
    };

    // === JSX ===
    return (
        <FinancialAccountantDashBoard linkList={FinancialAccountantNavLink} requiredRole={"Accountant"}>
            <FinancialAccountantNavBar />
            <div className="p-6 bg-gray-50 min-h-full">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Comptabilité Matière</h1>
                    <p className="mt-1 text-gray-600">Suivi quantitatif des biens et consommables de l'hôpital.</p>
                </div>

                {/* Onglets */}
                <div className="flex border-b border-gray-200">
                    {tabs.map((tab) => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={getTabClass(tab.id)}>
                            <tab.icon className="h-5 w-5" />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Contenu de l'onglet */}
                <div className="mt-1 bg-white p-6 rounded-b-lg shadow-sm">
                    {renderActiveView()}
                </div>
            </div>

            {/* Modaux */}
            <ItemForm
                isOpen={isItemFormOpen}
                onClose={() => setIsItemFormOpen(false)}
                onSave={handleSaveItem}
                itemToEdit={itemToEdit}
                categories={categories}
            />
            <MovementForm
                isOpen={isMovementFormOpen}
                onClose={() => setIsMovementFormOpen(false)}
                onSave={handleSaveMovement}
                item={itemForMovement}
                services={services}
            />
        </FinancialAccountantDashBoard>
    );
}