import React, { useState, useEffect } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencilFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/practice").then((res) => {
      setData(res.data);
    });
  }, []);
  const deleteBook = (_id) => {
    axios
      .delete(`http://localhost:5000/practice/${_id}`)
      .then((res) => alert("Book Deleted"));
    // window.location.reload();
  };

  return (
    <div>
      <Container className="containerBookList">
        <Form>
          <Container>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Search for Book"
                autoComplete="off"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {/* <Button
                variant="outline-secondary"
                style={{ margin: "5px" }}
                type="submit"
                onClick={() => handleReset()}
              >
                Reset
              </Button> */}
            </Form.Group>
          </Container>
        </Form>
        {(data.data || []).length > 0 ? (
          <Table striped bordered variant="dark">
            <thead>
              <tr>
                <th>S No.</th>
                <th>Book Name</th>
                <th>Genre</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.data
                .filter((book) =>
                  book.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.genre}</td>
                      <td>
                        <Link to={`/update/${item._id}`}>
                          <Button style={{ margin: "5px" }} variant="warning">
                            <BsPencilFill />
                          </Button>
                        </Link>
                        <Button
                          style={{ margin: "5px" }}
                          variant="danger"
                          onClick={() => deleteBook(item._id)}
                        >
                          <AiOutlineDelete />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        ) : (
          <div>No Book Found</div>
        )}
        <div></div>
      </Container>
    </div>
  );
};

export default HomePage;
