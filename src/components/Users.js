import React, { Component } from 'react';
import * as api from '../Utils/fetchData';

class Users extends Component {
  _isMounted = false;
  state = {
    users: []
  };
  render() {

    const { users } = this.state
    return (
      <div className="userComponent">
        <h2 className="userHeading">Users</h2>
        <ul className="userContainer">
          {users.map(({username, avatar_url, name}) => {
            return (
              <li className="user" key={username}>
                <h3>{name}</h3>
                <img src={avatar_url} alt="avatar"></img>
                <p>username: {username}</p>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
  componentDidMount = () => {
    console.log('component mounted 1')
    this._isMounted = true;
    this.fetchUsers();
  };
  componentWillUnmount() {
    this._isMounted = false;
  }
  fetchUsers = () => {
    console.log('before fetch 2')
    api.fetchAllUsers().then(users => {
      console.log(users, 'after fetch 3')
      if (this._isMounted) 
      console.log(this._isMounted)
      this.setState(()=> ({
        users: users
      }));
    },console.log(this.state, 'setting state'));
  };
}

export default Users;