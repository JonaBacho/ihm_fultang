import {useAuthentication} from "../../Utils/provider.jsx";

export function LandingPage()
{
    const {renderOne} = useAuthentication();
    return (
        <div>
            LandingPage
            {renderOne()}
        </div>
    )
}