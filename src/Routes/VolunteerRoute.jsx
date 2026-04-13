import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import Loading from "../Component/Loading/Loading";

const VolunteerRoute = ({ children }) => {
    const { user, loading: authLoading, logOut } = useAuth();
    const [role, roleLoading] = useRole(); 
    const location = useLocation();

    if (authLoading || roleLoading) {
        return <Loading />;
    }

    if (user && role === "volunteer") {
        return children;
    }

    const handleUnauthorized = () => {
        logOut()
            .then(() => console.warn("Volunteer access only. User logged out."))
            .catch(err => console.error("Logout error:", err));
            
        return <Navigate to="/login" state={{ from: location }} replace />;
    };

    return handleUnauthorized();
};

export default VolunteerRoute;