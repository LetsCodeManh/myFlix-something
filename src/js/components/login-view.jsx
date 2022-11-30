import React, { useState } from "react";
import axios from "axios";
import { Card, Form, Container, Button, Row, Col } from "react-bootstrap";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Username Required");
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr("Username must be at least 2 characters");
      isReq = false;
    }

    if (!password) {
      setPasswordErr("Password Required");
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr("Password must be at least 6 characters");
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();

    console.log(username, password);
    // Send a request to the server for authentication

    if (isReq) {
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
    }
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
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {usernameErr}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {passwordErr}
                  </Form.Control.Feedback>
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
