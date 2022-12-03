import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Form, Container, Button, Row, Col } from "react-bootstrap";

export function RegisterView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
  };

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
      window.open("/", "_self"); // the second argument '_self' is necessary so that the page will open in the current tab
    })
    .catch((e) => {
      console.log("error registering the user");
    });

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
                    placeholder="Enter Username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    minLength={8}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBirthday">
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control
                    type="date"
                    onChange={(e) => setBirthday(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleSubmit}>
                  Submit
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

RegisterView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
  }),
};
