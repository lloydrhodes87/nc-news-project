import React from 'react';
import { Link } from '@reach/router';

const Users = () => {
    return <div>
        <h1>Users</h1>
        <p>
          <Link to="/users/user">list of all users</Link>
        </p>
      </div>;
};

export default Users;