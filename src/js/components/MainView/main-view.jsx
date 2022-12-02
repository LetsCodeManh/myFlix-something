import React from "react";
import axios from "axios";

import { Navbar } from "./Navbar";

import { MovieCard } from "../movie-card";
import { MovieView } from "../movie-view";

import { LoginView } from "../login-view";
import { RegisterView } from "../registration-view";
import { Col, Row } from "react-bootstrap";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [
        {
          _id: 1,
          Title: "The Shawshank Redemption",
          Description:
            "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
          Genre: "Drama",
          Director: "Frank Darabont",
          ImagePath:
            "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg",
        },
      ],
      selectedMovie: null,
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

  // When a movie is clicked, this funciton is invoked and updates the state of the "selectedMovie" property to that movie
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie,
    });
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

  render() {
    const { movies, user } = this.state;

    // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView
    if (!user)
      return (
        <>
          <Navbar user={user} />
          <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
        </>
      );

    // // Before the movies have been loaded
    // if (movies.length === 0) {
    //   return <div className="main-view">The list is empty!</div>;
    // }

    return (
      <Router>
        <Navbar user={user} />
        <Row className="main-view justify-content-center">
          <Router
            exact
            path="/"
            render={() => {
              return movies.map((movie) => {
                <Col md={3} key={m._id}>
                  <MovieCard movie={movie} />
                </Col>;
              });
            }}
          />
          {/* Movie View */}
          <Router
            path="/movies/:movieId"
            render={({ match }) => {
              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find((match) => {
                      match._id === match.params.movieId;
                    })}
                  />
                </Col>
              );
            }}
          />

          {/* Genre View */}
          <Router
            path="/genres/:genreId"
            render={({ match }) => {
              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find((match) => {
                      match._id === match.params.genreId;
                    })}
                  />
                </Col>
              );
            }}
          />

          {/* Director View */}
          <Router
            path="/directors/:directorId"
            render={({ match }) => {
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <DirectorView
                    director={
                      movies.find((m) => m.Director.Name === match.params.name)
                        .Director
                    }
                  />
                </Col>
              );
            }}
          />
        </Row>
      </Router>
    );
  }
}
