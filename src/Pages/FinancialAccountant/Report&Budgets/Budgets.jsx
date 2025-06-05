import { useState, useEffect } from "react";
import { FaPlus, FaSearch, FaSpinner, FaTimes } from "react-icons/fa";
import { NavLink } from "../NavLink.js";
import { NavBar } from "../NavBar.jsx";
import { CustomDashboard } from "../../../GlobalComponents/CustomDashboard.jsx";
import axiosInstance from "../../../Utils/axiosInstance.js";

export function BudgetsPage() {
    // États liste budgets
    const [budgets, setBudgets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // États filtres
    const [filters, setFilters] = useState({
        searchText: "",
        startDate: "",
        endDate: "",
        department: "",
    });

    // Pagination
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 10;

    // Modal création budget
    const [showForm, setShowForm] = useState(false);

    // États formulaire création
    const [formData, setFormData] = useState({
        name: "",
        startDate: "",
        endDate: "",
        allocatedAmount: "",
        usedAmount: "",
        department: "",
        status: "Active", // Active, Closed, Pending
    });

    const [formError, setFormError] = useState(null);
    const [formSubmitting, setFormSubmitting] = useState(false);

    // Chargement des budgets
    useEffect(() => {
        async function fetchBudgets() {
            setLoading(true);
            setError(null);
            try {
                const params = new URLSearchParams();
                params.append("page", page);
                params.append("page_size", pageSize);
                if (filters.searchText) params.append("search", filters.searchText);
                if (filters.startDate) params.append("start_date", filters.startDate);
                if (filters.endDate) params.append("end_date", filters.endDate);
                if (filters.department) params.append("department", filters.department);

                const response = await axiosInstance.get(`/budgets/?${params.toString()}`);

                if (response.status === 200) {
                    setBudgets(response.data.results || []);
                    setTotalPages(Math.ceil((response.data.count || 0) / pageSize));
                } else {
                    setError("Failed to load budgets.");
                }
            } catch (err) {
                setError("Error fetching budgets.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchBudgets();
    }, [filters, page]);

    // Gestion filtres
    function handleFilterChange(e) {
        setFilters((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        setPage(1);
    }

    // Gestion formulaire
    function handleFormChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        setFormError(null);

        // Validation simple
        if (
            !formData.name ||
            !formData.startDate ||
            !formData.endDate ||
            !formData.allocatedAmount ||
            !formData.department
        ) {
            setFormError("Please fill in all required fields.");
            return;
        }
        if (isNaN(parseFloat(formData.allocatedAmount)) || parseFloat(formData.allocatedAmount) < 0) {
            setFormError("Allocated amount must be a non-negative number.");
            return;
        }
        if (formData.usedAmount && (isNaN(parseFloat(formData.usedAmount)) || parseFloat(formData.usedAmount) < 0)) {
            setFormError("Used amount must be a non-negative number.");
            return;
        }
        if (new Date(formData.startDate) > new Date(formData.endDate)) {
            setFormError("Start date cannot be after end date.");
            return;
        }

        setFormSubmitting(true);
        try {
            const payload = {
                name: formData.name,
                startDate: formData.startDate,
                endDate: formData.endDate,
                allocatedAmount: parseFloat(formData.allocatedAmount),
                usedAmount: formData.usedAmount ? parseFloat(formData.usedAmount) : 0,
                department: formData.department,
                status: formData.status,
            };

            const response = await axiosInstance.post("/budgets/", payload);

            if (response.status === 201) {
                // Succès : fermer modal, reset form, rafraîchir liste
                setShowForm(false);
                setFormData({
                    name: "",
                    startDate: "",
                    endDate: "",
                    allocatedAmount: "",
                    usedAmount: "",
                    department: "",
                    status: "Active",
                });
                setPage(1);
                const refreshed = await axiosInstance.get(`/budgets/?page=1&page_size=${pageSize}`);
                setBudgets(refreshed.data.results || []);
                setTotalPages(Math.ceil((refreshed.data.count || 0) / pageSize));
            } else {
                setFormError("Failed to create budget.");
            }
        } catch (err) {
            setFormError("Error submitting form.");
            console.error(err);
        } finally {
            setFormSubmitting(false);
        }
    }

    return (
        <CustomDashboard linkList={NavLink} requiredRole={"Accountant"}>
            <NavBar />
            <div className="p-6 space-y-6">
                <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h1 className="text-3xl font-bold text-gray-800">Budgets</h1>
                    <button
                        onClick={() => setShowForm(true)}
                        className="inline-flex items-center gap-2 bg-primary-start hover:bg-primary-end text-white font-semibold px-4 py-2 rounded shadow transition"
                    >
                        <FaPlus /> Create New Budget
                    </button>
                </header>

                {/* Filtres */}
                <section className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:items-end md:space-x-4 space-y-4 md:space-y-0">
                    <div className="flex-1">
                        <label htmlFor="searchText" className="block text-gray-700 font-medium mb-1">
                            Search (Budget Name)
                        </label>
                        <input
                            type="text"
                            id="searchText"
                            name="searchText"
                            value={filters.searchText}
                            onChange={handleFilterChange}
                            placeholder="Budget name..."
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-start"
                        />
                    </div>

                    <div>
                        <label htmlFor="startDate" className="block text-gray-700 font-medium mb-1">
                            Start Date
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={filters.startDate}
                            onChange={handleFilterChange}
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-start"
                        />
                    </div>

                    <div>
                        <label htmlFor="endDate" className="block text-gray-700 font-medium mb-1">
                            End Date
                        </label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={filters.endDate}
                            onChange={handleFilterChange}
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-start"
                        />
                    </div>

                    <div className="flex-1">
                        <label htmlFor="department" className="block text-gray-700 font-medium mb-1">
                            Department
                        </label>
                        <input
                            type="text"
                            id="department"
                            name="department"
                            value={filters.department}
                            onChange={handleFilterChange}
                            placeholder="Department or service..."
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-start"
                        />
                    </div>

                    <button
                        onClick={() => setPage(1)}
                        className="flex items-center gap-2 bg-primary-start hover:bg-primary-end text-white font-semibold px-4 py-2 rounded shadow transition"
                        title="Apply Filters"
                    >
                        <FaSearch /> Search
                    </button>
                </section>

                {/* Liste budgets */}
                <section className="bg-white rounded-lg shadow overflow-x-auto">
                    {loading ? (
                        <div className="flex justify-center items-center p-10 text-primary-start">
                            <FaSpinner className="animate-spin mr-2" /> Loading...
                        </div>
                    ) : error ? (
                        <div className="p-6 text-red-600 font-semibold">{error}</div>
                    ) : budgets.length === 0 ? (
                        <div className="p-6 text-gray-600 font-medium">No budgets found.</div>
                    ) : (
                        <table className="min-w-full table-auto border-collapse">
                            <thead className="bg-primary-start text-white">
                            <tr>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Period</th>
                                <th className="px-4 py-2 text-right">Allocated Amount</th>
                                <th className="px-4 py-2 text-right">Used Amount</th>
                                <th className="px-4 py-2 text-left">Department</th>
                                <th className="px-4 py-2 text-left">Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {budgets.map((budget) => (
                                <tr
                                    key={budget.id}
                                    className="border-b hover:bg-gray-50 cursor-pointer"
                                    // onClick={() => navigate(`${AppRouterPaths.budgetDetailPage}/${budget.id}`)}
                                >
                                    <td className="px-4 py-3">{budget.name}</td>
                                    <td className="px-4 py-3">
                                        {new Date(budget.startDate).toLocaleDateString()} -{" "}
                                        {new Date(budget.endDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-3 text-right">{budget.allocatedAmount.toFixed(2)}</td>
                                    <td className="px-4 py-3 text-right">{budget.usedAmount.toFixed(2)}</td>
                                    <td className="px-4 py-3">{budget.department}</td>
                                    <td className="px-4 py-3">
                      <span
                          className={`px-2 py-1 rounded text-sm font-semibold ${
                              budget.status === "Active"
                                  ? "bg-green-200 text-green-800"
                                  : budget.status === "Pending"
                                      ? "bg-yellow-200 text-yellow-800"
                                      : "bg-red-200 text-red-800"
                          }`}
                      >
                        {budget.status}
                      </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </section>

                {/* Pagination */}
                {totalPages > 1 && (
                    <nav className="flex justify-center space-x-2 mt-4">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
                        >
                            Prev
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i + 1)}
                                className={`px-3 py-1 rounded border ${
                                    page === i + 1 ? "bg-primary-start text-white" : "border-gray-300"
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </nav>
                )}
            </div>

            {/* Modal formulaire création budget */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                        <button
                            onClick={() => setShowForm(false)}
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition"
                            aria-label="Close form"
                        >
                            <FaTimes size={20} />
                        </button>
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Create New Budget</h2>

                        {formError && (
                            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{formError}</div>
                        )}

                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                                    Budget Name <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleFormChange}
                                    placeholder="Enter budget name"
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-start"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="startDate" className="block text-gray-700 font-medium mb-1">
                                        Start Date <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        id="startDate"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleFormChange}
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-start"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="endDate" className="block text-gray-700 font-medium mb-1">
                                        End Date <span className="text-red-600">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        id="endDate"
                                        name="endDate"
                                        value={formData.endDate}
                                        onChange={handleFormChange}
                                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-start"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="allocatedAmount" className="block text-gray-700 font-medium mb-1">
                                    Allocated Amount <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="allocatedAmount"
                                    name="allocatedAmount"
                                    value={formData.allocatedAmount}
                                    onChange={handleFormChange}
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-start"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="usedAmount" className="block text-gray-700 font-medium mb-1">
                                    Used Amount
                                </label>
                                <input
                                    type="number"
                                    id="usedAmount"
                                    name="usedAmount"
                                    value={formData.usedAmount}
                                    onChange={handleFormChange}
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-start"
                                />
                            </div>

                            <div>
                                <label htmlFor="department" className="block text-gray-700 font-medium mb-1">
                                    Department <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="department"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleFormChange}
                                    placeholder="Enter department or service"
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-start"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="status" className="block text-gray-700 font-medium mb-1">
                                    Status
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleFormChange}
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-start"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Closed">Closed</option>
                                </select>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                                    disabled={formSubmitting}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 rounded bg-primary-start hover:bg-primary-end text-white font-semibold transition disabled:opacity-50"
                                    disabled={formSubmitting}
                                >
                                    {formSubmitting ? "Saving..." : "Save Budget"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </CustomDashboard>
    );
}
