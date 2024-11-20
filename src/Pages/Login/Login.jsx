"use server";
import  { useState } from 'react';

export const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Gérer la soumission du formulaire
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Première couleur (moitié supérieure) */}
            <div className="absolute top-0 left-0 right-0 h-[55%] bg-teal-400 rounded-br-[100px] rounded-bl-[100px] z-10"></div>

            {/* Deuxième couleur (moitié inférieure) */}
            <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-blue-800 rounded-tl-[100px] rounded-tr-[100px] z-20"></div>

            {/* Contenu */}
            <div className="relative z-30 container mx-auto px-4 py-8 min-h-screen flex items-center">
                <div className="w-full max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        {/* Section gauche avec le titre et la description */}
                        <div className="md:w-1/2 p-8 bg-transparent">
                            <h1 className="text-4xl font-bold text-blue-800 mb-6">
                                WELCOME ON FULTANG
                            </h1>
                            <p className="text-gray-700 text-sm leading-relaxed mb-4">
                                Polyclinic fultang is a hospital management application, providing care and monitoring
                                of patients from arrival to discharge, this via the platform. We first register the patient at
                                the reception level, then follow the chain of follow-up according to his problem or his
                                situation. Polyclinic fultang has several departments namely the dental service, the
                                ophthalmological service, the general medicine, the laboratory, as well as a pharmacy.
                            </p>
                        </div>

                        {/* Section droite avec le formulaire de connexion */}
                        <div className="md:w-1/2 p-8 bg-white">
                            <div className="max-w-md mx-auto">
                                <h2 className="text-2xl font-semibold mb-2">Welcome,Back!</h2>
                                <h3 className="text-xl mb-6">Log in</h3>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label
                                            htmlFor="username"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            id="username"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                            required
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="remember"
                                                className="h-4 w-4 text-teal-500 border-gray-300 rounded focus:ring-teal-500"
                                            />
                                            <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                                                Remember me
                                            </label>
                                        </div>
                                        <a href="#" className="text-sm text-teal-600 hover:text-teal-500">
                                            Forgotten Password?
                                        </a>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition-colors duration-200"
                                    >
                                        Log in
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

