import {useAuthentication} from "../../Utils/Provider.jsx";

export function LandingPage()
{
    const {renderOne} = useAuthentication();
    return (

        <div className="flex justify-center min-h-screen bg-gradient-to-r from-primary-start to-primary-end items-center">

            <div className="flex flex-col">
                <p className="text-8xl font-bold">LandingPage</p>

                <p className="ml-20 text-3xl font-bold mt-5">
                    Bienvenue sur l application
                </p>
                {renderOne()}
            </div>

        </div>
    )
}