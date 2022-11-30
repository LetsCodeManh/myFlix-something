import React from "react";
import axios from "axios";
import { MovieCard } from "./movie-card";
import { MovieView } from "./movie-view";

import { LoginView } from "./login-view";
import { RegisterView } from "./registration-view";

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
    axios
      .get("https://sleepy-brook-50846.herokuapp.com/movies")
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
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
    const { movies, selectedMovie, user } = this.state;

    // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView
    if (!user)
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    // Before the movies have been loaded
    if (movies.length === 0) {
      return <div className="main-view">The list is empty!</div>;
    }

    return (
      <div className="main-view">
        {
          // If the state of "selectedMovie" is not null, that selected movie will be returned otherwise, all movie will be returned
        }
        {selectedMovie ? (
          <MovieView
            movie={selectedMovie}
            onBackClick={(newSelectedMovie) => {
              this.setSelectedMovie(newSelectedMovie);
            }}
          />
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={(movie) => {
                this.setSelectedMovie(movie);
              }}
            />
          ))
        )}
      </div>
    );
  }
}
