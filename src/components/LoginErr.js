import React, { Component } from 'react';
import { Link } from '@reach/router';

class LoginErr extends Component {
  render() {
    const err = this.props.error.response;
    return (
      <div className="errorBox">
        <h1>Whoops!</h1>
        <p>{err.data.msg}</p>
        <p>{err.status}</p>
        <p>Please enter a valid username</p>
        <button onClick={this.handleResetState}>
          <Link className="link" to="/">
            Go Home
          </Link>
        </button>
      </div>
    );
  }
  handleResetState = () => {
    this.props.resetState();
  };
}

export default LoginErr;
