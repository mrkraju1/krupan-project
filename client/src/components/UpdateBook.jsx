import React, { useState, useRef, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBook = () => {
  const navigate = useNavigate();
  const inputRef = useRef();
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [bookError, setBookError] = useState(false);
  const [genreError, setGenreError] = useState(false);
  const { id } = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length == 0) {
      setBookError(true);
    } else if (genre.length == 0) {
      setGenreError(true);
    } else {
      axios
        .put(`http://localhost:5000/practice/update/${id}`, { name, genre })
        .then((res) => alert("Book Details Updated"));
      navigate("/");
    }
  };
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div>
      <Container className="containerAddBook">
        <Form onSubmit={handleSubmit} autoComplete="off">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Book Name</Form.Label>
            <Form.Control
              ref={inputRef}
              type="text"
              placeholder="Enter Book Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          {bookError ? (
            <label className="validationlabel">Please Fill Book Name</label>
          ) : null}

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Book Genre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Book Genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </Form.Group>
          {genreError ? (
            <label className="validationlabel">Please Fill Book Genre</label>
          ) : null}
          <p></p>
          <Button variant="warning" type="submit">
            Update Book
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default UpdateBook;
