import PropTypes from "prop-types";

export default function AppointmentPrescriptionCard({applyInputStyle}) {

    AppointmentPrescriptionCard.propTypes = {
        applyInputStyle: PropTypes.func.isRequired
    }

    return (
        <div className="space-y-6 bg-gray-100 rounded-lg p-6">
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
        </div>
    )
}