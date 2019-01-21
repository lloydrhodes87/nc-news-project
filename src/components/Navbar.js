import React from 'react';
import { Link } from '@reach/router'

const Navbar = () => {
    return (
        <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/articles">Articles</Link>
            <Link to="/topics">Topics</Link>
            <Link to="/users">Users</Link>
        </div>
    );
};

export default Navbar;