import {useNavigate} from "react-router-dom";


export function LandingPage()
{

    const navigate = useNavigate();
    return (
        <div
            className="flex flex-col justify-center min-h-screen bg-gradient-to-r from-primary-start to-primary-end items-center">

            <div className="flex flex-col">
                <p className="text-8xl font-bold">LandingPage</p>

                <p className="ml-20 text-3xl font-bold mt-5">
                    Bienvenue sur l application
                </p>

            </div>

            <button onClick={() => navigate("/login")}
                    className="w-52 h-16  border-secondary rounded-lg border-2 bg-secondary text-white mt-5 font-bold text-2xl">
                Login to fulltang
            </button>

        </div>
    )
}