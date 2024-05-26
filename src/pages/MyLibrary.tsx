import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export const MyLibrary = () => {
  const { auth, id } = useAuth();

  if (!auth) {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <div>
      <h1>Home</h1>
      {auth ? (
        <p>Welcome, your ID is: {id}</p>
      ) : (
        <p>You are not authenticated</p>
      )}
    </div>
  );
};
