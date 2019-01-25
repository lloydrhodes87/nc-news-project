import React, { Component } from 'react';
import axios from 'axios';

class AddComment extends Component {
  state = {
    body: '',
  };
  
  render() {
    const { user } = this.props;
    const { body } = this.state;
    
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <img className="avatarInArticles" src={user.avatar_url} alt="avatar"></img>
          <p>commenting as:{user.username} </p>
          <div className="addCommentButton">
            <label htmlFor="body"></label>
            <textarea type="text" id="body" onChange={this.handleChange} value={body} />
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

    const { articleid } = this.props;
    const object = {
      username: this.props.user.username,
      body: this.state.body
    }
    axios
      .post(`https://lloyd-news.herokuapp.com/api/articles/${articleid}/comments`, object)
      .then(({ data }) => {
        let comment = data.comment;
        comment = { ...comment, author: this.props.user.username };
        delete comment.username;
        this.props.getComment(comment);
      })     
      .catch(err => {
        console.log('AXIOS ERROR: ', err);
      });


    }
    
}

export default AddComment;