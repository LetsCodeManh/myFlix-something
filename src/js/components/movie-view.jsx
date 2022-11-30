import React from "react";
import { Card, Container } from "react-bootstrap";

export class MovieView extends React.Component {
  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener("keypress", this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.keypressCallback);
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Card>
        <Card.Img variant="top" src="{movie.ImagePath}" />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
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
