import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router";
import PreLoader from "../component/PreLoader";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    // Show skeleton loader while authentication state is being determined
    if (loading) {
        return <PreLoader />;
    }

    // If user is authenticated, render the children components
    if (user) {
        return children;
    }

    // Redirect unauthenticated users to the login page
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
