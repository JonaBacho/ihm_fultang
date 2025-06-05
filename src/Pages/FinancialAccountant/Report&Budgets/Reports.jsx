import { useState, useEffect } from "react";
import { NavLink } from "../NavLink.js";
import { NavBar } from "../NavBar.jsx";
import { CustomDashboard } from "../../../GlobalComponents/CustomDashboard.jsx";
import axiosInstance from "../../../Utils/axiosInstance.js";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    XAxis,
    YAxis,
    ResponsiveContainer,
} from "recharts";
import { FaCalendarAlt } from "react-icons/fa";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";

export function ReportsAnalyticsPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [filters, setFilters] = useState({
        startDate: "",
        endDate: "",
    });

    const [financialData, setFinancialData] = useState([]);
    const [budgetUsageData, setBudgetUsageData] = useState([]);
    const [paymentStatusData, setPaymentStatusData] = useState([]);

    const COLORS = ["#4F46E5", "#FBBF24", "#10B981", "#EF4444", "#3B82F6"];

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError(null);
            try {
                const params = new URLSearchParams();
                if (filters.startDate) params.append("start_date", filters.startDate);
                if (filters.endDate) params.append("end_date", filters.endDate);

                const [finRes, budRes, payRes] = await Promise.all([
                    axiosInstance.get(`/reports/financial-summary?${params.toString()}`),
                    axiosInstance.get(`/reports/budget-usage?${params.toString()}`),
                    axiosInstance.get(`/reports/payment-status?${params.toString()}`),
                ]);

                setFinancialData(finRes.data || []);
                setBudgetUsageData(budRes.data || []);
                setPaymentStatusData(payRes.data || []);
            } catch (err) {
                setError("Error loading reports data.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [filters]);

    function handleFilterChange(e) {
        setFilters((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    function exportToExcel() {
        if (!financialData || financialData.length === 0) {
            alert("No data to export");
            return;
        }
        const worksheet = XLSX.utils.json_to_sheet(financialData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Financial Summary");
        XLSX.writeFile(workbook, "financial_summary.xlsx");
    }

    async function exportToPDF() {
        const input = document.getElementById("report-section");
        if (!input) {
            alert("Report section not found");
            return;
        }
        const canvas = await html2canvas(input, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("landscape", "pt", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("report.pdf");
    }

    return (
        <CustomDashboard linkList={NavLink} requiredRole={"Accountant"}>
            <NavBar />
            <div className="p-6 space-y-6">
                <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h1 className="text-3xl font-bold text-gray-800">Reports & Analytics</h1>
                    <div className="flex items-center space-x-4">
                        <label htmlFor="startDate" className="flex items-center space-x-2 text-gray-700 font-medium">
                            <FaCalendarAlt />
                            <span>Start Date</span>
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={filters.startDate}
                            onChange={handleFilterChange}
                            className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-start"
                        />
                        <label htmlFor="endDate" className="flex items-center space-x-2 text-gray-700 font-medium">
                            <FaCalendarAlt />
                            <span>End Date</span>
                        </label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={filters.endDate}
                            onChange={handleFilterChange}
                            className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-start"
                        />
                    </div>
                </header>

                <div className="flex space-x-4 mb-4">
                    <button
                        onClick={exportToExcel}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold shadow"
                        title="Export to Excel"
                    >
                        Export Excel
                    </button>
                    <button
                        onClick={exportToPDF}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold shadow"
                        title="Export to PDF"
                    >
                        Export PDF
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center p-10 text-primary-start font-semibold">
                        Loading reports...
                    </div>
                ) : error ? (
                    <div className="p-6 text-red-600 font-semibold">{error}</div>
                ) : (
                    <div id="report-section" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <section className="bg-white rounded-lg shadow p-4">
                            <h2 className="text-xl font-bold mb-4 text-gray-800">Financial Summary Over Time</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={financialData}>
                                    <XAxis dataKey="period" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="revenue" stroke="#4F46E5" strokeWidth={3} />
                                    <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={3} />
                                </LineChart>
                            </ResponsiveContainer>
                        </section>

                        <section className="bg-white rounded-lg shadow p-4">
                            <h2 className="text-xl font-bold mb-4 text-gray-800">Budget Usage</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={budgetUsageData}>
                                    <XAxis dataKey="department" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="allocated" fill="#10B981" />
                                    <Bar dataKey="used" fill="#FBBF24" />
                                </BarChart>
                            </ResponsiveContainer>
                        </section>

                        <section className="bg-white rounded-lg shadow p-4 md:col-span-2">
                            <h2 className="text-xl font-bold mb-4 text-gray-800">Payment Status Distribution</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={paymentStatusData}
                                        dataKey="value"
                                        nameKey="status"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        label
                                    >
                                        {paymentStatusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                        </section>
                    </div>
                )}
            </div>
        </CustomDashboard>
    );
}
