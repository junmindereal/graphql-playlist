import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

function BookList() {
  const { loading, error, data, refetch } = useQuery(getBooksQuery);
  const [selected, setSelected] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <React.Fragment>
      <ul className="book-list">
        {data.books.map((book) => (
          <li
            className="list-item"
            key={book.id}
            onClick={() => {
              setSelected(book.id);
              refetch();
            }}
          >
            {book.name}
          </li>
        ))}
      </ul>
      <BookDetails bookId={selected} />
    </React.Fragment>
  );
}

export default BookList;
