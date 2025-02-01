import { FaCheckCircle, FaTimes } from "react-icons/fa";
import PropTypes from "prop-types";
import axiosInstance from "../../../Utils/axiosInstance.js";
import { useEffect, useState } from "react";
export function InvoiceDetailsModal({
  isOpen,
  onClose,
  invoice,
  validateInvoice,
}) {
  InvoiceDetailsModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    invoice: PropTypes.object.isRequired,
    validateInvoice: PropTypes.func.isRequired,
  };

  const [invoiceLines, setInvoiceLines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fonction pour récupérer les lignes de la facture
  const fetchInvoiceLines = async () => {
    if (!invoice) return;

    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/bill-item/${invoice.id}/`);
      if (response.status === 200) {
        setInvoiceLines(response.data);
      }
    } catch (error) {
      console.error("Error fetching invoice lines:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && invoice) {
      fetchInvoiceLines();
    }
  }, [isOpen, invoice]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-6 rounded-lg w-1/2 shadow-lg">
        {/* En-tête de la modal */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            Détails de la Facture
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition duration-300"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Corps de la modal */}
        {isLoading ? (
          <p>Chargement en cours...</p>
        ) : (
          <div className="space-y-4">
            {/* Informations de la facture */}
            <div>
              <p>
                <strong>Date:</strong> {invoice?.date}
              </p>
              <p>
                <strong>Montant:</strong> {invoice?.amount} FCFA
              </p>
              <p>
                <strong>Opérateur:</strong> {invoice?.operator}
              </p>
            </div>

            {/* Lignes de la facture */}
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Lignes de la Facture
              </h3>
              <table className="w-full border-separate border-spacing-y-2">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 text-left">Désignation</th>
                    <th className="p-2 text-left">Quantité</th>
                    <th className="p-2 text-left">Prix Unitaire</th>
                    <th className="p-2 text-left">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceLines.map((line) => (
                    <tr key={line.id} className="bg-gray-100">
                      <td className="p-2">{line.designation}</td>
                      <td className="p-2">{line.quantity}</td>
                      <td className="p-2">{line.unitP} FCFA</td>
                      <td className="p-2">{line.totalP} FCFA</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bouton de validation ou OK */}
            <div className="flex justify-end">
              {invoice?.isValidated ? (
                <button
                  onClick={onClose}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  OK
                </button>
              ) : (
                <button
                  onClick={() => validateInvoice(invoice.id)}
                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                >
                  <FaCheckCircle className="mr-2" />
                  Valider la Facture
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
