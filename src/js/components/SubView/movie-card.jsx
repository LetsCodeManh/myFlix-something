// React import
import React from "react";

// Props Checking
import PropTypes from "prop-types";

// Bootstrap Component
import { Card, Button } from "react-bootstrap";

// Links
import { Link } from "react-router-dom";
import { connect } from "react-redux";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card style={{ width: "300px", height: "auto" }}>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description.slice(0, 255) + "..."}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">More Infos!</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    user: state.user,
  };
};

export default connect(mapStateToProps)(MovieCard);
