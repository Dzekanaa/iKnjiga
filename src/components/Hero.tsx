import React, { useState } from "react";

interface HeroProps {
  onSearch: (term: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="max-w-md">
      <h1 className="mb-2 text-5xl text-primary font-bold">iKnjiga</h1>
      <p className="mb-5 text-text text-lg">
        Dobrodošli na iKnjigu - Vaš digitalni kutak za knjige.
      </p>
      <label className="relative input input-primary input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow text-text"
          placeholder="Pretraži knjige"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          className="absolute top-3 right-3 w-5 h-5 text-gray-400 pointer-events-none"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
    </div>
  );
};
