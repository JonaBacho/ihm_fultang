import {FaInfo} from "react-icons/fa";
import {Tooltip} from "antd";
import {MinusCircle, PlusCircle} from "lucide-react";
import PropTypes from "prop-types";

export default function MedicationPrescriptionCard({prescriptions, availableMedications, updatePrescription, removePrescription, addPrescription, applyInputStyle}) {


    MedicationPrescriptionCard.propTypes = {
        prescriptions: PropTypes.array.isRequired,
        availableMedications: PropTypes.array.isRequired,
        updatePrescription: PropTypes.func.isRequired,
        removePrescription: PropTypes.func.isRequired,
        addPrescription: PropTypes.func.isRequired,
        applyInputStyle: PropTypes.func.isRequired
    };





    return (
        <div className="space-y-6 ">
            <div className="flex ml-7 gap-2">
                <div className="w-7 h-7 flex justify-center items-center rounded-full border border-orange-500">
                    <FaInfo className="w-5 h-5 text-orange-500"/>
                </div>
                <p className="mt-1.5 text-[15px] italic font-semibold text-orange-500">This
                    section is intended for prescribing medications. Please indicate the
                    recommended treatments, as well as the dosage and duration of treatment.</p>
            </div>
            {prescriptions.map((prescription, index) => (
                <div key={prescription.id || index} className="bg-gray-100 p-4 rounded-lg relative">
                    <Tooltip placement={"top"} title={"Remove Medication"}>
                        <button
                            type="button"
                            onClick={() => removePrescription(prescription.id)}
                            className="absolute top-4 right-4 text-red-500 hover:text-red-600"
                        >
                            <MinusCircle className="h-6 w-6"/>
                        </button>
                    </Tooltip>
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label
                                className="block text-sm font-medium text-gray-700 mb-2">Medicine</label>
                            <select
                                value={prescription.medicament}
                                onChange={(e) => updatePrescription(prescription.id, "medicament", e.target.value)}
                                className={applyInputStyle()}
                            >
                                <option value="">Select a medication</option>
                                {availableMedications.map((med) => (
                                    <option key={med.id} value={med.id}>
                                        {med.name}
                                    </option>
                                ))}
                                <option value={"Other"}>Other Medication</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-2">Dosage</label>
                                <input
                                    type="text"
                                    value={prescription.dosage}
                                    onChange={(e) => updatePrescription(prescription.id, "dosage", e.target.value)}
                                    className={applyInputStyle()}
                                    placeholder="Eg: 1000mg"
                                />
                            </div>

                            <div>
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                                <input
                                    type="text"
                                    value={prescription.quantity}
                                    onChange={(e) => updatePrescription(prescription.id, "quantity", e.target.value)}
                                    className={applyInputStyle()}
                                    placeholder="Eg: 1000mg"
                                />
                            </div>


                        </div>
                        <div>
                            <label
                                className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                            <input
                                type="text"
                                value={prescription.frequency}
                                onChange={(e) => updatePrescription(prescription.id, "frequency", e.target.value)}
                                className={applyInputStyle()}
                                placeholder="Eg: 3 times per day"
                            />
                        </div>
                        <div>
                            <label
                                className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                            <input
                                type="text"
                                value={prescription.duration}
                                onChange={(e) => updatePrescription(prescription.id, "duration", e.target.value)}
                                className={applyInputStyle()}
                                placeholder="Eg: 5 days"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label
                                className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
                            <textarea
                                value={prescription.instructions}
                                onChange={(e) => updatePrescription(prescription.id, "instructions", e.target.value)}
                                className={applyInputStyle()}
                                placeholder="Special Instructions"
                                rows={2}
                            />
                        </div>
                    </div>
                </div>
            ))}
            <button
                type="button"
                onClick={addPrescription}
                className="flex items-center font-semibold text-md  text-primary-end hover:text-xl transition-all duration-500"
            >
                <PlusCircle className="h-7 w-7 mr-2"/>
                Add a medication
            </button>
        </div>
    )
}