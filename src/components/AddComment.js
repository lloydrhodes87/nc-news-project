import React, { Component } from 'react';

class AddComment extends Component {
  state = {
    body: '',
  };
  
  render() {
    const { user } = this.props;
    
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <img className="avatarInArticles" src={user.avatar_url} alt="avatar"></img>
          <p>commenting as:{user.username} </p>
          <div className="addCommentButton">
            <label htmlFor="body"></label>
            <textarea type="text" id="body" onChange={this.handleChange} value={this.state.body} />
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
    console.log(this.props.user.username)
    return fetch(`https://lloyd-news.herokuapp.com/api/articles/${articleid}/comments`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        body: this.state.body,
        username: this.props.user.username
      })
    }).then(res => res.json())
    .then(({comment}) => {
      this.props.getComment(comment)
    })


  }
    
}

export default AddComment;