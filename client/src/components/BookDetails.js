import React from "react";
import { useQuery } from "@apollo/client";
import { getBookQuery } from "../queries/queries";

function BookDetails({ bookId }) {
  const options = {
    variables: {
      id: bookId,
    },
  };

  const { loading, error, data } = useQuery(getBookQuery, options);

  if (loading) return <p className="book-details">Loading...</p>;
  if (error) return <p className="book-details">Error :(</p>;

  const { book } = data;
  return (
    <div className="book-details">
      {book ? (
        <React.Fragment>
          <h2 class="h2">{book.name}</h2>
          <p class="book-details-desc genre">
            <span className="book-details-label">genre:</span>
            <span className="book-details-value">{book.genre}</span>
          </p>
          <p class="book-details-desc author">
            <span className="book-details-label">author:</span>
            <span className="book-details-value">{book.author.name}</span>
          </p>
          <div className="author-books">
            <p className="author-books-heading">Other books buy this author:</p>
            <ul className="author-books-list">
              {book.author.books.map((b) => (
                <li className="author-book-item" key={b.id}>
                  {b.name}
                </li>
              ))}
            </ul>
          </div>
        </React.Fragment>
      ) : null}
    </div>
  );
}

export default BookDetails;
