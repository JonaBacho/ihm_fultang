/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { format, startOfMonth, endOfMonth } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaFileExcel,
  FaFileCsv,
  FaPrint,
  FaCalendarAlt,
  FaEye,
  FaTrash,
  FaFilter,
  FaSyncAlt,
} from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { motion } from "framer-motion";
import { useDebounce } from "use-debounce";
import { AccountantDashBoard } from "./Components/AccountantDashboard";
import { AccountantNavBar } from "./Components/AccountantNavBar";
import { AccountantNavLink } from "./AccountantNavLink";

const mockContributions = [
  {
    id: 1,
    invoiceNumber: "INV001",
    source: "Cash",
    amount: 5000,
    date: "2025-01-15",
  },
  {
    id: 2,
    invoiceNumber: "INV002",
    source: "Pharmacy",
    amount: 2500,
    date: "2025-01-20",
  },
  {
    id: 3,
    invoiceNumber: "INV003",
    source: "Donation",
    amount: 10000,
    date: "2025-01-25",
  },
  {
    id: 4,
    invoiceNumber: "INV004",
    source: "Grant",
    amount: 50000,
    date: "2025-01-30",
  },
  {
    id: 5,
    invoiceNumber: "INV005",
    source: "Patient Payment",
    amount: 1500,
    date: "2025-02-01",
  },
];

const operationTypes = [
  "All",
  "Cash",
  "Pharmacy",
  "Donation",
  "Grant",
  "Patient Payment",
];

export function FinancialContributions() {
  const [startDate, setStartDate] = useState(startOfMonth(new Date()));
  const [endDate, setEndDate] = useState(endOfMonth(new Date()));
  const [operationType, setOperationType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 300);
  const [filteredContributions, setFilteredContributions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleFilter();
  }, [debouncedSearch, startDate, endDate, operationType]);

  const handleFilter = () => {
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      let filtered = mockContributions.filter((contribution) => {
        const matchesDate =
          new Date(contribution.date) >= startDate &&
          new Date(contribution.date) <= endDate;
        const matchesType =
          operationType === "All" || contribution.source === operationType;
        const matchesSearch =
          contribution.invoiceNumber
            .toLowerCase()
            .includes(debouncedSearch.toLowerCase()) ||
          contribution.source
            .toLowerCase()
            .includes(debouncedSearch.toLowerCase());

        return matchesDate && matchesType && matchesSearch;
      });

      setFilteredContributions(filtered);
      setIsLoading(false);
    }, 500);
  };

  const handleExport = (format) => {
    const data = filteredContributions.map((item) => ({
      "Invoice Number": item.invoiceNumber,
      Source: item.source,
      Amount: item.amount,
      Date: format(new Date(item.date), "PPP"),
    }));

    if (format === "csv") {
      const csvContent = [
        Object.keys(data[0]).join(","),
        ...data.map((item) => Object.values(item).join(",")),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
      saveAs(blob, `contributions_${format(new Date(), "yyyyMMdd")}.csv`);
    } else if (format === "xlsx") {
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Contributions");
      XLSX.writeFile(
        wb,
        `contributions_${format(new Date(), "yyyyMMdd")}.xlsx`
      );
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleViewDetails = (contribution) => {
    // Implement view details functionality
    console.log("View details for:", contribution);
  };

  const handleDelete = (contribution) => {
    // Implement delete functionality
    console.log("Delete:", contribution);
  };

  const resetFilters = () => {
    setStartDate(startOfMonth(new Date()));
    setEndDate(endOfMonth(new Date()));
    setOperationType("All");
    setSearchTerm("");
  };

  return (
    <AccountantDashBoard
      requiredRole={"Accountant"}
      linkList={AccountantNavLink}
    >
      <AccountantNavBar></AccountantNavBar>
      <div className="container mx-auto px-4 py-8">
        <style>
          {`
          @media print {
            .no-print {
              display: none !important;
            }
            table {
              width: 100% !important;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
          }
        `}
        </style>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-6 text-gray-800"
        >
          <FaFilter className="inline-block mr-2 text-primary-600" />
          Financial Contributions
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="relative">
            <DatePicker
              selected={startDate}
              onChange={(dates) => {
                setStartDate(dates[0]);
                setEndDate(dates[1]);
              }}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholderText="Select date range"
            />
            <FaCalendarAlt className="absolute right-3 top-3 text-gray-400" />
          </div>

          <select
            value={operationType}
            onChange={(e) => setOperationType(e.target.value)}
            className="p-2 border rounded-lg bg-white focus:ring-2 focus:ring-primary-500"
          >
            {operationTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
          />

          <button
            onClick={resetFilters}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center"
          >
            <FaSyncAlt className="mr-2" />
            Reset Filters
          </button>
        </div>

        <div className="mb-4 flex gap-2">
          <ExportButton format="csv" onClick={handleExport} />
          <ExportButton format="xlsx" onClick={handleExport} />
          <TooltipButton
            onClick={handlePrint}
            icon={<FaPrint />}
            tooltip="Print report"
          />
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <FaSyncAlt className="animate-spin text-4xl text-primary-600" />
            <p className="mt-2 text-gray-600">Loading contributions...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto rounded-lg shadow-lg">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      "No",
                      "Invoice",
                      "Source",
                      "Amount",
                      "Date",
                      "Actions",
                    ].map((header, index) => (
                      <th
                        key={header}
                        className={`p-4 text-left text-gray-600 font-semibold ${
                          index === 0
                            ? "rounded-tl-lg"
                            : index === 5
                            ? "rounded-tr-lg no-print"
                            : ""
                        }`}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {filteredContributions.map((contribution, index) => (
                    <tr
                      key={contribution.id}
                      className="hover:bg-gray-50 transition-colors border-b"
                    >
                      <td className="p-4">{index + 1}</td>
                      <td className="p-4 font-mono text-primary-600">
                        {contribution.invoiceNumber}
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                          {contribution.source}
                        </span>
                      </td>
                      <td className="p-4 font-semibold">
                        ${contribution.amount.toLocaleString()}
                      </td>
                      <td className="p-4 text-gray-600">
                        {format(new Date(contribution.date), "dd MMM yyyy")}
                      </td>
                      <td className="p-4 flex gap-2 no-print">
                        <TooltipButton
                          icon={<FaEye className="text-blue-600" />}
                          onClick={() => handleViewDetails(contribution)}
                          tooltip="View details"
                        />
                        <TooltipButton
                          icon={<FaTrash className="text-red-600" />}
                          onClick={() => handleDelete(contribution)}
                          tooltip="Delete record"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredContributions.length === 0 && !isLoading && (
              <div className="mt-8 text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-lg">
                  No records found for the selected criteria
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 text-primary-600 hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </AccountantDashBoard>
  );
}

// Additional components
const ExportButton = ({ format, onClick }) => (
  <button
    onClick={() => onClick(format)}
    className="flex items-center px-4 py-2 bg-white hover:bg-gray-50 border rounded-lg"
  >
    {format === "csv" ? (
      <FaFileCsv className="mr-2 text-green-600" />
    ) : (
      <FaFileExcel className="mr-2 text-green-600" />
    )}
    Export {format.toUpperCase()}
  </button>
);

const TooltipButton = ({ icon, onClick, tooltip }) => (
  <>
    <button
      onClick={onClick}
      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      data-tooltip-id="tooltip"
      data-tooltip-content={tooltip}
    >
      {icon}
    </button>
    <Tooltip id="tooltip" />
  </>
);

export default FinancialContributions;
