import PropTypes from "prop-types";

export default function DiagnosticCard({applyInputStyle, setDiagnostic, setDoctorNotes, diagnostic, doctorNotes}) {

    DiagnosticCard.propTypes = {
        applyInputStyle: PropTypes.func.isRequired,
        setDiagnostic: PropTypes.func.isRequired,
        setDoctorNotes: PropTypes.func.isRequired,
        diagnostic: PropTypes.string.isRequired,
        doctorNotes: PropTypes.string.isRequired
    }


    return (
        <div className="space-y-6 bg-gray-100 rounded-lg p-6">
            <div>
                <label
                    className="block text-sm font-medium text-gray-700 mb-2">Diagnostic</label>
                <textarea
                    required
                    rows={3}
                    value={diagnostic}
                    onChange={(e) => setDiagnostic(e.target.value)}
                    className={applyInputStyle()}
                    placeholder="Enter your diagnosis here"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Doctor
                    Notes</label>
                <textarea
                    value={doctorNotes}
                    required
                    onChange={(e) => setDoctorNotes(e.target.value)}
                    rows={3}
                    className={applyInputStyle()}
                    placeholder="Please add your observations, notes and recommendations here"
                />
            </div>
        </div>
    )
}