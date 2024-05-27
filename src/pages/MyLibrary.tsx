import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { BookShelf, Dashboard } from "../components";

export const MyLibrary = () => {
  const { auth, id, setAuthState } = useAuth();
  const [searchTerm, setSearchTerm] = useState<string>("");

  if (!auth) {
    return <Navigate to={"/login"} replace />;
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="grid grid-rows-3 h-full w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="lg:flex hidden  justify-center items-center">
          <BookShelf searchTerm={searchTerm} />
        </div>
        <div className="flex justify-center items-center">
          <BookShelf searchTerm={searchTerm} />
        </div>
        <div className="lg:flex hidden justify-center items-center">
          <BookShelf searchTerm={searchTerm} />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="lg:flex hidden  justify-center items-center">
          <BookShelf searchTerm={searchTerm} />
        </div>
        <div className="hero hero-content text-center z-0 border-8 border-base-300 bg-base-200 shadow-inner text-neutral-content">
          <Dashboard onSearch={handleSearch} />
        </div>
        <div className="lg:flex hidden justify-center items-center">
          <BookShelf searchTerm={searchTerm} />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="lg:flex hidden  justify-center items-center">
          <BookShelf searchTerm={searchTerm} />
        </div>
        <div className="flex  justify-center items-center">
          <BookShelf searchTerm={searchTerm} />
        </div>
        <div className="lg:flex hidden justify-center items-center">
          <BookShelf searchTerm={searchTerm} />
        </div>
      </div>
    </div>
  );
};
