import {useAuthentication} from "../../Utils/Provider.jsx";
import {Navigate} from "react-router-dom";
import {AccessDenied} from "../../GlobalComponents/AccessDenied.jsx";

export function AdminHomePage()
{
    const {isAuthenticated, hasRole} = useAuthentication();


    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }

    if (!hasRole('Admin')) {
        return <AccessDenied Role={"Admin"}/>;
    }



    return (
        <div>Admin Home Page</div>
    )
}