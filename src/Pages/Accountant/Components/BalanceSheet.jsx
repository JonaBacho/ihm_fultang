import React from "react";

export default function BalanceSheet({ year }) {
  const assets = [
    {
      category: "ACTIF IMMOBILISE (classe 2)",
      items: [
        { code: "20", label: "Charges immobilisées", amount: 150000 },
        { code: "21", label: "Immobilisations incorporelles", amount: 250000 },
        {
          code: "22-24",
          label: "Immobilisations corporelles",
          amount: 3500000,
        },
        {
          code: "25",
          label: "Avances versées sur immobilisations",
          amount: 75000,
        },
        { code: "26-27", label: "Immobilisations financières", amount: 180000 },
      ],
    },
    {
      category: "ACTIF CIRCULANT (classe 3 et 4)",
      items: [
        { code: "31-38", label: "Stocks", amount: 420000 },
        {
          code: "40-47",
          label: "Créances et emplois assimilés",
          amount: 650000,
        },
      ],
    },
    {
      category: "TRESORERIE ACTIF (classe 5)",
      items: [
        { code: "50", label: "Titres de placement", amount: 200000 },
        { code: "52-58", label: "Banques, CCP, caisse, etc.", amount: 350000 },
      ],
    },
  ];

  const liabilities = [
    {
      category: "CAPITAUX PROPRES (classe 1)",
      items: [
        { code: "10", label: "Capital", amount: 2500000 },
        { code: "10a", label: "Primes et réserves", amount: 750000 },
        { code: "13", label: "Résultat net de l'exercice", amount: 480000 },
        { code: "14", label: "Subvention d'investissement", amount: 250000 },
      ],
    },
    {
      category: "DETTES FINANCIERES (classe 1)",
      items: [
        { code: "16", label: "Emprunts", amount: 1200000 },
        { code: "17", label: "Dettes de crédit bail", amount: 350000 },
      ],
    },
    {
      category: "PASSIF CIRCULANT (classe 4)",
      items: [
        { code: "40", label: "Fournisseurs", amount: 580000 },
        { code: "42-44", label: "Dettes sociales et fiscales", amount: 420000 },
      ],
    },
  ];

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Assets Side */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-secondary">Actif</h3>
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
                {assets.map((section) => (
                  <React.Fragment key={section.category}>
                    <tr className="bg-gray-50">
                      <td
                        colSpan={3}
                        className="px-4 py-2 font-medium text-secondary"
                      >
                        {section.category}
                      </td>
                    </tr>
                    {section.items.map((item) => (
                      <tr key={item.code} className="hover:bg-gray-50">
                        <td className="px-4 py-2 font-mono text-sm">
                          {item.code}
                        </td>
                        <td className="px-4 py-2 text-sm">{item.label}</td>
                        <td className="px-4 py-2 text-right text-sm">
                          {formatAmount(item.amount)}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Liabilities Side */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-secondary">Passif</h3>
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
                {liabilities.map((section) => (
                  <React.Fragment key={section.category}>
                    <tr className="bg-gray-50">
                      <td
                        colSpan={3}
                        className="px-4 py-2 font-medium text-secondary"
                      >
                        {section.category}
                      </td>
                    </tr>
                    {section.items.map((item) => (
                      <tr key={item.code} className="hover:bg-gray-50">
                        <td className="px-4 py-2 font-mono text-sm">
                          {item.code}
                        </td>
                        <td className="px-4 py-2 text-sm">{item.label}</td>
                        <td className="px-4 py-2 text-right text-sm">
                          {formatAmount(item.amount)}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
