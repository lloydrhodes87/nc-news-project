import React, { Component } from 'react';

class Logout extends Component {
    render() {
        return (
            <div>
                <button type='submit' onClick={this.props.logout}>Logout</button>
            </div>
        );
    }
    
}

export default Logout;