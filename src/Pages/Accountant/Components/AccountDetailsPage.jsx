import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../Utils/axiosInstance.js";
import { ErrorModal } from "../../Modals/ErrorModal.jsx";
import Wait from "../../Modals/wait.jsx";

export function AccountDetailsPage() {
  const { accountId } = useParams();
  const [accountDetails, setAccountDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [canOpenErrorMessageModal, setCanOpenErrorMessageModal] =
    useState(false);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(`/accounts/${accountId}/`);
        if (response.status === 200) {
          setAccountDetails(response.data);
        }
      } catch (error) {
        setErrorMessage(error.response?.data?.detail || "An error occurred");
        setCanOpenErrorMessageModal(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccountDetails();
  }, [accountId]);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Account Details</h1>
      {isLoading && <Wait />}
      <div className="bg-gray-100 p-5 rounded-lg">
        <p>
          <strong>Account Number:</strong> {accountDetails.accountNumber}
        </p>
        <p>
          <strong>Account Label:</strong> {accountDetails.accountLabel}
        </p>
        <p>
          <strong>Current Amount:</strong> {accountDetails.currentAmount}
        </p>
        <p>
          <strong>Physical Amount:</strong> {accountDetails.physicalAmount}
        </p>
        {/* Ajoutez d'autres détails du compte ici si nécessaire */}
      </div>
      <ErrorModal
        isOpen={canOpenErrorMessageModal}
        onCloseErrorModal={() => setCanOpenErrorMessageModal(false)}
        message={errorMessage}
      />
    </div>
  );
}
