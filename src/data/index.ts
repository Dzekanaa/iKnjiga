export type AuthResponseType = {
    Status?: string;
    id: number;
    Error?: string;
  };
  
export type  AuthContextType = {
  auth: boolean;
  id: number | null;
  setAuthState: (auth: boolean, id: number | null) => void;
}