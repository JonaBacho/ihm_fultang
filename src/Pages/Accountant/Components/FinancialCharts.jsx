import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Enregistrement des composants nécessaires pour Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function FinancialCharts({ year }) {
  // Données mensuelles
  const monthlyData = {
    labels: [
      "Jan",
      "Fév",
      "Mar",
      "Avr",
      "Mai",
      "Juin",
      "Juil",
      "Aoû",
      "Sep",
      "Oct",
      "Nov",
      "Déc",
    ],
    datasets: [
      {
        label: "Produits",
        data: [
          650000, 680000, 690000, 700000, 720000, 710000, 730000, 740000,
          750000, 760000, 770000, 780000,
        ],
        borderColor: "#50C2B9",
        backgroundColor: "rgba(80, 194, 185, 0.1)",
        tension: 0.4,
      },
      {
        label: "Charges",
        data: [
          580000, 590000, 585000, 595000, 600000, 605000, 610000, 615000,
          620000, 625000, 630000, 635000,
        ],
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        tension: 0.4,
      },
    ],
  };

  // Données de répartition des actifs
  const assetData = {
    labels: ["Immobilisations", "Stocks", "Créances", "Trésorerie"],
    datasets: [
      {
        label: "Montant",
        data: [3900000, 420000, 650000, 550000],
        backgroundColor: [
          "rgba(26, 115, 163, 0.8)",
          "rgba(80, 194, 185, 0.8)",
          "rgba(5, 17, 97, 0.8)",
          "rgba(26, 115, 163, 0.6)",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "XAF",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) =>
            new Intl.NumberFormat("fr-FR", {
              style: "currency",
              currency: "XAF",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(value),
        },
      },
    },
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4 text-secondary">
          Évolution Mensuelle
        </h3>
        <div className="h-[300px]">
          <Line data={monthlyData} options={options} />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4 text-secondary">
          Répartition des Actifs
        </h3>
        <div className="h-[300px]">
          <Bar data={assetData} options={options} />
        </div>
      </div>
    </div>
  );
}
