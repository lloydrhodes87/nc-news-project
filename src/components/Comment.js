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
                <button type="submit" onClick={() => this.handleChange('increment')}>Vote Up</button>
                <button type="submit" onClick={() => this.handleChange('decrement')}>Vote Down</button>
                <button type="submit" onClick={this.handleDeleteComment}>Delete</button>
            </div>
        );
    }

    // votes increment at massive rate 

    
    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.inc_votes === this.state.inc_votes - 1) {
            this.handleChange();
        }
            
        
    }

    handleChange = (value) => {
        console.log(value)
        this.handleUpdateVote(value);

    }
    
    // handleUpdateVote = (id) => {
    //     const { commentid, articleid } = this.state;
    //     const vote = {
    //         inc_votes: this.state.inc_votes
    //     }
    //     axios.patch(`https://lloyd-news.herokuapp.com/api/articles/${articleid}/comments/${commentid}`, vote)
    //     .then(res => {
    //         this.setState((prevState) => ({
    //             inc_votes: id === 'increment' ? prevState.inc_votes + 1 : prevState.inc_votes - 1
    //         }))
    //     }).catch(err => console.log(err))        
    // }



    handleDeleteComment = () => {
        const { deleteComment } = this.props; 
        const { commentid, articleid } = this.state;
        api.deleteData(commentid, articleid)
        .then(res => {
            deleteComment(commentid);
        })
        .catch(err => console.log(err))
        
    }
}


export default Comment;