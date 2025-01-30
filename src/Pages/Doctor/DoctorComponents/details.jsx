import { useState } from "react"
import {
    User,
    Calendar,
    DollarSign,
    Weight,
    Ruler,
    Thermometer,
    Activity,
    Heart,
    AlertTriangle,
    PillIcon as Pills,
    FileText,
    Stethoscope,
    PlusCircle,
    MinusCircle,
    Hospital,
    UserPlus,
    CalendarCheck,
    ClipboardList,
} from "lucide-react"

// Données simulées
const availableExams = [
    { id: 1, name: "Radiographie pulmonaire", price: 15000 },
    { id: 2, name: "Analyse de sang complète", price: 25000 },
    { id: 3, name: "Scanner thoracique", price: 45000 },
]

const availableMedications = [
    { id: 1, name: "Paracétamol 1000mg" },
    { id: 2, name: "Ibuprofène 400mg" },
    { id: 3, name: "Amoxicilline 500mg" },
]

const availableSpecialists = [
    { id: 1, name: "Dr. Martin - Cardiologie" },
    { id: 2, name: "Dr. Dubois - Pneumologie" },
    { id: 3, name: "Dr. Bernard - Neurologie" },
]

export default function ConsultationForm() {
    const [activeTab, setActiveTab] = useState("diagnostic")
    const [prescriptions, setPrescriptions] = useState([])
    const [exams, setExams] = useState([])
    const [diagnostic, setDiagnostic] = useState("")
    const [doctorNotes, setDoctorNotes] = useState("")

    const addPrescription = () => {
        setPrescriptions([
            ...prescriptions,
            {
                id: Date.now(),
                medication: "",
                dosage: "",
                frequency: "",
                duration: "",
                instructions: "",
            },
        ])
    }

    const removePrescription = (id) => {
        setPrescriptions(prescriptions.filter((p) => p.id !== id))
    }

    const updatePrescription = (id, field, value) => {
        setPrescriptions(prescriptions.map((p) => (p.id === id ? { ...p, [field]: value } : p)))
    }

    const addExam = () => {
        setExams([
            ...exams,
            {
                id: Date.now(),
                exam: "",
                instructions: "",
                isCustom: false,
            },
        ])
    }

    const removeExam = (id) => {
        setExams(exams.filter((e) => e.id !== id))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Soumission de la consultation:", {
            diagnostic,
            doctorNotes,
            prescriptions,
            exams,
        })
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* En-tête du patient */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Informations patient */}
                    <div>
                        <div className="flex items-center mb-4">
                            <User className="h-5 w-5 text-gray-400 mr-2" />
                            <div>
                                <h2 className="text-lg font-semibold">Jean Dupont</h2>
                                <p className="text-sm text-gray-500">ID: 12345</p>
                            </div>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <Calendar className="h-5 w-5 mr-2" />
                            <span>28 janvier 2024 - 09:00</span>
                        </div>
                    </div>

                    {/* Prix consultation */}
                    <div>
                        <div className="flex items-center text-gray-600">
                            <DollarSign className="h-5 w-5 mr-2" />
                            <span>25000 FCFA</span>
                        </div>
                    </div>

                    {/* Notes infirmière */}
                    <div className="lg:col-span-1">
                        <h3 className="font-semibold mb-2 flex items-center">
                            <ClipboardList className="h-5 w-5 mr-2 text-blue-500" />
                            Notes de l'infirmière
                        </h3>
                        <p className="text-sm text-gray-600">
                            Patient se plaint de fièvre et de toux depuis 2 jours. Pas de difficultés respiratoires notables.
                        </p>
                    </div>
                </div>

                {/* Paramètres vitaux */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center text-gray-600">
                            <Weight className="h-5 w-5 mr-2 text-blue-500" />
                            <span className="text-sm">Poids</span>
                        </div>
                        <p className="text-lg font-semibold mt-1">70 Kg</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center text-gray-600">
                            <Ruler className="h-5 w-5 mr-2 text-blue-500" />
                            <span className="text-sm">Taille</span>
                        </div>
                        <p className="text-lg font-semibold mt-1">1.89 m²</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center text-gray-600">
                            <Thermometer className="h-5 w-5 mr-2 text-blue-500" />
                            <span className="text-sm">Température</span>
                        </div>
                        <p className="text-lg font-semibold mt-1">37.2°C</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center text-gray-600">
                            <Activity className="h-5 w-5 mr-2 text-blue-500" />
                            <span className="text-sm">Tension</span>
                        </div>
                        <p className="text-lg font-semibold mt-1">120/80 mmHg</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center text-gray-600">
                            <Heart className="h-5 w-5 mr-2 text-blue-500" />
                            <span className="text-sm">Pouls</span>
                        </div>
                        <p className="text-lg font-semibold mt-1">72 bpm</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center text-gray-600">
                            <AlertTriangle className="h-5 w-5 mr-2 text-blue-500" />
                            <span className="text-sm">Allergies</span>
                        </div>
                        <p className="text-lg font-semibold mt-1">Poussière</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center text-gray-600">
                            <Pills className="h-5 w-5 mr-2 text-blue-500" />
                            <span className="text-sm">Médicaments</span>
                        </div>
                        <p className="text-lg font-semibold mt-1">Ventoline</p>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center text-gray-600">
                            <FileText className="h-5 w-5 mr-2 text-blue-500" />
                            <span className="text-sm">Antécédents</span>
                        </div>
                        <p className="text-lg font-semibold mt-1">Asthme</p>
                    </div>
                </div>
            </div>

            {/* Formulaire de consultation */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                {/* Navigation */}
                <nav className="flex space-x-4 mb-6 border-b">
                    <button
                        onClick={() => setActiveTab("diagnostic")}
                        className={`pb-4 px-2 ${
                            activeTab === "diagnostic"
                                ? "border-b-2 border-blue-500 text-blue-600"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        <div className="flex items-center">
                            <Stethoscope className="h-5 w-5 mr-2" />
                            Diagnostic
                        </div>
                    </button>
                    <button
                        onClick={() => setActiveTab("prescriptions")}
                        className={`pb-4 px-2 ${
                            activeTab === "prescriptions"
                                ? "border-b-2 border-blue-500 text-blue-600"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        <div className="flex items-center">
                            <Pills className="h-5 w-5 mr-2" />
                            Prescriptions
                        </div>
                    </button>
                    <button
                        onClick={() => setActiveTab("exams")}
                        className={`pb-4 px-2 ${
                            activeTab === "exams" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        <div className="flex items-center">
                            <Hospital className="h-5 w-5 mr-2" />
                            Examens
                        </div>
                    </button>
                    <button
                        onClick={() => setActiveTab("referral")}
                        className={`pb-4 px-2 ${
                            activeTab === "referral"
                                ? "border-b-2 border-blue-500 text-blue-600"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        <div className="flex items-center">
                            <UserPlus className="h-5 w-5 mr-2" />
                            Transfert
                        </div>
                    </button>
                    <button
                        onClick={() => setActiveTab("followup")}
                        className={`pb-4 px-2 ${
                            activeTab === "followup"
                                ? "border-b-2 border-blue-500 text-blue-600"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        <div className="flex items-center">
                            <CalendarCheck className="h-5 w-5 mr-2" />
                            Suivi
                        </div>
                    </button>
                </nav>

                <form onSubmit={handleSubmit}>
                    {/* Diagnostic */}
                    {activeTab === "diagnostic" && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Diagnostic</label>
                                <input
                                    type="text"
                                    value={diagnostic}
                                    onChange={(e) => setDiagnostic(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Entrez le diagnostic"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Notes du médecin</label>
                                <textarea
                                    value={doctorNotes}
                                    onChange={(e) => setDoctorNotes(e.target.value)}
                                    rows={4}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Ajoutez vos observations"
                                />
                            </div>
                        </div>
                    )}

                    {/* Prescriptions */}
                    {activeTab === "prescriptions" && (
                        <div className="space-y-6">
                            {prescriptions.map((prescription, index) => (
                                <div key={prescription.id} className="bg-gray-50 p-4 rounded-lg relative">
                                    <button
                                        type="button"
                                        onClick={() => removePrescription(prescription.id)}
                                        className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                                    >
                                        <MinusCircle className="h-5 w-5" />
                                    </button>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Médicament</label>
                                            <select
                                                value={prescription.medication}
                                                onChange={(e) => updatePrescription(prescription.id, "medication", e.target.value)}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="">Sélectionner un médicament</option>
                                                {availableMedications.map((med) => (
                                                    <option key={med.id} value={med.name}>
                                                        {med.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Dosage</label>
                                            <input
                                                type="text"
                                                value={prescription.dosage}
                                                onChange={(e) => updatePrescription(prescription.id, "dosage", e.target.value)}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Ex: 1000mg"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Fréquence</label>
                                            <input
                                                type="text"
                                                value={prescription.frequency}
                                                onChange={(e) => updatePrescription(prescription.id, "frequency", e.target.value)}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Ex: 3 fois par jour"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Durée</label>
                                            <input
                                                type="text"
                                                value={prescription.duration}
                                                onChange={(e) => updatePrescription(prescription.id, "duration", e.target.value)}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Ex: 5 jours"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
                                            <textarea
                                                value={prescription.instructions}
                                                onChange={(e) => updatePrescription(prescription.id, "instructions", e.target.value)}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Instructions spéciales"
                                                rows={2}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addPrescription}
                                className="flex items-center text-blue-600 hover:text-blue-700"
                            >
                                <PlusCircle className="h-5 w-5 mr-2" />
                                Ajouter un médicament
                            </button>
                        </div>
                    )}

                    {/* Examens */}
                    {activeTab === "exams" && (
                        <div className="space-y-6">
                            {exams.map((exam, index) => (
                                <div key={exam.id} className="bg-gray-50 p-4 rounded-lg relative">
                                    <button
                                        type="button"
                                        onClick={() => removeExam(exam.id)}
                                        className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                                    >
                                        <MinusCircle className="h-5 w-5" />
                                    </button>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Type d'examen</label>
                                            <select
                                                value={exam.exam}
                                                onChange={(e) => {
                                                    const isCustom = e.target.value === "custom"
                                                    setExams(exams.map((e) => (e.id === exam.id ? { ...e, exam: e.target.value, isCustom } : e)))
                                                }}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="">Sélectionner un examen</option>
                                                {availableExams.map((e) => (
                                                    <option key={e.id} value={e.name}>
                                                        {e.name} - {e.price} FCFA
                                                    </option>
                                                ))}
                                                <option value="custom">Autre (préciser)</option>
                                            </select>
                                        </div>
                                        {exam.isCustom && (
                                            <div className="md:col-span-2">
                                                <input
                                                    type="text"
                                                    placeholder="Précisez l'examen"
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                />
                                            </div>
                                        )}
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
                                            <textarea
                                                value={exam.instructions}
                                                onChange={(e) =>
                                                    setExams(
                                                        exams.map((ex) => (ex.id === exam.id ? { ...ex, instructions: e.target.value } : ex)),
                                                    )
                                                }
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Instructions spéciales pour l'examen"
                                                rows={2}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button type="button" onClick={addExam} className="flex items-center text-blue-600 hover:text-blue-700">
                                <PlusCircle className="h-5 w-5 mr-2" />
                                Ajouter un examen
                            </button>
                        </div>
                    )}

                    {/* Transfert */}
                    {activeTab === "referral" && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Spécialiste</label>
                                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                    <option value="">Sélectionner un spécialiste</option>
                                    {availableSpecialists.map((specialist) => (
                                        <option key={specialist.id} value={specialist.id}>
                                            {specialist.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Motif du transfert</label>
                                <textarea
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    rows={4}
                                    placeholder="Raison du transfert vers le spécialiste"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Hospitalisation requise ?</label>
                                <div className="flex items-center space-x-4">
                                    <label className="flex items-center">
                                        <input type="radio" name="hospitalization" value="no" className="mr-2" />
                                        Non
                                    </label>
                                    <label className="flex items-center">
                                        <input type="radio" name="hospitalization" value="yes" className="mr-2" />
                                        Oui
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Suivi */}
                    {activeTab === "followup" && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Date du prochain rendez-vous</label>
                                <input
                                    type="date"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Heure du rendez-vous</label>
                                <input
                                    type="time"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Instructions pour le suivi</label>
                                <textarea
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    rows={4}
                                    placeholder="Instructions spéciales pour le prochain rendez-vous"
                                />
                            </div>
                        </div>
                    )}

                    {/* Boutons d'action */}
                    <div className="mt-6 flex justify-end space-x-4">
                        <button
                            type="button"
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                        >
                            Annuler
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Terminer la consultation
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

