import React, { FC, useState, useEffect } from "react";
import { Book } from "./Book";
import { BookData } from "../data";
import { getBooks } from "../services";

type BookShelfProps = {
  searchTerm: string;
};

export const BookShelf: FC<BookShelfProps> = ({ searchTerm }): JSX.Element => {
  const [books, setBooks] = useState<BookData[]>([]);
  const [originalBooks, setOriginalBooks] = useState<BookData[]>([]);
  const [booksLoaded, setBooksLoaded] = useState<boolean>(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await getBooks();
        if (res.Status === "Success") {
          setBooks(res.books || []);
          setOriginalBooks(res.books || []);
          setBooksLoaded(true);
        } else {
          console.error("Books not found");
        }
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };

    if (!booksLoaded) {
      fetchBooks();
    }
  }, [booksLoaded]);

  return (
    <>
      <div
        className={`w-full h-full p-2 border-4 gap-2 grid grid-cols-12 bg-base-200 relative border-b-4 border-base-300`}
      >
        {originalBooks.map((book, index) => (
          <div
            key={book.KnjigaID}
            className="grid-column-span-12"
            // Ne postavljamo randomColumns ovde kako bismo osigurali da se knjige ne pomeraju
          >
            <Book
              Naslov={book.Naslov}
              KnjigaID={book.KnjigaID}
              AutorID={book.AutorID}
              Zanr={book.Zanr}
              GodinaIzdanja={book.GodinaIzdanja}
              ISBN={book.ISBN}
              className={
                searchTerm
                  ? book.Naslov.toLowerCase().includes(searchTerm.toLowerCase())
                    ? "bg-red-500"
                    : ""
                  : ""
              }
            />
          </div>
        ))}
      </div>
    </>
  );
};
