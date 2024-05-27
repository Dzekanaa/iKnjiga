import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getBooks, handleAuth } from "../services";
import { AuthResponseType, BookData } from "../data";
import { useAuth } from "../context/AuthContext";
import { BookShelf, Hero } from "../components";

export const Home = () => {
  const res = useLoaderData() as AuthResponseType;
  const { auth, id, setAuthState } = useAuth();
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    if (res.Status === "Success") {
      setAuthState(true, res.id);
    } else {
      setAuthState(false, res.id);
    }
  }, [res]);

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
          <Hero onSearch={handleSearch} />
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

export const homeLoader = async (): Promise<AuthResponseType> => {
  const res = await handleAuth();
  return res;
};
