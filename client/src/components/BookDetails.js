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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data);
  return (
    <div className="book-details">
      <p>Output Book Details here</p>
    </div>
  );
}

export default BookDetails;
