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

  }
  render() {
    
    const { isLoading } = this.state;
    let { articles } = this.state.articles;
    const { getArticleId, slug } = this.props;


    if (isLoading) return <Loader type="Bars" color="#somecolor" height={80} width={80} />;
    return <div className="articleList">
      {filterArticles(articles, slug).map(
          ({ article_id, title, topic, author, created_at }) => {
            return (
              <li key={article_id}>
                <p>Title: {title}</p>
                <p>Topic: {topic}</p>
                <p>Author: {author}</p>
                <p>Date: {formatDate(created_at)}</p>
                <button
                  className="buttonViewArticles"
                  onClick={() => getArticleId(article_id)}
                >
                  <Link to={`/articles/${article_id}`}>View Article</Link>
                </button>
              </li>
            );
          }
        )}
      </div>;
  }
  componentDidMount = () => {
    this.fetchArticles();
    
  }
  fetchArticles = () => {
    const { slug } = this.props
    api.fetchAllArticles()
      .then(articles => {
        this.setState({
          articles,
          isLoading: false,
          slug
        })
      })
  }
}

export default AllArticles;