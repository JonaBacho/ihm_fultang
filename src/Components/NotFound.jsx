import { useNavigate} from 'react-router-dom';

export function NotFound () {

    const navigate = useNavigate()
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-400 to-blue-800 p-4 opacity-70">
            <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="p-6 sm:p-8">
                    <div className="text-center">
                        {/* Illustration */}
                        <div className="mb-6">
                            <svg className="mx-auto h-24 w-24 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>

                        {/* Message d'erreur */}
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                        <p className="text-lg text-gray-600 mb-6">Oops! La page que vous recherchez n'existe pas.</p>

                        {/* Bouton de retour */}
                        <button  className="inline-block bg-teal-500 hover:bg-secondary text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                                onClick={() => {navigate(-1)}}>
                            <p>Retour</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


