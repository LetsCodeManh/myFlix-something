import React from "react";
import PropTypes from "prop-types";

import { Card, Container, Row, Col, Button } from "react-bootstrap";

export class GenreView extends React.Component {
  render() {
    const { genre } = this.props;

    return (
      <Container>
        <Card>
          <Card.Body>
            <Row>
              <Col>Genre:</Col>
              <Col>{genre.Name}</Col>
            </Row>
            <Row>
              <Col>Description:</Col>
              <Col>{genre.Description}</Col>
            </Row>
            <Button>Back</Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};
