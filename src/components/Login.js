import Home from './Home';
import React, { Component } from 'react';
import { Router } from '@reach/router';
import Users from './Users';
import NotLogged from './NotLogged';


class Login extends Component {
  state = {
    username: ''
  };
  render() {
    const { user, children, users } = this.props;
    const { username } = this.state;
    return user ? <div>{children}</div> : <div>
        <form onSubmit={this.handleSubmit} method="POST" className="sign-in">
          <label id="usernameLogin" htmlFor="username">username</label>
          <input type="text" id="username" onChange={this.handleChange} value={username} required />
          <button type="submit">Sign in</button>
        </form>
        <Router>
          <Home path="/" users={users} />
          <NotLogged path="/articles/*" />
          <NotLogged path="/topics/*" />
          <Users path="/users" />
        </Router>
      </div>;
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

