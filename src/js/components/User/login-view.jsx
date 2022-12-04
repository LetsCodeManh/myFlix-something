// React import
import React from "react";
import { useState } from "react";

// Links
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Props Checking
import PropTypes from "prop-types";

// Bootstrap Component
import { Card, Form, Container, Button, Row, Col } from "react-bootstrap";

export function LoginView(props) {
  // Getting Data
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Throw Error if something is wrong
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

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

    return isReq;
  };

  // Submit Data
  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
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
              <Card.Title>Log In</Card.Title>
              <Form>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
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
                    required
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
                  Log In
                </Button>
                <Link to={`/register`}>
                  <Button variant="primary" type="button">
                    Register
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

LoginView.propTypes = {
  login: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  onLoggedIn: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (e) => {
    dispatch(mapDispatchToProps(e));
  },
});

export default connect(null, mapDispatchToProps)(LoginView);
