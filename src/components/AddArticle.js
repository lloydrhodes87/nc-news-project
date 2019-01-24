import React, { Component } from 'react';
import axios from 'axios';
import * as api from '../Utils/fetchData';

class AddArticle extends Component {
  state = {
    title: '',
    body: '',
    topic: '',
    username: this.props.user.username,
    topics: []

  }
    render() {
        const { user } = this.props;
        const { topics } = this.state;
        
         return <div>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="title">Article Title:</label>
              <input id="title" type="text" onChange={this.handleChange} value={this.state.title} />
              <label htmlFor="body">Body:</label>
              <input id="body" type="text" onChange={this.handleChange} value={this.state.body}></input>
              <label htmlFor="topic"></label>
            <select id="topic" value ={this.state.topic} onChange={this.handleChange}>
                <option />
                {topics.map(topic => {
                  return <option key={topic.slug} id={topic} value={topic.slug}>{topic.slug}</option>
                })}
              </select>
              <p>Posting as: {user.username}</p>
              <button>Add Article</button>

            </form>
          </div>;
    }
    componentDidMount = () => {
      this.setTopicArray();
    }

    handleChange = (event) => {
      const { id, value } = event.target;
      this.setState({
        [id]: value
      })
    }
    handleSubmit = (event) => {
      event.preventDefault();
      const { title, username, body, topic } = this.state
      const { fetchNewArticle } = this.props;
    

      const object = {
        username: username,
        body: body,
        title: title
      }
      // let axiosConfig = {
      //   headers: {
      //     'Content-Type': 'application/json;charset=UTF-8',
      //     "Access-Control-Allow-Origin": "*",
      //   }
      // };
      axios.post(`https://lloyd-news.herokuapp.com/api/topics/${topic}/articles`, object)
        .then(({data}) => {
          console.log(data)
          let article = data.article 
           article = {...article, author: article.username}
           delete article.username
          fetchNewArticle(article)
        })
        .then(() => {
          this.setState({
            username: '',
            body: '',
            title: ''
          })
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        })
      
    }
    setTopicArray = () => {
      api.fetchTopics()
      .then(topics => {
        this.setState({
          topics
        })
      })
    }
}








export default AddArticle;