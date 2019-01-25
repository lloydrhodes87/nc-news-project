import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../Utils/fetchData';
import Loader from './Loader';
import formatDate from '../Utils/utilFunctions';
import AddArticle from './AddArticle';
import throttle from 'lodash.throttle';


class AllArticles extends Component {
  _isMounted = false;
  state = {
    articles: [],
    isLoading: true,
    value: '',
    search: '',
    page: 1,
    hasAllArticles: false,
    topic: ''
  };
  render() {
    const { isLoading } = this.state;
    let { articles } = this.state;

    if (isLoading)
      return <Loader type="Bars" color="#somecolor" height={80} width={80} />;
    return (
      <div>
        <h2 className="articleHeading">Articles</h2>
        <div className="articleList">
          <AddArticle
            fetchNewArticle={this.fetchNewAticle}
            user={this.props.user}
          />
          <form onSubmit={this.handleSubmit}>
            <p id="sortLabel">Sort</p>
            <div className="categories" id="sortbySelect">
              <select className="select" onChange={this.handleChange}>
                <option />
                <option value="created_at">date first</option>
                <option value="created_at&sort_ascending=true">
                  date last
                </option>
                <option value="votes&sort_ascending=true">votes</option>
                <option value="comment_count">most comments</option>
              </select>
            </div>
          </form>

          {articles.map(({ article_id, title, topic, author, created_at }) => {
            const userObject = this.props.users.filter(
              user => user.username === author
            );
            return (
              <li key={article_id}>
                <h3 className="articleTitle">{title}</h3>

                <p className="articlePTopic">Topic: {topic}</p>
                <img
                  className="avatarInArticles"
                  src={userObject[0].avatar_url}
                  alt="avatar"
                />
                <p className="articleP">Author: {author}</p>
                <p className="articlePDate">Date: {formatDate(created_at)}</p>

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
      </div>
    );
  }

  componentDidMount = () => {
    this._isMounted = true;
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

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleScroll = throttle(() => {
    const distanceFromTop = window.scrollY;
    const heightOfScreen = window.innerHeight;
    const fullDocumentHeight = document.body.scrollHeight;

    if (distanceFromTop + heightOfScreen > fullDocumentHeight - 100) {
      if (this._isMounted) this.setState(({ page }) => ({
          page: page + 1
        }));
    }
  }, 1000);

  handleFetchArticles = () => {
    const { page, value } = this.state;
    const { slug } = this.props;
    api
      .fetchArticles(slug, value, page)
      .then(newArticles => {
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
    console.log(article, 'article here');
    this.setState(
      prevState => ({
        articles: [article, ...prevState.articles]
      }),
      () => console.log(this.state, 'NEW ARTICLE LIST')
    );
  };
  resetToFirstPage = () => {
    this.setState(
      {
        page: 1,
        hasAllArticles: false
      },
      this.handleFetchArticles
    );
  };
}

export default AllArticles;