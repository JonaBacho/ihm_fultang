import { useState } from "react";
import PropTypes from "prop-types";

export function Exams({ exams }) {
  Exams.propTypes = {
    exams: PropTypes.array.isRequired,
  };

  const [examList, setExamList] = useState(exams);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Nombre d'éléments par page
  const totalPages = Math.ceil(examList.length / itemsPerPage);

  const [isSorted, setIsSorted] = useState(false);

  // Fonction pour marquer un examen comme "Payé"
  const handlePayment = (id) => {
    setExamList((prevExams) =>
      prevExams.map((exam) =>
        exam.id === id ? { ...exam, statut: "Payé" } : exam
      )
    );
  };

  // Fonction pour trier les examens par statut
  const sortByStatus = () => {
    setExamList((prevExams) => {
      const sortedExams = [...prevExams].sort((a, b) => {
        if (a.statut === b.statut) return 0;
        return a.statut === "Payé" ? -1 : 1; // "Payé" avant "Non payé"
      });
      return sortedExams;
    });
    setIsSorted(true);
  };

  // Gestion de la pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = examList.slice(startIndex, startIndex + itemsPerPage);

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
      <h2 className="text-2xl font-bold mb-4">Liste des examens</h2>

      <button
        onClick={sortByStatus}
        className={`mb-4 px-4 py-2 ${
          isSorted ? "bg-gray-400 cursor-not-allowed" : "bg-secondary"
        } text-white rounded`}
        disabled={isSorted}
      >
        Trier par statut
      </button>

      <table className="w-full border-separate border-spacing-y-2">
        <thead>
          <tr>
            <th className="text-center p-4 text-xl font-bold border-r-2 border-gray-200">ID</th>
            <th className="text-center p-4 text-xl font-bold border-r-2 border-gray-200">Nom</th>
            <th className="text-center p-4 text-xl font-bold border-r-2 border-gray-200">Coût</th>
            <th className="text-center p-4 text-xl font-bold border-r-2 border-gray-200">Description</th>
            <th className="text-center p-4 text-xl font-bold border-r-2 border-gray-200">Statut</th>
            <th className="text-center p-4 text-xl font-bold flex-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((exam, index) => (
            <tr key={exam.id || index} className="bg-gray-100">
              <td className="p-4 text-md text-blue-900 text-center">{exam.id}</td>
              <td className="p-4 text-md text-center">{exam.examName}</td>
              <td className="p-4 text-md text-center">
                {exam.examCost ? `${exam.examCost.toFixed(2)} FCFA` : "N/A"}
              </td>
              <td className="p-4 text-md text-center">
                {exam.examDescription || "Aucune description"}
              </td>
              <td
                className={`p-4 text-center ${
                  exam.statut === "Payé" ? "text-green-600" : "text-red-600"
                }`}
              >
                {exam.statut}
              </td>
              <td className="p-4 text-md text-center">
                {exam.statut === "Non payé" ? (
                  <button
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    onClick={() => handlePayment(exam.id)}
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
