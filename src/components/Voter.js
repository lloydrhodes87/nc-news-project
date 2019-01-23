import React, { Component } from 'react';
import axios from 'axios';

class Voter extends Component {
    state = {
        voteChange: 0
    };
    render() {
        const { voteChange } = this.state;
        const { votes } = this.props
        return <div>
            <p>Votes: {voteChange + votes}</p>
            <button disabled={voteChange > 0} type="submit" onClick={() => this.handleUpdateVote(1)}>
              Vote Up
            </button>
            <button disabled={voteChange < 0} type="submit" onClick={() => this.handleUpdateVote(-1)}>
              Vote Down
            </button>
          </div>;
    }



    handleUpdateVote = direction => {
        const { parent } = this.props;


        this.setState(prevState => ({
            voteChange: prevState.voteChange + direction
        }));
        const { commentid, articleid } = this.props;
        const reqStr = parent === 'comments' 
            ? `https://lloyd-news.herokuapp.com/api/articles/${articleid}/comments/${commentid}` 
            : `https://lloyd-news.herokuapp.com/api/articles/${articleid}`
        const vote = {
            inc_votes: direction
        }
        axios.patch(reqStr, vote)
            .then(res => {
            }).catch(err => console.log(err))
    };
}


export default Voter;