import React, { useState } from "react";
import axios from "axios";
import { Card, Form, Container, Button, Row, Col } from "react-bootstrap";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send a request to the server for authentication
    axios
      .post("https://sleepy-brook-50846.herokuapp.com/login", {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        console.log("This User Do Not Exist");
      });
  };

  return (
    <Container className="p-5">
      <Row className="justify-content-center">
        <Col md="auto"></Col>
        <Col md="6">
          <Card>
            <Card.Body>
              <Card.Title>Log In</Card.Title>
              <Form>
                <Form.Group className="mb-3" controlId="fromUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="fromPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  className="mr-3"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
                <Button variant="primary" type="submit">
                  Register
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md="auto"></Col>
      </Row>
    </Container>
  );
}
