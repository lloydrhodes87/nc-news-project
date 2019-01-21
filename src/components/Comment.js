import React, { Component } from 'react';

class Comment extends Component {
    state = {
        votes: this.props.votes,
    }
    render() {
        const { votes } = this.state
        return (
            <div>
                <p>votes: {votes}</p>
                <button type="submit" onClick={this.handleIncrementVote}>Vote Up</button>
                <button type="submit" onClick={this.handleDecrementVote}>Vote Down</button>
                <button type="submit">Delete</button>
            </div>
        );
    }
    handleIncrementVote = () => {
        this.setState((prevState) => ({
            votes: prevState.votes + 1
        }))
    }
    handleDecrementVote = () => {
        this.setState(prevState => ({ votes: prevState.votes - 1 }));
    }
}

export default Comment;