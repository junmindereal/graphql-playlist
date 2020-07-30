import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/queries";

function AddBook() {
  const { loading, error, data } = useQuery(getAuthorsQuery);
  const { refetch } = useQuery(getBooksQuery);
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [addBook] = useMutation(addBookMutation);

  const handleSubmit = (e) => {
    e.preventDefault();
    const book = {
      name,
      genre,
      authorId,
    };
    addBook({ variables: book });
    setName("");
    setGenre("");
    setAuthorId("");
    refetch();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <form className="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <input
          className="form-input"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="field">
        <input
          className="form-input"
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>
      <div className="field">
        <select
          className="form-select"
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
        >
          <option value="">Select author</option>
          {data.authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
      </div>
      <button className="btn-primary">Add Book</button>
    </form>
  );
}

export default AddBook;
