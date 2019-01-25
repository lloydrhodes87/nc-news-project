import React from 'react';

const LoggedIn = (props) => {

    const { username, avatar_url } = props.user
    return (
        <div className="loggedInContainer">
            <p>logged in as: {username} </p>
            <img className="avatar" src={avatar_url} alt="avatar"></img>
        </div>
    );
};

export default LoggedIn;