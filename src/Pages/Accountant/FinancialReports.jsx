import { useState } from "react";
import { FaFilePdf, FaFileExcel, FaExclamationCircle } from "react-icons/fa";
import BalanceSheet from "./Components/BalanceSheet";
import IncomeStatement from "./Components/IncomeStatement";
import FinancialCharts from "./Components/FinancialCharts";
import { AccountantDashBoard } from "./Components/AccountantDashboard";
import { AccountantNavLink } from "./AccountantNavLink";
import { AccountantNavBar } from "./Components/AccountantNavBar";

export function FinancialReports() {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [activeTab, setActiveTab] = useState("balance");
  const [error, setError] = useState(null);

  const handleExport = (format) => {
    // Implémentation de l'export
    console.log(`Exporting as ${format}`);
  };

  const handlePeriodChange = (e) => {
    const year = e.target.value;
    // Simulation de vérification de disponibilité des données
    if (year === "2025") {
      setError(
        "Les données pour cet exercice comptable ne sont pas encore clôturées"
      );
      return;
    }
    setError(null);
    setSelectedYear(year);
  };

  return (
    <AccountantDashBoard
      requiredRole={"Accountant"}
      linkList={AccountantNavLink}
    >
      <AccountantNavBar></AccountantNavBar>
      <div className="container mx-auto px-4 py-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold text-secondary">Bilan Financier</h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <select
              className="px-4 py-2 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-start"
              onChange={handlePeriodChange}
              value={selectedYear}
            >
              <option value="2022">Exercice 2022</option>
              <option value="2023">Exercice 2023</option>
              <option value="2024">Exercice 2024</option>
              <option value="2025">Exercice 2025</option>
            </select>
            <div className="flex gap-2">
              <button
                onClick={() => handleExport("excel")}
                className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FaFileExcel className="text-green-600" />
                Excel
              </button>
              <button
                onClick={() => handleExport("pdf")}
                className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FaFilePdf className="text-red-600" />
                PDF
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-red-700">
              <FaExclamationCircle />
              <p className="font-medium">Erreur</p>
            </div>
            <p className="mt-1 text-red-600">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-2">
            Aperçu Financier {selectedYear}
          </h2>
          <p className="text-gray-600 mb-6">
            Vue d'ensemble de la situation financière de l'hôpital
          </p>
          <FinancialCharts year={selectedYear} />
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex border-b">
            <button
              className={`flex-1 px-6 py-3 text-center font-medium ${
                activeTab === "balance"
                  ? "text-primary-start border-b-2 border-primary-start"
                  : "text-gray-600 hover:text-primary-start"
              }`}
              onClick={() => setActiveTab("balance")}
            >
              Bilan
            </button>
            <button
              className={`flex-1 px-6 py-3 text-center font-medium ${
                activeTab === "income"
                  ? "text-primary-start border-b-2 border-primary-start"
                  : "text-gray-600 hover:text-primary-start"
              }`}
              onClick={() => setActiveTab("income")}
            >
              Compte de Résultat
            </button>
          </div>
          <div className="p-6">
            {activeTab === "balance" ? (
              <BalanceSheet year={selectedYear} />
            ) : (
              <IncomeStatement year={selectedYear} />
            )}
          </div>
        </div>
      </div>
    </AccountantDashBoard>
  );
}
