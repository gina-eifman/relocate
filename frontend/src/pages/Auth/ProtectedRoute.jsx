import { Navigate } from "react-router-dom";

function ProtectedRoute({isLoggedIn, element: Component, ...props}) {
    return(
        isLoggedIn || localStorage.jwt ? <Component {...props} /> : <Navigate to="/" replace />
    )
};

export default ProtectedRoute;