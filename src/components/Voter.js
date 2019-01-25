import React, { Component } from 'react';
import axios from 'axios';
import Err from './Err';

class Voter extends Component {
  state = {
    voteChange: 0,
    hasError: false,
    error: ''
  };
  render() {
    const { voteChange } = this.state;
    const { votes } = this.props;
    const { hasError, error } = this.state;
    if (hasError) return <Err error={error} />;
    return (
      <div>
        <p className="votes">Votes: {voteChange + votes}</p>
        <button
          className="voteButton"
          disabled={voteChange > 0}
          type="submit"
          onClick={() => this.handleUpdateVote(1)}
        >
          <img
            className="thumb"
            src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/155/thumbs-up-sign_1f44d.png"
            alt="thumb down"
          />
        </button>
        <button
          className="voteButton"
          disabled={voteChange < 0}
          type="submit"
          onClick={() => this.handleUpdateVote(-1)}
        >
          <img
            className="thumb"
            src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/155/thumbs-down-sign_1f44e.png"
            alt="thumb down"
          />
        </button>
      </div>
    );
  }

  handleUpdateVote = direction => {
    const { parent } = this.props;

    this.setState(prevState => ({
      voteChange: prevState.voteChange + direction
    }));
    const { commentid, articleid } = this.props;
    const reqStr =
      parent === 'comments'
        ? `https://lloyd-news.herokuapp.com/api/articles/${articleid}/comments/${commentid}`
        : `https://lloyd-news.herokuapp.com/api/articles/${articleid}`;
    const vote = {
      inc_votes: direction
    };
    axios
      .patch(reqStr, vote)
      .then(res => {})
      .catch(err => {
        this.setState({
          hasError: true,
          error: err
        });
      });
  };
}

export default Voter;
