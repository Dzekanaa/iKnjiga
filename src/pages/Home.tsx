import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { handleAuth } from "../services";
import { AuthResponseType } from "../data";
import { useAuth } from "../context/AuthContext";

export const Home = () => {
  const res = useLoaderData() as AuthResponseType;
  const { auth, id, setAuthState } = useAuth();

  useEffect(() => {
    if (res.Status === "Success") {
      setAuthState(true, res.id);
    } else {
      setAuthState(false, res.id);
    }
  }, [res]);

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

export const homeLoader = async (): Promise<AuthResponseType> => {
  const res = await handleAuth();
  return res;
};
