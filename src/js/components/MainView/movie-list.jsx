// React import
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

// Links
import { connect } from "react-redux";

// Import
import { MovieCard } from "./movie-card";
import VisibilityFilterInput from "./visibility-filter-input";

function MovieList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== "") {
    filteredMovies = movies.filter((movie) =>
      movie.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }

  if (!movies) return <div className="main-view" />;

  return (
    <Container>
      <Row>
        <Col>
          <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        </Col>
      </Row>
      <Row>
        <Col>
          <MovieCard movie={movie} />
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

export default connect(mapStateToProps)(MovieList);
