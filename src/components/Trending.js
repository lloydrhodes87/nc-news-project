import React, { Component } from 'react';
import * as api from '../Utils/fetchData';
import formatDate from '../Utils/utilFunctions';
import { Link } from '@reach/router';
import Err from './Err';
import Loader from './Loader';

class Trending extends Component {
  _isMounted = false;
  state = {
    articles: [],
    limit: 3,
    sort_by: 'comment_count',
    page: 1,
    hasError: false,
    error: '',
    isLoading: true
  };
  render() {
    const { articles, isLoading, hasError, error } = this.state;
    const { users } = this.props;

    if (hasError) return <Err error={error} />;
    if (isLoading)
      return <Loader type="Bars" color="#somecolor" height={80} width={80} />;
    return (
      <div className="trendingContainer">
        <h3>Trending Now</h3>

        <ul>
          <div className="homeContainer">
            {articles.map(
              ({
                article_id,
                title,
                topic,
                author,
                created_at,
                comment_count,
                votes
              }) => {
                const userObject = users.filter(
                  user => user.username === author
                );
                return (
                  <li key={article_id}>
                    <p className="homePageVotes">Votes: {votes}</p>
                    <p className="articleTitle">{title}</p>
                    <p className="articleP">Topic: {topic}</p>
                    <img
                      className="avatarInArticles"
                      src={userObject[0].avatar_url}
                      alt="avatar"
                    />
                    <p>Author: {author}</p>
                    <p className="articlePDate">
                      Date: {formatDate(created_at)}
                    </p>
                    <p className="comments">comments: {comment_count}</p>
                    <button>
                      <Link
                        className="buttonViewArticles"
                        to={`/articles/${article_id}`}
                      >
                        View Article
                      </Link>
                    </button>
                  </li>
                );
              }
            )}
          </div>
        </ul>
      </div>
    );
  }
  componentDidMount = () => {
    this._isMounted = true;
    this.mostRecent();
  };
  componentWillUnmount() {
    this._isMounted = false;
  }
  mostRecent() {
    const { sort_by } = this.state;
    if (this._isMounted)
      api
        .fetchMostRecentArticles(sort_by)
        .then(articles => {
          if (this._isMounted) this.setState({ articles, isLoading: false });
        })
        .catch(err => {
          this.setState({
            hasError: true,
            error: err
          });
        });
  }
}

export default Trending;
