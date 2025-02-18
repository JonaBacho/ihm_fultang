import { format } from "date-fns";
import {
  FaTimes,
  FaUser,
  FaCalendar,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
  FaFileInvoice,
} from "react-icons/fa";
import PropTypes from "prop-types";

export function InvoiceDetailsModal({
  isOpen,
  onClose,
  invoice,
  validateInvoice,
}) {
  if (!isOpen || !invoice) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-all duration-300">
      <div className="bg-white rounded-lg shadow-xl w-[700px]">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex justify-between items-center bg-gradient-to-r from-primary-start to-primary-end p-4">
            <h2 className="text-2xl font-bold text-white">Invoice Details</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200"
            >
              <FaTimes size={24} />
            </button>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <DetailItem
                icon={<FaFileInvoice />}
                label="Invoice ID"
                value={invoice.billCode}
              />
              <DetailItem
                icon={<FaCalendar />}
                label="Date"
                value={format(new Date(invoice.date), "PPP 'at' p")}
              />
              <DetailItem
                icon={<FaMoneyBillWave />}
                label="Amount"
                value={`${invoice.amount} FCFA`}
              />
              <DetailItem
                icon={
                  invoice.isValidated ? (
                    <FaCheckCircle className="text-green-500" />
                  ) : (
                    <FaTimesCircle className="text-red-500" />
                  )
                }
                label="Validated"
                value={invoice.isValidated ? "Yes" : "No"}
              />
              <DetailItem
                icon={<FaUser />}
                label="Operator"
                value={`${invoice.operator.first_name} ${invoice.operator.last_name}`}
              />
            </div>

            {/* Invoice Items */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Invoice Items</h3>
              <table className="w-full border-separate border-spacing-y-2">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 text-left">Designation</th>
                    <th className="p-2 text-left">Quantity</th>
                    <th className="p-2 text-left">Unit Price</th>
                    <th className="p-2 text-left">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.bill_items &&
                    invoice.bill_items.map((item) => (
                      <tr key={item.id} className="bg-gray-100">
                        <td className="p-2">{item.designation}</td>
                        <td className="p-2">{item.quantity}</td>
                        <td className="p-2">{item.unitP} FCFA</td>
                        <td className="p-2">{item.totalP} FCFA</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Validation Button */}
            {!invoice.isValidated && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => validateInvoice(invoice.billCode)}
                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                >
                  <FaCheckCircle className="mr-2" />
                  Validate Invoice
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ icon, label, value }) {
  return (
    <div className="flex items-center space-x-2">
      <div className="text-primary-start">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}

InvoiceDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  invoice: PropTypes.object,
  validateInvoice: PropTypes.func.isRequired,
};
