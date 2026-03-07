import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import Loading from "../Component/Loading/Loading";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth(); 
    const location = useLocation();

    if (loading) {
        return (
            <Loading></Loading>
        );
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;