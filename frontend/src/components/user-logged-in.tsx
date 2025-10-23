import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/providers/auth-provider";

const UserLoggedIn = () => {
  const { authUser } = useAuth();

  return authUser ? <Navigate to="/" replace /> : <Outlet />;
};

export default UserLoggedIn;
