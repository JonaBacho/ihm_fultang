import { useState } from 'react';
import { ArrowLeft, Send, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import loginBackground from "../../assets/logIn.png";

export function ForgottenPassword() {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    return (
        <div
            className="flex flex-col min-h-screen bg-cover bg-center"
            style={{
                backgroundImage: `url(${loginBackground})`,
                height: "100vh",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
        >
            <Link to="/" className="text-3xl text-white font-bold mt-6 ml-8">
                FullTang
            </Link>
            <div className="flex-1 flex items-center justify-center px-4">
                <div className="bg-white bg-opacity-95 shadow-2xl border-2 w-full max-w-5xl rounded-lg overflow-hidden flex">
                    <div className="w-1/2 p-8 bg-gradient-to-br from-primary-start to-primary-end text-white">
                        <h2 className="text-4xl font-bold mb-6">Forgot Your Password?</h2>
                        <p className="text-lg mb-6">
                            Don't worry, it happens to the best of us. We'll help you get back on track.
                        </p>
                        <div className="mb-8">
                            <Lock className="w-20 h-20 mx-auto mb-4" />
                            <p className="text-center">We'll send you a secure link to reset your password.</p>
                        </div>
                        <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                            <h3 className="font-bold mb-2">Remember:</h3>
                            <ul className="list-disc list-inside">
                                <li>Check your spam folder if you don't see our email</li>
                                <li>The reset link will expire after 24 hours</li>
                                <li>Make sure to choose a strong, unique password</li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-1/2 p-8">
                        <h3 className="text-2xl font-bold mb-6 text-gray-800">Reset Password</h3>
                        {!isSubmitted ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="text-md font-bold block mb-2 text-gray-700">
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary-start focus:border-transparent"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-primary-start to-primary-end hover:from-primary-end hover:to-primary-start text-white font-bold py-2 px-4 rounded-md transition-all duration-300 flex items-center justify-center"
                                >
                                    <Send className="mr-2 h-4 w-4" /> Send Reset Link
                                </button>
                            </form>
                        ) : (
                            <div className="text-center p-6 bg-green-100 rounded-lg">
                                <p className="text-xl mb-4 text-green-800 font-bold">Reset link sent!</p>
                                <p className="text-gray-600">
                                    Please check your email for instructions to reset your password.
                                </p>
                            </div>
                        )}
                        <div className="mt-6">
                            <Link
                                to="/login"
                                className="text-primary-start hover:text-primary-end transition-colors duration-300 flex items-center"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
