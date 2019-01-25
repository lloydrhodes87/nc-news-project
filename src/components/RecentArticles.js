import React, { Component } from 'react';
import * as api from '../Utils/fetchData';
import formatDate from '../Utils/utilFunctions';
import { Link } from '@reach/router';
import Err from './Err';
import Loader from './Loader';

class RecentArticles extends Component {
  _isMounted = false;
  state = {
    articles: [],
    limit: 3,
    sort_by: 'created_at',
    page: 1,
    hasError: false,
    error: '',
    isLoading: true
  };
  render() {
    const { articles, isLoading } = this.state;
    const { hasError, error } = this.state;
    if (hasError) return <Err error={error} />;
    if (isLoading)
      return <Loader type="Bars" color="#somecolor" height={80} width={80} />;
    return (
      <div className="recentArticlesContainer">
        <h3>Recent Articles</h3>
        <ul>
          <div className="homeContainer">
            {articles.map(
              ({ article_id, title, topic, author, created_at }) => {
                const userObject = this.props.users.filter(
                  user => user.username === author
                );
                return (
                  <li key={article_id}>
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
    api
      .fetchMostRecentArticles()
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

export default RecentArticles;