import {FaInfo} from "react-icons/fa";
import {Tooltip} from "antd";
import {MinusCircle, PlusCircle} from "lucide-react";
import PropTypes from "prop-types";

export default function ExamPrescriptionCard({exams, availableExams, setExams, removeExam, addExam, applyInputStyle})
{

    ExamPrescriptionCard.propTypes = {
        exams: PropTypes.array.isRequired,
        availableExams: PropTypes.array.isRequired,
        setExams: PropTypes.func.isRequired,
        removeExam: PropTypes.func.isRequired,
        addExam: PropTypes.func.isRequired,
        applyInputStyle: PropTypes.func.isRequired
    };






    return (
        <div className="space-y-6">
            <div className="flex ml-7 gap-2">
                <div
                    className="w-7 h-7 flex justify-center items-center rounded-full border border-orange-500">
                    <FaInfo className="w-5 h-5 text-orange-500"/>
                </div>
                <p className="mt-1.5 text-[15px] italic font-semibold text-orange-500">
                    {"This section is dedicated to prescribing the patient's medical examinations.Please indicate the analyses, imaging or other investigations necessary fora precise diagnosis."}
                </p>
            </div>
            {exams.map((exam, index) => (
                <div key={exam.id || index} className="bg-gray-100 p-4 rounded-lg relative">
                    <Tooltip placement={"top"} title={"Remove Exam"}>
                        <button
                            type="button"
                            onClick={() => removeExam(exam.id)}
                            className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-all duration-300"
                        >
                            <MinusCircle className="h-6 w-6"/>
                        </button>
                    </Tooltip>
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Exam Type</label>
                            <select
                                value={exam.exam}
                                onChange={(e) => {
                                    const isCustom = e.target.value === "another"
                                    setExams(exams.map((ex) => (ex.id === exam.id ? {
                                        ...ex,
                                        idExam: e.target.value,
                                        isCustom: isCustom,
                                    } : ex)))
                                }}
                                className={applyInputStyle()}
                            >
                                <option value="">Select an exam</option>
                                {availableExams.map((e) => (
                                    <option key={e.id} value={e.id}>
                                        {e.name} - {e.price} FCFA
                                    </option>
                                ))}
                                <option value={"another"}>Another Exam</option>
                            </select>
                        </div>
                        {exam.isCustom && (
                            <div className="col-span-2">
                                <input
                                    type="text"
                                    placeholder="Specify the exam"
                                    onChange={(e) => setExams(exams.map((ex) => (ex.id === exam.id ? {
                                        ...ex,
                                        examName: e.target.value,
                                        idExam:'',
                                    } : ex)))}
                                    className={applyInputStyle()}
                                />
                            </div>
                        )}
                        <div className="col-span-2">
                            <label
                                className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
                            <textarea
                                value={exam.instructions}
                                onChange={(e) =>
                                    setExams(
                                        exams.map((ex) => (ex.id === exam.id ? {
                                            ...ex,
                                            instructions: e.target.value
                                        } : ex)),
                                    )
                                }
                                className={applyInputStyle()}
                                placeholder="Special instructions for the exam"
                                rows={2}
                            />
                        </div>
                    </div>
                </div>
            ))}
            <button type="button" onClick={addExam}
                    className="flex font-semibold items-center text-primary-end text-md hover:text-xl transition-all duration-500">
                <PlusCircle className="h-7 w-7 mr-2"/>
                Add an exam
            </button>
        </div>
    )
}