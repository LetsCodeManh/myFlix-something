import React from "react";
import PropTypes from "prop-types";

import { Card, Container, Row, Col, Button } from "react-bootstrap";

export class DirectorView extends React.Component {
  render() {
    const { director } = this.props;

    return (
      <Container>
        <Card>
          <Card.Body>
            <Row>
              <Col>Directors:</Col>
              <Col>{director.Name}</Col>
            </Row>
            <Row>
              <Col>Bio:</Col>
              <Col>{director.Bio}</Col>
            </Row>
            <Row>
              <Col>Birthday:</Col>
              <Col>{director.Birth}</Col>
            </Row>
            <Button>Back</Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    Death: PropTypes.string,
  }).isRequired,
};
