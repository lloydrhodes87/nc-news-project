import React, { Component } from 'react';
import * as api from '../Utils/fetchData';
import axios from 'axios';

class Comment extends Component {
    state = {
        inc_votes: this.props.votes,
        articleid: this.props.articleid,
        commentid: this.props.commentid
    }
    render() {
        const { inc_votes } = this.state
        return (
            <div>
                <p>Votes: {inc_votes}</p>
                <button type="submit" onClick={() => this.handleUpdateVote('increment')}>Vote Up</button>
                <button type="submit" onClick={() => this.handleUpdateVote('decrement')}>Vote Down</button>
                <button type="submit" onClick={this.handleDeleteComment}>Delete</button>
            </div>
        );
    }


    
    handleUpdateVote = (id) => {
        const { commentid, articleid } = this.state;
        const reqStr = `https://lloyd-news.herokuapp.com/api/articles/${articleid}/comments/${commentid}`;
        console.log(reqStr);
        const vote = {
            inc_votes: id === 'increment' ? 1 : -1
        }
        console.log(vote);
        axios.patch(reqStr, vote)
        .then(res => {
            this.setState((prevState) => ({
                inc_votes: id === 'increment' ? prevState.inc_votes + 1 : prevState.inc_votes - 1
            }),  () => console.log(this.state.inc_votes))
        }).catch(err => console.log(err))        
    }



    handleDeleteComment = () => {
        const { deleteComment } = this.props; 
        const { commentid, articleid } = this.state;
        console.log('>>>>', commentid, articleid)
        api.deleteData(commentid, articleid)
        .then(res => {
            console.log(res, '<<<<<')
            deleteComment(commentid);
        })
        .catch(err => console.log(err))
        
    }
}


export default Comment;