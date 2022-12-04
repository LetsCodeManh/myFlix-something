// React import
import React from "react";
import { useState } from "react";

// Links
import axios from "axios";
import {Link} from "react-router-dom"

// Props Checking
import PropTypes from "prop-types";

// Bootstrap Component
import { Card, Form, Container, Button, Row, Col } from "react-bootstrap";

export function RegisterView(props) {
  // Getting Data
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  // Throw Error if something is wrong
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");

  // Validating Data
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

    if (!email) {
      setEmailErr("E-mail Required.");
      isReq = false;
    } else if (email.indexOf("@") === -1) {
      setEmailErr("Enter valid E-mail address.");
      isReq = false;
    }

    return isReq;
  };

  // Submit Data
  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();

    if (isReq) {
      axios
        .post("https://sleepy-brook-50846.herokuapp.com/users", {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          window.open("/", "_self");
          // the second argument '_self' is necessary so that the page will open in the current tab
        })
        .catch((e) => {
          console.log(e);
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
              <Card.Title>Register</Card.Title>
              <Form>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    placeholder="Enter Username"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    placeholder="Enter Password"
                    minLength={6}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your E-Mail Address"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBirthday">
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control
                    type="date"
                    value={birthday}
                    placeholder="Your Birth Day"
                    onChange={(e) => setBirthday(e.target.value)}
                  />
                </Form.Group>

                <Button className="mr-3" variant="primary" type="submit" onClick={handleSubmit}>
                  Submit
                </Button>
                <Link to={`/`}>
                  <Button variant="primary" type="button">
                    LogIn
                  </Button>
                </Link>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md="auto"></Col>
      </Row>
    </Container>
  );
}

RegisterView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.number,
  }).isRequired,
};
