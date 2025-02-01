import { useState } from "react";
import PropTypes from "prop-types";
import { FaTimes, FaSave, FaBan } from "react-icons/fa";
import axiosInstance from "../../../Utils/axiosInstanceAccountant.js";

export function AddAccountModal({
  isOpen,
  onClose,
  setCanOpenSuccessModal,
  setSuccessMessage,
  setIsLoading,
}) {
  const [accountNumber, setAccountNumber] = useState("");
  const [accountLabel, setAccountLabel] = useState("");
  const [error, setError] = useState("");

  const handleAddAccount = async () => {
    // Vérification que les champs ne sont pas vides
    if (!accountNumber || !accountLabel) {
      setError("Tous les champs sont obligatoires.");
      return;
    }

    // Vérification que le numéro de compte ne contient que des chiffres et a au moins 4 chiffres
    if (!/^\d{4,}$/.test(accountNumber)) {
      setError(
        "Le numéro de compte doit contenir au moins 4 chiffres et ne doit contenir que des chiffres."
      );
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/account/", {
        number: accountNumber,
        libelle: accountLabel,
      });

      if (response.status === 201) {
        setSuccessMessage("Compte ajouté avec succès !");
        setCanOpenSuccessModal(true);
        onClose();
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du compte :", error);
      setError("Une erreur est survenue lors de l'ajout du compte.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccountNumberChange = (e) => {
    const value = e.target.value;
    // N'accepte que les chiffres
    if (/^\d*$/.test(value)) {
      setAccountNumber(value);
    }
    setError("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <FaSave className="mr-2 text-blue-500" />
              Ajouter un nouveau compte
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition duration-300"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Remplissez les informations du nouveau compte ci-dessous.
          </p>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="accountNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Numéro de compte
              </label>
              <input
                id="accountNumber"
                type="text"
                value={accountNumber}
                onChange={handleAccountNumberChange}
                className={`w-full px-3 py-2 border ${
                  error ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Entrez au moins 4 chiffres"
              />
            </div>

            <div>
              <label
                htmlFor="accountLabel"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Libellé du compte
              </label>
              <input
                id="accountLabel"
                type="text"
                value={accountLabel}
                onChange={(e) => setAccountLabel(e.target.value)}
                className={`w-full px-3 py-2 border ${
                  error ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Entrez le libellé du compte"
              />
            </div>
          </div>

          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>

        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center rounded-b-lg">
          <button
            onClick={handleAddAccount}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
          >
            <FaSave className="mr-2" />
            Enregistrer
          </button>
          <button
            onClick={onClose}
            className="flex items-center px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-300"
          >
            <FaBan className="mr-2" />
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}

AddAccountModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  setCanOpenSuccessModal: PropTypes.func.isRequired,
  setSuccessMessage: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};
