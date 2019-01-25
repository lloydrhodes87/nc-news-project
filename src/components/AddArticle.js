import React, { Component } from 'react';
import axios from 'axios';
import * as api from '../Utils/fetchData';
import Err from './Err';

class AddArticle extends Component {
  state = {
    title: '',
    body: '',
    topic: '',
    username: this.props.user.username,
    topics: [],
    hasError: false,
    error: ''
  };
  render() {
    const { user } = this.props;
    const { topics } = this.state;

    const { hasError, error } = this.state;
    if (hasError) return <Err error={error} />;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="topAddArticleForm">
            <label htmlFor="title" />
            <input
              id="title"
              type="text"
              onChange={this.handleChange}
              value={this.state.title}
              placeholder="Title"
              required
            />
            <label htmlFor="body" />
            <textarea
              id="body"
              type="text"
              onChange={this.handleChange}
              value={this.state.body}
              placeholder="Body"
              required
            />
            <label className="selectLabel" htmlFor="topic">
              Topic
            </label>
            <div className="categories">
              <select
                className="select"
                id="topic"
                value={this.state.topic}
                onChange={this.handleChange}
                required
              >
                <option />
                {topics.map(topic => {
                  return (
                    <option key={topic.slug} id={topic} value={topic.slug}>
                      {topic.slug}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="postingAsBox">
            <img id="postingAs" src={user.avatar_url} alt="avatar" />
            <p>Posting as: {user.username}</p>
          </div>

          <button id="addArticleButton">Add Article</button>
        </form>
        <hr id="hr" />
      </div>
    );
  }
  componentDidMount = () => {
    this.setTopicArray();
  };

  handleChange = event => {
    const { id, value } = event.target;
    this.setState({
      [id]: value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { title, username, body, topic } = this.state;
    const { fetchNewArticle } = this.props;

    const object = {
      username: username,
      body: body,
      title: title
    };

    axios
      .post(
        `https://lloyd-news.herokuapp.com/api/topics/${topic}/articles`,
        object
      )
      .then(({ data }) => {
        console.log(data);
        let article = data.article;
        article = { ...article, author: article.username };
        delete article.username;
        fetchNewArticle(article);
      })
      .then(() => {
        this.setState({
          username: '',
          body: '',
          title: ''
        });
      })
      .catch(err => {
        this.setState({
          hasError: true,
          error: err
        });
      });
  };
  setTopicArray = () => {
    api.fetchTopics().then(topics => {
      this.setState({
        topics
      });
    });
  };
}








export default AddArticle;