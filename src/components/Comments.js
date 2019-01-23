import React, { Component } from 'react';
import formatDate from '../Utils/utilFunctions';
import Voter from './Voter';
import AddComment from './AddComment';
import * as api from '../Utils/fetchData';
import throttle from 'lodash.throttle';


class Comments extends Component {
  state = {
    comments: [],
    page: 1,
    sort_by: 'created_at',
    hasAllComments: false,
    limit: 10
  };
  render() {
    const { comments } = this.state;
    const { articleid, user } = this.props;


    return (
      <div>
        <AddComment
          articleid={articleid}
          getComment={this.getComment}
          user={user}
        />
        <ul>
          {comments.map(comment => (
            <li key={comment.comment_id}>
              <p>{comment.body}</p>
              <p>published by: {comment.author}</p>
              <p>left: {formatDate(comment.created_at)}</p>
              <Voter
                votes={comment.votes}   
                articleid={articleid}   
                commentid={comment.comment_id}
                parent="comments" 
              />
              <button 
                type="submit"
                onClick={() => this.handleDeleteComment(articleid, comment.comment_id)}
                disabled={user.username !== comment.author}
                >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll);
    this.handleFetchComments();
  };

  componentDidUpdate = (prevProps, prevState) => {
    const pageUpdate = prevState.page !== this.state.page;
    if (pageUpdate && !this.state.hasAllComments) {
      this.handleFetchComments();
    }
  };

  handleScroll = throttle(() => {
    const distanceFromTop = window.scrollY;
    const heightOfScreen = window.innerHeight;
    const fullDocumentHeight = document.body.scrollHeight;

    if (distanceFromTop + heightOfScreen > fullDocumentHeight - 100) {
      this.setState(({ page }) => ({
        page: page + 1
      }));
    }
  }, 1000);

  handleFetchComments = () => {
    const { articleid } = this.props;
    const { sort_by, page, limit } = this.state;
    console.log(articleid, sort_by, page, limit);
    api
      .fetchComments(articleid, sort_by, page, limit)
      .then(newComments => {
        console.log(newComments);
        this.setState(
          ({ comments }) => ({
            comments: page === 1 ? newComments : [...comments, ...newComments]
          }),
          () => {
            console.log(this.state.comments);
          }
        );
        if (!newComments.length)
          this.setState({
            hasAllComments: true
          });
      })
      .catch(err => {
        this.setState({
          hasAllComments: true
        });
      });
  };
  getComment = comment => {
      console.log(comment, 'comment is here')
    this.setState(prevState => {
      return { comments: [comment, ...prevState.comments] };
    });
  };

  deleteComment = commentid => {
    this.setState(
      prevState => ({
        comments: prevState.comments.filter(
          ({ comment_id }) => comment_id !== commentid
        )
      }),
      () => {
        console.log('state after delete', this.state);
      }
    );
  };

  handleDeleteComment = (articleid, commentid) => {
    console.log('1')
    api
      .deleteData(articleid, commentid)
      .then(res => {
          console.log('here', res)
        this.deleteComment(commentid);
      })
      .catch(err => console.log(err, '<<<<<'));
  };
}

export default Comments;


