import React, { Component } from 'react';
import * as api from '../Utils/fetchData';
import formatDate from '../Utils/utilFunctions';
import { Link } from '@reach/router';

class RecentArticles extends Component {
  _isMounted = false;
  state = {
    articles: [],
    limit: 3,
    sort_by: 'created_at',
    page: 1
  };
  render() {
    const { articles } = this.state;
    return (
      <div>
        <h2>Recent Articles</h2>
        {articles.map(({ article_id, title, topic, author, created_at }) => {
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
        })}
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
    api.fetchMostRecentArticles().then(articles => {
      if (this._isMounted) this.setState({ articles });
    });
  }
}

export default RecentArticles;