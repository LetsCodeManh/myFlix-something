import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

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
    <Navbar expand="lg" bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand href="/">myFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            {isAuth() && <Nav.Link href={"/users/${user}"}>{user}</Nav.Link>}
            {isAuth() && (
              <Nav.Link onClick={() => onLoggedOut()}>Logout</Nav.Link>
            )}
            {!isAuth() && <Nav.Link href={"/"}>Sign-In</Nav.Link>}
            {!isAuth() && <Nav.Link href={"/register"}>Sign-Up</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
