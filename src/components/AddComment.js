import React, { Component } from 'react';

class AddComment extends Component {
  state = {
    username: this.props.user.username,
    body: '',
    articleid: this.props.articleid
  };
  
  render() {
    const { user } = this.props;
    
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <p>commenting as:{user.username} </p>
          <label htmlFor="body">Comment</label>
                <input type="text" id="body" onChange={this.handleChange} value={this.state.body}/>
          <button type="submit">Add Comment</button>
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
    const { articleid } = this.state;
    return fetch(`https://lloyd-news.herokuapp.com/api/articles/${articleid}/comments`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        body: this.state.body,
        username: this.state.username
      })
    }).then(res => res.json())
    .then(({comment}) => {
      this.props.getComment(comment)
    })


  }
    
}

export default AddComment;