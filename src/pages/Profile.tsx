import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export const Profile = () => {
  const { auth, id } = useAuth();

  if (!auth) {
    return <Navigate to={"/login"} replace />;
  }
  return <div>Profile</div>;
};
