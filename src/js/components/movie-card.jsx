import React from "react";

class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return <div className="movie-card">{movie.Title}</div>
  }
}


export default MovieCard;