import React, { useState } from "react";
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

  return (
    <Container className="p-5">
      <Row className="justify-content-center">
        <Col md="auto"></Col>
        <Col md="6">
          <Card>
            <Card.Body>
              <Card.Title>Register</Card.Title>
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
                    minLength={8}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="fromEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="fromBirthday">
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
