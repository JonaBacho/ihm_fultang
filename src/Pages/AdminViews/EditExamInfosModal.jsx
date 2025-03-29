import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import axiosInstance from "../../Utils/axiosInstance.js";


export function EditExamInfosModal ({ isOpen, onClose, setCanOpenSuccessModal, setSuccessMessage, setIsLoading, examData }) {
    EditExamInfosModal.propTypes = {
        isOpen: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,
        setCanOpenSuccessModal: PropTypes.func.isRequired,
        setSuccessMessage: PropTypes.func.isRequired,
        setIsLoading: PropTypes.func.isRequired,
        examData: PropTypes.object.isRequired
    };


    const [formData, setFormData] = useState({
        name: '',
        cost: 0.0,
        description: '',
    });

    const [error, setError] = useState("");
    const [checkedFields, setCheckedFields] = useState({
        
        name: false,
        cost: false,
        description: false,
        
    });

    useEffect(() => {
        if (examData) {
            setFormData(examData);
        }
    }, [examData]);



    function handleChange(e) {
        const { name, value } = e.target;
        
            setFormData(prevData => ({ ...prevData, [name]: value }));
        
    }


    function handleCheckboxChange(e) {
        const { name, checked } = e.target;
        setCheckedFields(prev => ({ ...prev, [name]: checked }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
            const updatedData = Object.keys(checkedFields).reduce((acc, key) => {
                if (checkedFields[key]) {
                    acc[key] = formData[key];
                }
                return acc;
            }, {});

            try {
                const response = await axiosInstance.patch(`/exam/${examData.id}/`, updatedData);
                if (response.status === 200) {
                    setIsLoading(false);
                    setSuccessMessage(`${examData.name} 's information has been updated successfully!`);
                    setCanOpenSuccessModal(true);
                    onClose();
                }
            } catch (error) {
                setIsLoading(false);
                setSuccessMessage("");
                setCanOpenSuccessModal(false);
                setError("Something went wrong, please try again later!");
                console.log(error);
            }
        setIsLoading(false);
    }

    function applyFormStyle() {
        return "w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-2 focus:border-primary-end";
    }


    function applyCheckboxStyle() {
        return "form-checkbox h-3 w-3 mt-4 text-primary-end";
    }


    if (!isOpen) return null;

return (
    <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm transition-all duration-300">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
                    <div className="bg-gradient-to-r from-primary-end to-primary-start px-6 py-4 rounded-t-lg flex-col flex justify-center items-center">
                        <h3 className="text-4xl font-bold text-white">Edit Exam Information</h3>
                        <div className="flex mt-3">
                            <p className="text-white font-semibold ml-3 italic">(Please check the fields you want to modify)</p>
                        </div>
                    </div>
                    {error && <p className="text-red-500 font-bold text-md ml-4">{error}</p>}
                    <form onSubmit={handleSubmit} className="p-4 space-y-6">
                        <div className="flex space-x-3">
                            <div className="w-2/3 flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="Name"
                                    name="name"
                                    checked={checkedFields.name}
                                    onChange={handleCheckboxChange}
                                    className={applyCheckboxStyle()}
                                />
                                <div className="flex-1">
                                    <label htmlFor="Name"
                                           className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Enter exam's name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={applyFormStyle()}
                                        required={checkedFields.name}
                                        disabled={!checkedFields.name}
                                    />
                                </div>
                            </div>

                                <div className="w-2/3 flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="cost"
                                        name="cost"
                                        checked={checkedFields.cost}
                                        onChange={handleCheckboxChange}
                                        className={applyCheckboxStyle()}
                                    />
                                    <div className="flex-1">
                                        <label htmlFor="cost"
                                            className="block text-sm font-medium text-gray-700 mb-1">Cost</label>
                                        <input
                                            type="number"
                                            id="cost"
                                            name="cost"
                                            placeholder="Enter exam's cost"
                                            value={formData.cost}
                                            onChange={handleChange}
                                            className={applyFormStyle()}
                                            required={checkedFields.cost}
                                            disabled={!checkedFields.cost}
                                        />
                                    </div>
                                </div>
                        </div>
                                <div className="w-2/3 flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="description"
                                            name="description"
                                            checked={checkedFields.description}
                                            onChange={handleCheckboxChange}
                                            className={applyCheckboxStyle()}
                                        />
                                        <div className="flex-1">
                                            <label htmlFor="description"
                                                className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                            <input
                                                type="text"
                                                id="description"
                                                name="description"
                                                placeholder="Enter exam's description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                className={applyFormStyle()}
                                                required={checkedFields.description}
                                                disabled={!checkedFields.description}
                                            />
                                        </div>
                                    </div>
                            


                        <div className="px-6 py-1 flex justify-center space-x-6">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-primary-end hover:text-xl text-md text-white rounded-lg font-bold transition-all duration-300"
                            >
                                Update
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setError(""),
                                    onClose()
                                }}
                                className="px-4 py-2 border bg-red-400 text-md hover:text-xl hover:bg-red-500 text-white font-bold rounded-lg transition-all duration-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    </>
)
}