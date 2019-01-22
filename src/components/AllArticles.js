import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../Utils/fetchData';
import Loader from './Loader';
import formatDate from '../Utils/utilFunctions';
import filterArticles from '../Utils/FilterArticles';




class AllArticles extends Component {
  state = {
    slug: '',
    articles: [],
    isLoading: true,
    value: '',
    search: ''
  };
  render() {
    const { isLoading } = this.state;
    let { articles } = this.state;
    const { slug } = this.props;
    if (isLoading)
      return <Loader type="Bars" color="#somecolor" height={80} width={80} />;
    return (
      <div className="articleList">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">Topic Title</label>
          <input type="text" id="title" />
          <button type="submit" onClick={this.handleSort}>
            Search
          </button>
          <select onChange={this.handleChange}>
            <option />
            <option value="?sort_by=created_at&sort_ascending=false">
              date first
            </option>
            <option value="?sort_by=created_at&sort_ascending=true">
              date last
            </option>
            <option value="?sort_by=votes&sort_ascending=true">votes</option>
            <option value="?sort_by=comment_count">most comments</option>
          </select>
        </form>
        {filterArticles(articles, slug).map(
          ({ article_id, title, topic, author, created_at }) => {
            return (
              <li key={article_id}>
                <p>Title: {title}</p>
                <p>Topic: {topic}</p>
                <p>Author: {author}</p>
                <p>Date: {formatDate(created_at)}</p>

                <Link
                  className="buttonViewArticles"
                  to={`/articles/${article_id}`}
                >
                  View Article
                </Link>
              </li>
            );
          }
        )}
      </div>
    );
  }

  componentDidMount = () => {
    this.fetchArticles();
  };
  componentDidUpdate = (prevState, prevProps) => {
    const { value } = this.state;
    if (prevState.value !== this.state.value) {
      api.fetchArticlesSort(value).then(articles => {
        this.setState({
          articles
        });
      });
    }
  };

  fetchArticles = () => {
    const { slug } = this.props;
    api.fetchAllArticles().then(articles => {
      this.setState({
        articles,
        isLoading: false,
        slug
      });
    });
  };

  handleChange = event => {
    this.props.getSearchValue(event.target.value);
    this.setState({
      value: event.target.value
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      value: ''
    });
  };
}

export default AllArticles;