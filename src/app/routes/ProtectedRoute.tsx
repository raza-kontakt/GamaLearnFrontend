import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/ui/Loading";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) return <Loading message="Checking authentication..." />;

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
