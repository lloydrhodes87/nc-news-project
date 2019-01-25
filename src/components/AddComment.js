import React, { Component } from 'react';
import axios from 'axios';
import Err from './Err';

class AddComment extends Component {
  state = {
    body: '',
    hasError: false,
    error: ''
  };
  
  render() {
    const { user } = this.props;
    const { body } = this.state;

    const { hasError, error } = this.state
    if (hasError) return <Err error={error} />
    
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <img className="avatarInArticles" src={user.avatar_url} alt="avatar"></img>
          <p>commenting as:{user.username} </p>
          <div className="addCommentButton">
            <label htmlFor="body"></label>
            <textarea type="text" id="body" onChange={this.handleChange} value={body} required/>
            <button type="submit">Add Comment</button>
          </div>        
        </form>
      </div>
    );
  }
  handleChange = event => {
    const { id } = event.target;
    this.setState({
      [id]: event.target.value
    });
  };
 

    handleSubmit = (event) => {
        event.preventDefault();
        this.addComment();
        this.setState({
            body: ''
        })
    };

  addComment = () => {

    const { articleid, user, getComment } = this.props;
    const { body } = this.state
    const object = {
      username: user.username,
      body: body
    }
    axios
      .post(`https://lloyd-news.herokuapp.com/api/articles/${articleid}/comments`, object)
      .then(({ data }) => {
        let comment = data.comment;
        comment = { ...comment, author: user.username };
        delete comment.username;
        getComment(comment);
      })     
      .catch(err => {
        this.setState({
          hasError: true,
          error: err
        })
      });


    }
    
}

export default AddComment;