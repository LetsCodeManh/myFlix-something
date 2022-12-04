// React import
import React from "react";

// Bootstrap Component
import { Card, Button } from "react-bootstrap";

// Links
import { Link } from "react-router-dom";
import { connect } from "react-redux";

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Card>
        <Card.Img variant="top" src="{movie.ImagePath}" />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">Director</Button>
          </Link>

          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">Genre</Button>
          </Link>
          <Button
            onClick={() => {
              onBackClick(null);
            }}
            variant="link"
          >
            Back
          </Button>
        </Card.Body>
      </Card>
    );
  }
}
