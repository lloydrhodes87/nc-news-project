import React, { Component } from 'react';
import axios from 'axios';
import Err from './Err';

class Topics extends Component {
  state = {
    slug: '',
    description: '',
    hasError: false,
    error: ''
  };
  render() {
    const { hasError, error } = this.state;
    if (hasError)
      return <Err error={error} message="Topic added must be a new one!" />;
    return (
      <div>
        <form onSubmit={this.onSubmit} className="postTopicContainer">
          <div className="postTopicTop">
            <label htmlFor="slug" />
            <input
              type="text"
              value={this.state.slug}
              onChange={this.handleChange}
              id="slug"
              placeholder="Topic"
            />
            <button type="submit">Add Topic</button>
          </div>

          <label htmlFor="description" />
          <textarea
            type="text"
            value={this.state.description}
            onChange={this.handleChange}
            placeholder="Description"
            id="description"
          />
        </form>
      </div>
    );
  }
  handleChange = event => {
    const { value, id } = event.target;
    this.setState({
      [id]: value
    });
  };
  onSubmit = event => {
    event.preventDefault();
    this.addTopicCall();
    this.setState({
      slug: '',
      description: ''
    });
  };

  addTopicCall = async () => {
    const { slug, description } = this.state;
    const { getTopic } = this.props;
    const topic = {
      slug,
      description: description
    };
    await axios
      .post(`https://lloyd-news.herokuapp.com/api/topics`, topic)
      .then(({ data }) => {
        getTopic(data.topic);
      })
      .catch(err => {
        console.log('should be a 422');
        this.setState({
          hasError: true,
          error: err
        });
      });
  };
}

export default Topics;
