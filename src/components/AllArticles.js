import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../Utils/fetchData';
import Loader from './Loader';
import formatDate from '../Utils/utilFunctions';




class AllArticles extends Component {
  state = {
    articles: [],
    isLoading: true
  }
  render() {
    
    const { isLoading } = this.state;
    const { articles } = this.state.articles;
    const { getArticleId } = this.props;

    if (isLoading) return <Loader type="Bars" color="#somecolor" height={80} width={80} />;
    return (
      <div className="articleList">
        {articles.map(({article_id, title, topic, author, created_at}) => {
          return <li key={article_id}>
              <p>Title: {title}</p>
              <p>Topic: {topic}</p>
              <p>Author: {author}</p>
              <p>Date: {formatDate(created_at)}</p>
              <button className="buttonViewArticles" onClick={() => getArticleId(article_id)}>
              <Link to={`/articles/${article_id}`}>View Article</Link>
              </button>
            </li>;
        })
        }

      </div>
    );
  }
  componentDidMount = () => {
    this.fetchArticles();
  }
  fetchArticles = () => {
    api.fetchAllArticles()
      .then(articles => {
        this.setState({
          articles,
          isLoading: false
        })
      })
  }
 
}

export default AllArticles;