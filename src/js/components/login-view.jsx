import React, { useState } from "react";
import { Card, Form, Container, Button } from "react-bootstrap";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send a request to the server for authentication
    this.props.onLoggedIn(username);
    // this.props.onLoggedIn(password);
  };

  return (
    <Container className="p-5">
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
    </Container>
  );
}
