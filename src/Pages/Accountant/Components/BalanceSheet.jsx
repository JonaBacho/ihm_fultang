"use client";

import { useEffect, useState } from "react";
import axiosInstanceAccountant from "../../../Utils/axiosInstanceAccountant";

export default function BalanceSheet({ year }) {
  const [balanceSheetData, setBalanceSheetData] = useState({ data: [] });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosInstanceAccountant.get(
          `/budget-exercise/get_balance_sheet/`
        );
        console.log(response.data);
        setBalanceSheetData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XAF",
    }).format(amount);
  };

  const renderTable = (data, title) => (
    <div key={title}>
      <h3 className="text-lg font-semibold mb-4 text-secondary">{title}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Code
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Libellé
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Montant
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.items.map((item) => (
              <tr key={item.accountNo} className="hover:bg-gray-50">
                <td className="px-4 py-2 font-mono text-sm">
                  {item.accountNo}
                </td>
                <td className="px-4 py-2 text-sm">{item.label}</td>
                <td className="px-4 py-2 text-right text-sm">
                  {formatAmount(item.amount)}
                </td>
              </tr>
            ))}
            <tr className="bg-gray-100">
              <td colSpan={2} className="px-4 py-2 font-semibold">
                Total
              </td>
              <td className="px-4 py-2 text-right font-semibold">
                {formatAmount(data.total)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSummary = (summaryData) => (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4 text-secondary">Summary</h3>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Item
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Value
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {summaryData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2 text-sm">{item.item}</td>
              <td className="px-4 py-2 text-right text-sm">
                {item.value !== null ? formatAmount(item.value) : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const assetCategories = [
    "IMMOBILIZED ACTIVE",
    "CIRCULANT ACTIVE",
    "ACTIVE TREASURY",
  ];
  const liabilityCategories = [
    "EQUITY",
    "FINANCIAL DEBT",
    "CIRCULANT PASSIVE",
    "PASSIVE TREASURY",
  ];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Assets Side */}
        <div>
          {balanceSheetData.data
            .filter((section) => assetCategories.includes(section.category))
            .map((section) => renderTable(section, section.category))}
        </div>

        {/* Liabilities and Equity Side */}
        <div>
          {balanceSheetData.data
            .filter((section) => liabilityCategories.includes(section.category))
            .map((section) => renderTable(section, section.category))}
        </div>
      </div>

      {/* Summary Section */}
      {balanceSheetData.data.find((section) => Array.isArray(section.data)) &&
        renderSummary(
          balanceSheetData.data.find((section) => Array.isArray(section.data))
            .data
        )}
    </div>
  );
}
