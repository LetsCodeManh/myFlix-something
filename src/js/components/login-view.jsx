import React from "react";

export class LoginView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    function onUsernameChange(e) {
      this.setState({
        username: e.target.value,
      });
    }

    function onPasswordChange(e) {
      this.setState({ username: e.target.value });
    }

    function handleSubmit() {
      const { username, password } = this.state;
      console.log(username, password);
      // Send a request to the server for authentication
      // Then call this.props.onLoggedIn(username)
      // this.props.onLoggedIn(password
    }
  }

  render() {
    return (
      <form>
        <label>
          Username:
          <input
            type="text"
            value={this.state.username}
            onChange={this.onUsernameChange}
          />
        </label>
        <label>
          Password:
          <input
            type="text"
            value={this.state.password}
            onChange={this.onPasswordChange}
          />
        </label>
        <button type="button" onClick={this.handleSubmit}>
          Submit
        </button>
      </form>
    );
  }
}
