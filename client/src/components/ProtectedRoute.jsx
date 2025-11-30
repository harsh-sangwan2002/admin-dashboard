import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
    const { user, role } = useSelector((state) => state.auth);
    const location = useLocation();

    // Not logged in
    if (!user) return <Navigate to="/login" />;

    // Redirect admin only when hitting root "/"
    if (role === "admin" && location.pathname === "/") {
        return <Navigate to="/admin" replace />;
    }

    // Block unauthorized roles
    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
}
