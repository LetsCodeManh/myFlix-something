import React from "react";
import { Container, Nav } from "react-bootstrap";

export function Navbar({ user }) {
  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }

    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">myFlix</Navbar.Brand>
        <Navbar.Toggle id="responsive-navbar-nav" />
        <Nav className="me-auto">
          <Navbar.Link href="#something">Features</Navbar.Link>
          <Navbar.Link href="#something">Features</Navbar.Link>
          <Navbar.Link href="#something">Features</Navbar.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
