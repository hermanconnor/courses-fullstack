import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/providers/auth-provider";

const ProtectedRoute = () => {
  const { authUser } = useAuth();

  return authUser ? <Outlet /> : <Navigate to="sign-in" replace />;
};

export default ProtectedRoute;
