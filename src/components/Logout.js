import React, { Component } from 'react';
import { Link } from '@reach/router';

class Logout extends Component {
  render() {
    const { loggedIn, logout } = this.props;
    return (
      <div className="logout">
        {loggedIn && (
          <button>
            <Link className="link" to="/" type="submit" onClick={logout}>
              Logout
            </Link>
          </button>
        )}
      </div>
    );
  }
}

export default Logout;
