// React import
import React from "react";

// Links
import { connect } from "react-redux";
import { setFilter } from "../../Redux/action";

// Bootstrap Component
import { Form } from "react-bootstrap";

function VisibilityFilterInput(props) {
  return (
    <Form.Control
      onChange={(e) => props.setFilter(e.target.value)}
      value={props.visibilityFilter}
      placeholder="Search for movies"
    />
  );
}

export default connect(null, { setFilter })(VisibilityFilterInput);
