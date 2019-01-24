import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../Utils/fetchData';
import Loader from './Loader';
import formatDate from '../Utils/utilFunctions';
import AddArticle from './AddArticle';
import throttle from 'lodash.throttle';


class AllArticles extends Component {
  state = {
    articles: [],
    isLoading: true,
    value: '',
    search: '',
    page: 1,
    hasAllArticles: false
   
  };
  render() {
    const { isLoading } = this.state;
    let { articles } = this.state;
    

    if (isLoading)
      return <Loader type="Bars" color="#somecolor" height={80} width={80} />;
    return (
      
      <div className="articleList">
        <AddArticle
          fetchNewArticle={this.fetchNewAticle}
          user={this.props.user}
        />
        <form onSubmit={this.handleSubmit}>
          <select onChange={this.handleChange}>
            <option value="created_at">date first</option>
            <option value="created_at&sort_ascending=true">date last</option>
            <option value="votes&sort_ascending=true">votes</option>
            <option value="comment_count">most comments</option>
          </select>
        </form>
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
    
    window.addEventListener('scroll', this.handleScroll);
    this.handleFetchArticles();
    
  };

  componentDidUpdate = (prevProps, prevState) => {
    
    const pageUpdate = prevState.page !== this.state.page;
    const topicUpdate = prevProps.slug !== this.props.slug;
    if (prevState.value !== this.state.value && this.state.value !== '') {
          this.resetToFirstPage();         
    }
    if (pageUpdate && !this.state.hasAllArticles) {
      this.handleFetchArticles();
    }
    if (topicUpdate) {
      this.resetToFirstPage();
    }

  };

 

  handleScroll = throttle(() => {
    const distanceFromTop = window.scrollY;
    const heightOfScreen = window.innerHeight;
    const fullDocumentHeight = document.body.scrollHeight;

    if (distanceFromTop + heightOfScreen > fullDocumentHeight - 100) {
      this.setState(({ page }) => ({
        page: page + 1
      }));
    }
  }, 1000);

  handleFetchArticles = () => {
    const { page, value } = this.state;
    console.log(value, page,'<--- value & page')
    const { slug } = this.props;
    api
      .fetchArticles(slug, value, page)
      .then(newArticles => {
        console.log(newArticles)
        this.setState(({ articles }) => ({
          articles: page === 1 ? newArticles : [...articles, ...newArticles],
          isLoading: false
        }));
        if (!newArticles.length)
          this.setState({
            hasAllArticles: true,
            isLoading: false
          });
      })
      .catch(err => {
        this.setState({
          hasAllArticles: true,
          isLoading: false
        });
      });
  };

  handleChange = event => {
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
  fetchNewAticle = article => {
    console.log(article, 'article here')
    this.setState(prevState => ({
      
      articles: [article, ...prevState.articles]
    }), ()=>console.log(this.state, 'NEW ARTICLE LIST'));
  };
  resetToFirstPage = () => {
    this.setState({
      page: 1,
      hasAllArticles: false
    }, this.handleFetchArticles);
  };

}

export default AllArticles;