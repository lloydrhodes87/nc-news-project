import React, { Component } from 'react';
import axios from 'axios';

class AddArticle extends Component {
  state = {
    title: '',
    body: '',
    topic: '',
    username: this.props.user.username

  }
    render() {
        const { user } = this.props
         return <div>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="title">Article Title:</label>
              <input id="title" type="text" onChange={this.handleChange} value={this.state.title} />
              <label htmlFor="body">Body:</label>
              <input id="body" type="text" onChange={this.handleChange} value={this.state.body}></input>
              <label htmlFor="topic"></label>
            <select id="topic" value ={this.state.topic} onChange={this.handleChange}>
                <option />
                <option id="topic" value="coding">coding</option>
                <option id="topic"  value="cooking">cooking</option>
                <option id="topic"  value="football">football</option>
              </select>
              <p>Posting as: {user.username}</p>
              <button>Add Article</button>

            </form>
          </div>;
    }
    handleChange = (event) => {
      const { id, value } = event.target;
      this.setState({
        [id]: value
      })
    }
    handleSubmit = (event) => {
      event.preventDefault();
      const { topic } = this.state
      const { fetchNewArticle } = this.props;

      console.log(topic)
      let axiosConfig = {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
        }
      };
      axios.post(`https://lloyd-news.herokuapp.com/api/topics/${topic}/articles`, this.state, axiosConfig)
        .then(({data}) => {
          const article = data.article
          
          fetchNewArticle(article)
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        })

      
      // make call
      this.setState({
        username: '',
        body: '',
        topic: ''
      })
    }
}








export default AddArticle;