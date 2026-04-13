import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import Loading from "../Component/Loading/Loading";

const AdminVolunteerRoute = ({ children }) => {
    const { user, loading: authLoading, logOut } = useAuth();
    const [role, roleLoading] = useRole(); 
    const location = useLocation();

    if (authLoading || roleLoading) {
        return <Loading />;
    }

    // admin or volunteer access check
    if (user && (role === "admin" || role === "volunteer")) {
        return children;
    }

    const handleUnauthorized = () => {
        logOut()
            .then(() => console.warn("Restricted access. Requires Donor or Volunteer role."))
            .catch(err => console.error("Logout error:", err));
            
        return <Navigate to="/login" state={{ from: location }} replace />;
    };

    return handleUnauthorized();
};

export default AdminVolunteerRoute;