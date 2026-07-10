import { Navigate } from "react-router-dom";

interface Props {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {

    const isAuthenticated =
        localStorage.getItem("user");

    return isAuthenticated
        ? children
        : <Navigate to="/" />;
}