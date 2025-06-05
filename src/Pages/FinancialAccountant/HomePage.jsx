import {
    FaFileInvoiceDollar,
    FaFileAlt,
    FaChartBar,
    FaMoneyCheckAlt,
    FaUsers,
    FaWarehouse,
    FaList,
    FaRegFileArchive,
} from "react-icons/fa";
import { NavLink } from "./NavLink.js";
import { NavBar } from "./NavBar.jsx";
import { useNavigate } from "react-router-dom";
import { AppRoutesPaths as AppRouterPaths } from "../../Router/appRouterPaths.js";
import { CustomDashboard } from "../../GlobalComponents/CustomDashboard.jsx";
import StatCard from "../../GlobalComponents/StatCard.jsx";
import QuickActionButton from "../../GlobalComponents/QuickActionButton.jsx";
import { useState, useEffect } from "react";
import axiosInstance from "../../Utils/axiosInstance.js";

export function HomePage() {
    const navigate = useNavigate();

    // Exemple de stats fictives, à remplacer par appels API réels
    const [stats, setStats] = useState({
        journalEntries: 0,
        invoices: 0,
        payments: 0,
        budgets: 0,
        reports: 0,
        vendors: 0,
        customers: 0,
        fixedAssets: 0,
        inventoryItems: 0,
    });

    useEffect(() => {
        async function fetchStats() {
            try {
                // Exemple : remplacer par tes endpoints API spécifiques
                const [
                    journalRes,
                    invoicesRes,
                    paymentsRes,
                    budgetsRes,
                    reportsRes,
                    vendorsRes,
                    customersRes,
                    assetsRes,
                    inventoryRes,
                ] = await Promise.all([
                    axiosInstance.get("/journal-entries/count"),
                    axiosInstance.get("/invoices/count"),
                    axiosInstance.get("/payments/count"),
                    axiosInstance.get("/budgets/count"),
                    axiosInstance.get("/reports/count"),
                    axiosInstance.get("/vendors/count"),
                    axiosInstance.get("/customers/count"),
                    axiosInstance.get("/fixed-assets/count"),
                    axiosInstance.get("/inventory/count"),
                ]);

                setStats({
                    journalEntries: journalRes.data.count || 0,
                    invoices: invoicesRes.data.count || 0,
                    payments: paymentsRes.data.count || 0,
                    budgets: budgetsRes.data.count || 0,
                    reports: reportsRes.data.count || 0,
                    vendors: vendorsRes.data.count || 0,
                    customers: customersRes.data.count || 0,
                    fixedAssets: assetsRes.data.count || 0,
                    inventoryItems: inventoryRes.data.count || 0,
                });
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            }
        }
        fetchStats();
    }, []);

    return (
        <CustomDashboard linkList={NavLink} requiredRole={"Accountant"}>
            <NavBar />
            <div className="p-6 space-y-6">
                <div className="bg-gradient-to-r from-primary-end to-primary-start rounded-lg p-6 text-white">
                    <h1 className="text-3xl font-bold mb-2">Welcome to the Financial Dashboard</h1>
                    <p className="opacity-90 font-semibold text-xl">
                        Manage your hospital’s finances efficiently and monitor key activities from this centralized interface.
                    </p>
                </div>

                {/* Statistiques principales */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <StatCard
                        icon={FaFileInvoiceDollar}
                        title="Journal Entries"
                        value={stats.journalEntries}
                        description="Total accounting entries"
                        color="bg-blue-600"
                    />
                    <StatCard
                        icon={FaFileAlt}
                        title="Invoices"
                        value={stats.invoices}
                        description="Total invoices issued"
                        color="bg-green-600"
                    />
                    <StatCard
                        icon={FaMoneyCheckAlt}
                        title="Payments"
                        value={stats.payments}
                        description="Payments processed"
                        color="bg-purple-600"
                    />
                    <StatCard
                        icon={FaChartBar}
                        title="Budgets"
                        value={stats.budgets}
                        description="Budgets managed"
                        color="bg-yellow-600"
                    />
                    <StatCard
                        icon={FaChartBar}
                        title="Reports"
                        value={stats.reports}
                        description="Financial reports generated"
                        color="bg-indigo-600"
                    />
                    <StatCard
                        icon={FaUsers}
                        title="Vendors"
                        value={stats.vendors}
                        description="Registered suppliers"
                        color="bg-pink-600"
                    />
                    <StatCard
                        icon={FaUsers}
                        title="Customers"
                        value={stats.customers}
                        description="Registered clients"
                        color="bg-red-600"
                    />
                    <StatCard
                        icon={FaWarehouse}
                        title="Fixed Assets"
                        value={stats.fixedAssets}
                        description="Assets tracked"
                        color="bg-teal-600"
                    />
                    <StatCard
                        icon={FaList}
                        title="Inventory Items"
                        value={stats.inventoryItems}
                        description="Stock items managed"
                        color="bg-cyan-600"
                    />
                </div>

                {/* Accès rapide */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Access</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <QuickActionButton
                            icon={FaFileInvoiceDollar}
                            label="Journal Entries"
                            onClick={() => navigate(AppRouterPaths.journalEntriesPage)}
                        />
                        <QuickActionButton
                            icon={FaFileAlt}
                            label="Invoices"
                            onClick={() => navigate(AppRouterPaths.invoicesPage)}
                        />
                        <QuickActionButton
                            icon={FaMoneyCheckAlt}
                            label="Payments"
                            onClick={() => navigate(AppRouterPaths.paymentsPage)}
                        />
                        <QuickActionButton
                            icon={FaChartBar}
                            label="Budgets"
                            onClick={() => navigate(AppRouterPaths.budgetsPage)}
                        />
                        <QuickActionButton
                            icon={FaChartBar}
                            label="Reports & Analytics"
                            onClick={() => navigate(AppRouterPaths.reportsPage)}
                        />
                        <QuickActionButton
                            icon={FaUsers}
                            label="Vendors"
                            onClick={() => navigate(AppRouterPaths.vendorsPage)}
                        />
                        <QuickActionButton
                            icon={FaUsers}
                            label="Customers"
                            onClick={() => navigate(AppRouterPaths.customersPage)}
                        />
                        <QuickActionButton
                            icon={FaWarehouse}
                            label="Fixed Assets"
                            onClick={() => navigate(AppRouterPaths.fixedAssetsPage)}
                        />
                        <QuickActionButton
                            icon={FaList}
                            label="Inventory Management"
                            onClick={() => navigate(AppRouterPaths.inventoryPage)}
                        />
                    </div>
                </div>
            </div>
        </CustomDashboard>
    );
}
