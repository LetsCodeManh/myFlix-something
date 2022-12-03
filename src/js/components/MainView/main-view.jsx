import React from "react";
import axios from "axios";

import { Navbar } from "./Navbar";

import { MovieView } from "../SubView/movie-view";
import { DirectorView } from "../SubView/director-view";
import { GenreView } from "../SubView/genre-view";

import { LoginView } from "../User/login-view";
import { RegisterView } from "../User/registration-view";
import { UserView } from "../User/user-view";

import { Col, Container, Row } from "react-bootstrap";

import { Route, Redirect as Router } from "react-router-dom";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      FavouriteMovies: [],
      user: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");

    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  // When a user successfully logs in, this function on updates the "user" property in state to that particular user
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  }

  getMovies(token) {
    axios
      .get("https://sleepy-brook-50846.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          movies: response.data,
        }).catch(function (err) {
          console.log(err);
        });
      });
  }

  onRegistration(registered) {
    this.setState({
      registered,
    });
  }

  render() {
    const { movies, user } = this.state;

    return (
      <Router>
        <Navbar user={user} />
        <Container>
          <Row>
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <Col>
                      <LoginView
                        movies={movies}
                        onLoggedIn={(user) => this.onLoggedIn(user)}
                      />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return <MovieList movies={movies} />;
              }}
            />
            {/* Registered */}
            <Route
              path="/register"
              render={() => {
                if (user) return <Redirect to="/" />;
                return (
                  <Col>
                    <RegisterView />
                  </Col>
                );
              }}
            />

            {/* ProfilView */}
            <Route
              exact
              path={`/user/${user}`}
              render={({ match, history }) => {
                if (!user) return <Redirect to="/" />;
                return (
                  <Col>
                    <UserView
                      movies={movies}
                      user={user}
                      onBackClick={() => history.geBack()}
                    />
                  </Col>
                );
              }}
            />

            {/* MovieView */}
            <Route
              exact
              path={`/movies/:id`}
              render={({ match, history }) => {
                if (!user) return <Redirect to="/" />;
                return (
                  <Col>
                    <MovieView
                      movies={movies.find(
                        (movie) => movie._id === match.params.id
                      )}
                      onBackClick={() => history.geBack()}
                    />
                  </Col>
                );
              }}
            />

            {/* GenreView */}
            <Route
              exact
              path={`/genres/:name`}
              render={({ match, history }) => {
                if (!user) return <Redirect to="/" />;
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col>
                    <GenreView
                      genreMovies={movies.filter(
                        (movie) => movie.Genre.Name === match.params.name
                      )}
                      onBackClick={() => history.geBack()}
                    />
                  </Col>
                );
              }}
            />

            {/* DirectorView */}
            <Route
              exact
              path={`/directors/:name`}
              render={({ match, history }) => {
                if (!user) return <Redirect to="/" />;
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col>
                    <DirectorView
                      directorView={movies.filter(
                        (movie) => movie.Director.Name === match.params.name
                      )}
                      onBackClick={() => history.geBack()}
                    />
                  </Col>
                );
              }}
            />
          </Row>
        </Container>
      </Router>
    );
  }
}
