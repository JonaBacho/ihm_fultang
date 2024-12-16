import {FaChevronDown, FaChevronUp, FaUserNurse} from "react-icons/fa";
import {HeartCrack} from "lucide-react";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import { useState } from "react";


export function ConsultationList({ consultations }) {
  ConsultationList.propTypes = {
    consultations: PropTypes.array.isRequired,
  };

  const [cons, setCons] = useState(consultations);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Nombre d'éléments par page
  const totalPages = Math.ceil(cons.length / itemsPerPage);

  const [isSorted, setIsSorted] = useState(false);

  // Fonction pour marquer une consultation comme "Payé"
  const handlePayment = (id) => {
    setCons((prevConsultations) =>
      prevConsultations.map((consultation) =>
        consultation.id === id ? { ...consultation, status: "Payé" } : consultation
      )
    );
  };

  // Fonction pour trier les consultations par statut
  const sortByStatus = () => {
    setCons((prevConsultations) => {
      const sortedConsultations = [...prevConsultations].sort((a, b) => {
        if (a.status === b.status) return 0;
        return a.status === "Payé" ? -1 : 1; // "Payé" avant "Non payé"
      });
      return sortedConsultations;
    });
    setIsSorted(true);
  };

  // Gestion de la pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = cons.slice(startIndex, startIndex + itemsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="p-6 font-sans">
      <h2 className="text-2xl font-bold mb-4">Liste des consultations</h2>

      <button
        onClick={sortByStatus}
        className={`mb-4 px-4 py-2 ${
          isSorted ? "bg-gray-400 cursor-not-allowed" : "bg-secondary "
        } text-white rounded`}
        disabled={isSorted}
      >
        Trier par statut
      </button>

      <table className="w-full border-separate border-spacing-y-2">
        <thead>
          <tr>
            <th className="text-center p-4 text-xl font-bold border-r-2 border-gray-200">ID</th>
            <th className="text-center p-4 text-xl font-bold border-r-2 border-gray-200">Date</th>
            <th className="text-center p-4 text-xl font-bold border-r-2 border-gray-200">Heure</th>
            <th className="text-center p-4 text-xl font-bold border-r-2 border-gray-200">Coût</th>
            <th className="text-center p-4 text-xl font-bold border-r-2 border-gray-200">Motif</th>
            <th className="text-center p-4 text-xl font-bold border-r-2 border-gray-200">Allergie</th>
            <th className="text-center p-4 text-xl font-bold border-r-2 border-gray-200">Statut</th>
            <th className="text-center p-4 text-xl font-bold flex-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((consultation, index) => (
            <tr key={consultation.id || index} className="bg-gray-100">
              <td className="p-4 text-md text-blue-900 text-center">{consultation.id}</td>
              <td className="p-4 text-md text-center">{consultation.consultationDate}</td>
              <td className="p-4 text-md text-center">{consultation.consultationTime}</td>
              <td className="p-4 text-md text-center">
                {consultation.consultationCost
                  ? `${consultation.consultationCost.toFixed(2)} FCFA`
                  : "N/A"}
              </td>
              <td className="p-4 text-md text-center">{consultation.consultationReason}</td>
              <td className="p-4 text-md text-center">{consultation.allergy || "Aucune"}</td>
              <td
                className={`p-4 text-center ${
                  consultation.status === "Payé" ? "text-green-600" : "text-red-600"
                }`}
              >
                {consultation.status}
              </td>
              <td className="p-4 text-md text-center">
                {consultation.status === "Non payé" ? (
                  <button
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    onClick={() => handlePayment(consultation.id)}
                  >
                    Payer
                  </button>
                ) : (
                  <button
                    className="px-4 py-2 bg-white text-green-600 border border-green-600 rounded cursor-not-allowed"
                    disabled
                  >
                    Payé
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={goToPreviousPage}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded"
          disabled={currentPage === 1}
        >
          Précédent
        </button>
        <span className="text-md">
          Page {currentPage} sur {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded"
          disabled={currentPage === totalPages}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
