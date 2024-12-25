import * as propType from "prop-types";
import {useAuthentication} from "../../Utils/Provider.jsx";
import {Navigate} from "react-router-dom";
import {AccessDenied} from "../../GlobalComponents/AccessDenied.jsx";

export function AdminDashboard({children})
{
    AdminDashboard.propTypes={
        children: propType.node.isRequired,
    }


    const {isAuthenticated, hasRole} = useAuthentication();


    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }

    if (!hasRole('Admin')) {
        return <AccessDenied Role={"Admin"}/>;
    }



    return (
        <div>
            DashBoard
            <div>
                {children}
            </div>
        </div>
    )
}

