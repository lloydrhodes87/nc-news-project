import React, { Component } from 'react';
import * as api from '../Utils/fetchData';
import Loader from './Loader';
import Err from './Err';

class Users extends Component {
  _isMounted = false;
  state = {
    users: [],
    isLoading: true,
    hasError: false,
    error: ''
  };
  render() {
    const { users, isLoading } = this.state;
    const { hasError, error } = this.state;
    if (hasError) return <Err error={error} />;
    if (isLoading)
      return <Loader type="Bars" color="#somecolor" height={80} width={80} />;
    return (
      <div className="userComponent">
        <h2 className="userHeading">Users</h2>
        <ul className="userContainer">
          {users.map(({ username, avatar_url, name }) => {
            return (
              <li className="user" key={username}>
                <h3>{name}</h3>
                <img src={avatar_url} alt="avatar" />
                <p>username: {username}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  componentDidMount = () => {
    this._isMounted = true;
    this.fetchUsers();
  };
  componentWillUnmount() {
    this._isMounted = false;
  }
  fetchUsers = () => {
    api
      .fetchAllUsers()
      .then(users => {
        if (this._isMounted)
          this.setState(() => ({
            users: users,
            isLoading: false
          }));
      })
      .catch(err => {
        this.setState({
          hasError: true,
          error: err
        });
      });
  };
}

export default Users;