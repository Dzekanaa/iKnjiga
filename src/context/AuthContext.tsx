// AuthProvider.js
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { AuthContextType, AuthResponseType } from "../data";
import { handleAuth } from "../services";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState(false);
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    const fetchAuth = async () => {
      const res: AuthResponseType = await handleAuth();
      if (res.Status === "Success") {
        setAuth(true);
        setId(res.id);
      } else {
        setAuth(false);
        setId(null);
      }
    };
    fetchAuth();
  }, []);

  const setAuthState = (auth: boolean, id: number | null) => {
    setAuth(auth);
    setId(id);
  };

  return (
    <AuthContext.Provider value={{ auth, id, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
