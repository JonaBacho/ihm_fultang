import PropTypes from "prop-types";
import axiosInstance from "../../../Utils/axiosInstanceAccountant.js";
import { useState } from "react";
import { FaTimes, FaSave, FaBan } from "react-icons/fa";

export function AddAccountModal({
  isOpen,
  onClose,
  setCanOpenSuccessModal,
  setSuccessMessage,
  setIsLoading,
}) {
  AddAccountModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    setCanOpenSuccessModal: PropTypes.func.isRequired,
    setSuccessMessage: PropTypes.func.isRequired,
    setIsLoading: PropTypes.func.isRequired,
  };
  const [accountNumber, setAccountNumber] = useState("");
  const [accountLabel, setAccountLabel] = useState("");
  const [error, setError] = useState(""); // État pour gérer l'erreur

  const handleAddAccount = async () => {
    if (accountNumber.length <= 4) {
      setError("Le numéro de compte doit contenir plus de 4 chiffres."); // Définir le message d'erreur
      return;
    }

    // Réinitialiser l'erreur si la validation réussit
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-6 rounded-lg w-1/3 shadow-lg">
        {/* En-tête de la modal */}
        <div className="flex justify-between items-center mb-6">
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

        {/* Corps de la modal */}
        <div className="space-y-4">
          {/* Champ pour le numéro de compte */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Numéro de compte
            </label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => {
                setAccountNumber(e.target.value);
                setError(""); // Réinitialiser l'erreur lorsque l'utilisateur modifie le champ
              }}
              className={`w-full px-4 py-2 border ${
                error ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Entrez le numéro de compte (plus de 4 chiffres)"
            />
            {/* Affichage du message d'erreur en rouge */}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          {/* Champ pour le libellé du compte */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Libellé du compte
            </label>
            <input
              type="text"
              value={accountLabel}
              onChange={(e) => setAccountLabel(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez le libellé du compte"
            />
          </div>
        </div>

        {/* Pied de la modal avec boutons */}
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="flex items-center px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300"
          >
            <FaBan className="mr-2" />
            Annuler
          </button>
          <button
            onClick={handleAddAccount}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            <FaSave className="mr-2" />
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}
