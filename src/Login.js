import React, { Component } from 'react';

class Login extends Component {
    render() {
        return <form method="POST" className="sign-in">
            <label htmlFor="username">username</label>
            <input type="text" id="username" required/>
            <label htmlFor="password">password</label>
            <input type="password" id="password" required/>
            <button type="submit">Sign in</button>
          </form>;
    }
}

export default Login;