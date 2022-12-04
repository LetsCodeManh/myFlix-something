// React import
import React from "react";

// Links
import axios from "axios";

// Other React Component
import { Navbar } from "./Navbar";

// Other Views
import { MovieView } from "../SubView/movie-view";
import { DirectorView } from "../SubView/director-view";
import { GenreView } from "../SubView/genre-view";

// User Views
import { LoginView } from "../User/login-view";
import { RegisterView } from "../User/registration-view";
import { UserView } from "../User/user-view";

// Bootstrap Component
import { Col, Container, Row } from "react-bootstrap";

// Router
import { Route, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      FavouriteMovies: [],
      user: null,
    };
  }

  // After Mount, Fetch movies from API
  componentDidMount() {
    let accessToken = localStorage.getItem("token");

    if (accessToken !== null) {
      this.getUser(accessToken);
      this.getMovies(accessToken);
    }
  }

  // Fetch User Data
  getUser(token) {
    const user = localStorage.getItem("user");
    axios
      .get(`https://sleepy-brook-50846.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setUser(response.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  // Fetch Movies Data
  getMovies(token) {
    axios
      .get("https://sleepy-brook-50846.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setMovies(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // When a user successfully logs in, this function on updates the "user" property in state to that particular user
  onLoggedIn(authData) {
    this.props.setUser(authData.user);
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
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return <MovieView movies={movies} />;
              }}
            />

            {/* Registered */}
            <Route
              path="/register"
              render={() => {
                if (user) return <BrowserRouter to="/" />;
                return (
                  <Col>
                    <RegisterView />
                  </Col>
                );
              }}
            />

            {/* ProfilView */}
            <Route
              path={`/user/${user}`}
              render={({ match, history }) => {
                if (!user) return <BrowserRouter to="/" />;
                return (
                  <Col>
                    <UserView
                      user={user}
                      movies={movies}
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
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
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
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
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
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
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
