import React, { useEffect, useState } from "react";
import { DashboardProps } from "../data";
import { useAuth } from "../context/AuthContext";
import { getMyBooks } from "../services";

export const Dashboard: React.FC<DashboardProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMyBooks();
    };

    fetchData();
  });

  const handleAddClick = () => {};

  const handleDeleteClick = () => {};

  const handleUpdateClick = () => {};

  const handleCheckClick = () => {};
  return (
    <div className="max-w-xl space-y-6">
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
      <div className="flex space-x-2">
        <button
          onClick={handleAddClick}
          className="btn btn-primary size-32 btn-square"
        >
          <svg
            className="size-12 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h14m-7 7V5"
            />
          </svg>
        </button>
        <button
          onClick={handleDeleteClick}
          className="btn btn-primary size-32 btn-square"
        >
          <svg
            className="btn btn-primary size-12 btn-square"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          onClick={handleUpdateClick}
          className="btn btn-primary size-32 btn-square"
        >
          <svg
            className="size-12"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
            />
          </svg>
        </button>
        <button
          onClick={handleCheckClick}
          className="btn btn-primary size-32 btn-square"
        >
          <svg
            className="size-12"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 11.917 9.724 16.5 19 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
