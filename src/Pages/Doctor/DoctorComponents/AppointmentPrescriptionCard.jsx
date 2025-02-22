import PropTypes from "prop-types";

export default function AppointmentPrescriptionCard({applyInputStyle, onSubmit, endConsultation}) {

    AppointmentPrescriptionCard.propTypes = {
        applyInputStyle: PropTypes.func.isRequired,
        onSubmit:PropTypes.func.isRequired,
        endConsultation: PropTypes.func.isRequired
    }

    return (
        <form className="space-y-6 bg-gray-100 rounded-lg p-6" onSubmit={onSubmit}>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of next
                    appointment</label>
                <input
                    type="date"
                    className={applyInputStyle()}/>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Appointment
                    time</label>
                <input
                    type="time"
                    className={applyInputStyle()}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instructions for
                    tracking</label>
                <textarea
                    className={applyInputStyle()}
                    rows={2}
                    placeholder="Instructions spéciales pour le prochain rendez-vous"
                />
            </div>

            <div className="flex justify-end gap-4">
                <button
                        type="submit"
                        className="bg-primary-end font-semibold hover:bg-primary-start text-white py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed">
                    Submit
                </button>

                <button type={"button"}
                        onClick={endConsultation}
                        className="px-4 py-2 bg-primary-end hover:bg-primary-start transition-all duration-300 text-white font-bold rounded-lg"
                >
                    End consultation
                </button>
            </div>
        </form>
    )
}