import React, { Component } from 'react';

class Login extends Component {
  state = {
    username: ''
  };
  render() {
    const { user } = this.props;

    return user ? (
      <div>{this.props.children}</div>
    ) : (
      <form onSubmit={this.handleSubmit} method="POST" className="sign-in">
        <label htmlFor="username">username</label>
        <input
          type="text"
          id="username"
          onChange={this.handleChange}
          value={this.state.username}
          required
        />
        <button type="submit">Sign in</button>
      </form>
    );
  }
  handleChange = e => {
    const { value, id } = e.target;
    this.setState({
      [id]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.username);
    this.setState({
      username: ''
    });
  };
  
}

export default Login;

