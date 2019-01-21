import React, { Component } from 'react';

class AddComment extends Component {
  state = {
    username: '',
    body: '',
    articleid: this.props.articleid
  };
  
  render() {
  
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" onChange={this.handleChange}/>
          <label htmlFor="body">Comment</label>
                <input type="text" id="body" onChange={this.handleChange}/>
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
            username: '',
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
      }, () => {
        console.log(this.state)
      })
    });


  }
    
}

export default AddComment;