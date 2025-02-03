import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axiosInstanceAccountant from "../../Utils/axiosInstanceAccountant";
import axiosInstance from "../../Utils/axiosInstance";
import { ErrorModal } from "../Modals/ErrorModal";
import Wait from "../Modals/wait";
import {
  FaEye,
  FaArrowLeft,
  FaArrowRight,
  FaSort,
  FaPlus,
} from "react-icons/fa";
import { InvoiceDetailsModal } from "./Components/InvoiceDetailsModal.jsx";
import { Tooltip, Modal, Input, Button } from "antd";
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
  const [isAddOperationModalVisible, setIsAddOperationModalVisible] =
    useState(false);
  const [newOperationName, setNewOperationName] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [nextUrl, setNextUrl] = useState(null);
  const [previousUrl, setPreviousUrl] = useState(null);

  const fetchAccountDetails = async (url = `/bill/get_for_account`) => {
    setIsLoading(true);
    try {
      const accountResponse = await axiosInstanceAccountant.get(
        `/acccount-state/${accountId}/`
      );
      const invoicesResponse = await axiosInstance.get(
        url + `/?account_id=${accountDetail.id}`
      );
      if (accountResponse.status === 200 && invoicesResponse.status === 200) {
        setAccountDetails(accountResponse.data);
        setInvoices(invoicesResponse.data.results);
        setTotalPages(
          Math.ceil(
            invoicesResponse.data.count ? invoicesResponse.data.count / 10 : 1
          )
        );
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
  }, [accountId, accountDetail, currentPage]); // Added accountDetail to dependencies

  const validateInvoice = async (invoiceId) => {
    try {
      const response = await axiosInstance.post(
        `/invoices/${invoiceId}/validate/`
      );
      if (response.status === 200) {
        await fetchAccountDetails();
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.detail || "An error occurred");
      setCanOpenErrorMessageModal(true);
    }
  };

  const handlePageChange = (action) => {
    if (action === "next" && nextUrl) {
      setCurrentPage(currentPage + 1);
    } else if (action === "prev" && previousUrl) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAddOperation = useCallback(async () => {
    try {
      const response = await axiosInstanceAccountant.post(
        "/financial-operation/",
        {
          name: newOperationName,
          account: accountDetail.id,
        }
      );
      if (response.status === 201) {
        setIsAddOperationModalVisible(false);
        setNewOperationName("");
        await fetchAccountDetails();
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.detail ||
          "An error occurred while adding the operation"
      );
      setCanOpenErrorMessageModal(true);
    }
  }, [newOperationName, accountDetail.id]);

  return (
    <AccountantDashBoard
      requiredRole={"Accountant"}
      linkList={AccountantNavLink}
    >
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-5">Détails du Compte</h1>
        {isLoading && <Wait />}

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

        <div className="bg-white p-5 rounded-lg shadow-md">
          <table className="w-full border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-gradient-to-r from-primary-start to-primary-end text-white">
                <th className="py-4 px-6 text-left rounded-tl-lg">
                  <div className="flex items-center">
                    <span className="mr-2">#</span>
                    <FaSort className="text-gray-300" />
                  </div>
                </th>
                <th className="py-4 px-6 text-left">
                  <div className="flex items-center">
                    <span className="mr-2">Date</span>
                    <FaSort className="text-gray-300" />
                  </div>
                </th>
                <th className="py-4 px-6 text-left">
                  <div className="flex items-center">
                    <span className="mr-2">Montant</span>
                    <FaSort className="text-gray-300" />
                  </div>
                </th>
                <th className="py-4 px-6 text-left">
                  <div className="flex items-center">
                    <span className="mr-2">Opérateur</span>
                    <FaSort className="text-gray-300" />
                  </div>
                </th>
                <th className="py-4 px-6 text-center rounded-tr-lg">
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
                            console.log("Voici la facture", invoice);
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

        <InvoiceDetailsModal
          isOpen={canOpenInvoiceDetailsModal}
          onClose={() => setCanOpenInvoiceDetailsModal(false)}
          invoice={selectedInvoice}
          validateInvoice={validateInvoice}
        />

        <ErrorModal
          isOpen={canOpenErrorMessageModal}
          onCloseErrorModal={() => setCanOpenErrorMessageModal(false)}
          message={errorMessage}
        />

        <Tooltip placement="top" title="Ajouter une nouvelle opération">
          <button
            onClick={() => setIsAddOperationModalVisible(true)}
            className="fixed bottom-5 right-5 rounded-full w-14 h-14 bg-gradient-to-r text-4xl font-bold text-white from-primary-start to-primary-end hover:text-5xl transition-all duration-300 flex items-center justify-center"
          >
            <FaPlus />
          </button>
        </Tooltip>

        <Modal
          title="Ajouter une nouvelle opération financière"
          open={isAddOperationModalVisible}
          onCancel={() => setIsAddOperationModalVisible(false)}
          footer={[
            <Button
              key="cancel"
              onClick={() => setIsAddOperationModalVisible(false)}
            >
              Annuler
            </Button>,
            <Button key="submit" type="primary" onClick={handleAddOperation}>
              Ajouter
            </Button>,
          ]}
        >
          <Input
            placeholder="Nom de l'opération"
            value={newOperationName}
            onChange={(e) => setNewOperationName(e.target.value)}
          />
        </Modal>
      </div>
    </AccountantDashBoard>
  );
}
