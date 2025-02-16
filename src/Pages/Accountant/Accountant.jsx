import { AccountantDashBoard } from "./Components/AccountantDashboard";
import { AccountantNavLink } from "./AccountantNavLink";
import { AccountantNavBar } from "./Components/AccountantNavBar";
import { Users, DollarSign, FileText, Settings } from "lucide-react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export function Accountant() {
  const navigate = useNavigate();

  const stats = {
    totalRevenue: 50000,
    totalExpenses: 20000,
    netProfit: 30000,
    totalClients: 150,
  };

  const quickActions = [
    {
      icon: DollarSign,
      label: "Add Expense",
      onClick: () => navigate("/accountant/create-facture"),
    },
    {
      icon: FileText,
      label: "View Reports",
      onClick: () => navigate("/accountant/financial-reports"),
    },
    //{ icon: Settings, label: "Settings", onClick: () => alert("Settings") },
  ];

  return (
    <AccountantDashBoard
      linkList={AccountantNavLink}
      requiredRole={"Accountant"}
    >
      <AccountantNavBar />
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold mb-4">Accounting Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Revenue"
            value={stats.totalRevenue}
            description="Total income generated"
            color="bg-green-500"
          />
          <StatCard
            title="Total Expenses"
            value={stats.totalExpenses}
            description="Total expenses incurred"
            color="bg-red-500"
          />
          <StatCard
            title="Net Profit"
            value={stats.netProfit}
            description="Total profit after expenses"
            color="bg-blue-500"
          />
          <StatCard
            title="Total Clients"
            value={stats.totalClients}
            description="Number of clients served"
            color="bg-yellow-500"
          />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <QuickActionButton
                key={index}
                icon={action.icon}
                label={action.label}
                onClick={action.onClick}
              />
            ))}
          </div>
        </div>
      </div>
    </AccountantDashBoard>
  );
}

function StatCard({ title, value, description, color }) {
  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 flex items-start gap-4`}>
      <div className={`${color} rounded-full p-3 text-white`}>
        <DollarSign className="w-6 h-6" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}

function QuickActionButton({ icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-4 rounded-lg border border-gray-200 hover:border-2 hover:border-primary-end hover:bg-gray-100 transition-all duration-300"
    >
      <Icon className="w-6 h-6 text-primary-end" />
      <span className="text-md text-gray-600 font-bold text-center">
        {label}
      </span>
    </button>
  );
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

QuickActionButton.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
