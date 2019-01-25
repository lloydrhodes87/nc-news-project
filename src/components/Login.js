import Home from './Home';
import React, { Component } from 'react';
import { Router } from '@reach/router';
import Users from './Users';


class Login extends Component {
  state = {
    username: ''
  };
  render() {
    const { user } = this.props;
    console.log('in login', user)
    return user ? <div>{this.props.children}</div> : <div>
        <form onSubmit={this.handleSubmit} method="POST" className="sign-in">
          {console.log('main section')}
          <label htmlFor="username">username</label>
          <input type="text" id="username" onChange={this.handleChange} value={this.state.username} required />
          <button type="submit">Sign in</button>
        </form>
        <Router>
          <Home path="/" users={this.props.users} />
          <Users path="/users" />
        </Router>
      </div>;
  }
  handleChange = e => {
    console.log(e.target.value, 'handle change in login')
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

