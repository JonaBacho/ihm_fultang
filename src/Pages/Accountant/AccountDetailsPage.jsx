import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstanceAccountant from "../../Utils/axiosInstanceAccountant.js";
import axiosInstance from "../../Utils/axiosInstance.js";
import { ErrorModal } from "../Modals/ErrorModal.jsx";
import Wait from "../Modals/wait.jsx";
import { FaEye, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { InvoiceDetailsModal } from "./Components/InvoiceDetailsModal.jsx"; // Modal pour les détails de la facture
import { Tooltip } from "antd"; // Import Tooltip from antd library
import { AccountantDashBoard } from "./Components/AccountantDashboard.jsx";
import { AccountantNavLink } from "./AccountantNavLink";
import { useLocation } from "react-router-dom";

export function AccountDetailsPage() {
  const { accountId } = useParams();
  const { state } = useLocation();
  const accountDetail = state.account;
  const [accountDetails, setAccountDetails] = useState({});
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [canOpenErrorMessageModal, setCanOpenErrorMessageModal] =
    useState(false);
  const [canOpenInvoiceDetailsModal, setCanOpenInvoiceDetailsModal] =
    useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // États pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [nextUrl, setNextUrl] = useState(null);
  const [previousUrl, setPreviousUrl] = useState(null);

  // Fonction pour récupérer les détails du compte et les factures paginées
  const fetchAccountDetails = async (url = `/bill/get_for_account`) => {
    setIsLoading(true);
    try {
      const accountResponse = await axiosInstanceAccountant.get(
        `/acccount-state/${accountId}/`
      );
      console.log(accountResponse);
      const invoicesResponse = await axiosInstance.get(
        url + `/?account_id=${accountDetail.id}`
      );
      console.log(invoicesResponse);
      if (accountResponse.status === 200 && invoicesResponse.status === 200) {
        setAccountDetails(accountResponse.data);
        setInvoices(invoicesResponse.data.results);
        setTotalPages(
          Math.ceil(
            invoicesResponse.data.count ? invoicesResponse.data.count / 10 : 1
          )
        ); // Supposons 10 factures par page
        setNextUrl(invoicesResponse.data.next);
        setPreviousUrl(invoicesResponse.data.previous);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.detail || "An error occurred");
      setCanOpenErrorMessageModal(true);
      setInvoices([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAccountDetails();
  }, [accountId, currentPage]); // Recharger les données lorsque la page change

  // Fonction pour valider une facture
  const validateInvoice = async (invoiceId) => {
    try {
      const response = await axiosInstance.post(
        `/invoices/${invoiceId}/validate/`
      );
      if (response.status === 200) {
        // Recharger les détails du compte et les factures après validation
        await fetchAccountDetails();
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.detail || "An error occurred");
      setCanOpenErrorMessageModal(true);
    }
  };

  // Fonction pour changer de page
  const handlePageChange = (action) => {
    if (action === "next" && nextUrl) {
      setCurrentPage(currentPage + 1);
    } else if (action === "prev" && previousUrl) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <AccountantDashBoard
      requiredRole={"Accountant"}
      linkList={AccountantNavLink}
    >
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-5">Détails du Compte</h1>
        {isLoading && <Wait />}

        {/* Section des soldes du compte */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-100 p-4 rounded-lg shadow-md">
            <p className="text-lg font-semibold">Valeur Totale</p>
            <p className="text-2xl">{accountDetails.soldePrevu} FCFA</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg shadow-md">
            <p className="text-lg font-semibold">Valeur Réelle</p>
            <p className="text-2xl">{accountDetails.soldeReel} FCFA</p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg shadow-md">
            <p className="text-lg font-semibold">Factures Non Validées</p>
            <p className="text-2xl">0</p>
          </div>
        </div>

        {/* Tableau des factures */}
        <div className="bg-white p-5 rounded-lg shadow-md">
          <table className="w-full border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-gradient-to-l from-primary-start to-primary-end">
                <th className="text-center text-white p-4 text-xl font-bold rounded-l-2xl">
                  No
                </th>
                <th className="text-center text-white p-4 text-xl font-bold">
                  Date
                </th>
                <th className="text-center text-white p-4 text-xl font-bold">
                  Montant
                </th>
                <th className="text-center text-white p-4 text-xl font-bold">
                  Opérateur
                </th>
                <th className="text-center text-white p-4 text-xl font-bold rounded-r-2xl">
                  Opérations
                </th>
              </tr>
            </thead>
            <tbody>
              {invoices?.map((invoice, index) => (
                <tr key={invoice.id} className="bg-gray-100">
                  <td className="p-4 text-md text-blue-900 rounded-l-lg text-center">
                    {index + 1}
                  </td>
                  <td className="p-4 text-md text-center">{invoice.date}</td>
                  <td className="p-4 text-md text-center">
                    {invoice.amount} FCFA
                  </td>
                  <td className="p-4 text-md text-center">
                    {invoice.operator}
                  </td>
                  <td className="p-4 relative rounded-r-lg">
                    <div className="flex justify-center">
                      <Tooltip placement="left" title="Voir les détails">
                        <button
                          onClick={() => {
                            setSelectedInvoice(invoice);
                            setCanOpenInvoiceDetailsModal(true);
                          }}
                          className="flex items-center justify-center w-9 h-9 text-primary-end text-xl hover:bg-gray-300 hover:rounded-full transition-all duration-300"
                        >
                          <FaEye />
                        </button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <div className="flex gap-4">
              <Tooltip placement="left" title="Page précédente">
                <button
                  onClick={() => handlePageChange("prev")}
                  disabled={!previousUrl}
                  className={`w-10 h-10 border-2 rounded-lg flex items-center justify-center ${
                    !previousUrl
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-secondary hover:bg-secondary hover:text-white"
                  }`}
                >
                  <FaArrowLeft />
                </button>
              </Tooltip>
              <p className="text-secondary text-2xl font-bold mt-2">
                Page {currentPage} sur {totalPages}
              </p>
              <Tooltip placement="right" title="Page suivante">
                <button
                  onClick={() => handlePageChange("next")}
                  disabled={!nextUrl}
                  className={`w-10 h-10 border-2 rounded-lg flex items-center justify-center ${
                    !nextUrl
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-secondary hover:bg-secondary hover:text-white"
                  }`}
                >
                  <FaArrowRight />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Modal pour les détails de la facture */}
        <InvoiceDetailsModal
          isOpen={canOpenInvoiceDetailsModal}
          onClose={() => setCanOpenInvoiceDetailsModal(false)}
          invoice={selectedInvoice}
          validateInvoice={validateInvoice}
        />

        {/* Modal d'erreur */}
        <ErrorModal
          isOpen={canOpenErrorMessageModal}
          onCloseErrorModal={() => setCanOpenErrorMessageModal(false)}
          message={errorMessage}
        />
      </div>
    </AccountantDashBoard>
  );
}
