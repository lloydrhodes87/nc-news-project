import React, { Component } from 'react';
import axios from 'axios';

class Comment extends Component {
    state = {
        votes: this.props.votes,
        articleid: this.props.articleid,
        commentid: this.props.commentid
    }
    render() {
        const { votes } = this.state
        return (
            <div>
                <p>votes: {votes}</p>
                <button type="submit" onClick={this.handleIncrementVote}>Vote Up</button>
                <button type="submit" onClick={this.handleDecrementVote}>Vote Down</button>
                <button type="submit" onClick={this.handleDeleteComment}>Delete</button>
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
    handleDeleteComment = () => {
        const { deleteComment } = this.props; 
        const { commentid, articleid } = this.state;
        axios.delete(`https://lloyd-news.herokuapp.com/api/articles/${articleid}/comments/${commentid}`)
        .then(res => {
            deleteComment(commentid);
        })
        .catch(err => console.log(err))
        
    }
}


export default Comment;