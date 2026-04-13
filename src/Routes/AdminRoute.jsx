import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import Loading from "../Component/Loading/Loading";

const AdminRoute = ({ children }) => {
    
    const { user, loading: authLoading, logOut } = useAuth();
    const [role, roleLoading] = useRole(); 
    const location = useLocation();

    if (authLoading || roleLoading) {
        return <Loading />;
    }

    if (user && role === "admin") {
        return children;
    }
    const handleUnauthorized = () => {
        logOut() // nevigating to login page and logging out the user to clear any invalid sessiona
            .then(() => {
                console.warn("Unauthorized access attempt. User logged out.");
            })
            .catch(err => console.error("Logout error:", err));
            
        return <Navigate to="/login" state={{ from: location }} replace />;
    };

    return handleUnauthorized();
}; 

export default AdminRoute;