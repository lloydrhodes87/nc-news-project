import React, { Component } from 'react';
import { Link, navigate } from '@reach/router';
import Comments from './Comments';
import * as api from '../Utils/fetchData';
import Loader from './Loader';
import formatDate from '../Utils/utilFunctions';
import Voter from './Voter';
import Err from './Err';

class Article extends Component {
  state = {
    toggleComments: false,
    article: [],
    isLoading: true,
    hasError: false,
    error: ''
  };
  render() {
    const { isLoading } = this.state;
    const { hasError, error, comments, toggleComments } = this.state;
    if (hasError) return <Err error={error} />;
    if (isLoading) return <Loader />;

    const { body, title, author, created_at, votes } = this.state.article;
    const { articleid, user, users } = this.props;
    const userObject = users.filter(user => user.username === author);
    const { avatar_url } = userObject[0];

    return (
      <div>
        <h2 className="articleHeading">Article</h2>
        <div className="individualArticle">
          <h3 className="articleTitle singleArticleTitle">{title}</h3>
          <p className="singleArticleP">{body}</p>
          <img className="avatarInArticles" src={avatar_url} alt="avatar" />
          <p>by {author}</p>
          <p>published: {formatDate(created_at)}</p>
          <Voter votes={votes} articleid={articleid} />
        </div>
        <div className="commentNavigation">
          <button type="submit">
            <Link id="link" to="/articles">
              Back
            </Link>
          </button>
          <button
            type="submit"
            disabled={user.username !== author}
            onClick={this.handleDeleteArticle}
          >
            Delete
          </button>
          <button onClick={this.handleToggleComments} type="submit">
            comments
          </button>
          {toggleComments && (
            <Comments comments={comments} articleid={articleid} user={user} />
          )}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.handleFetchArticle();
  }

  handleToggleComments = () => {
    this.setState(prevState => ({
      toggleComments: !prevState.toggleComments
    }));
  };
  handleFetchArticle = () => {
    const { articleid } = this.props;
    api.fetchArticle(articleid).then(article => {
      const singleArticle = article.article;
      this.setState({
        article: singleArticle,
        isLoading: false
      });
    });
  };

  handleDeleteArticle = () => {
    const articleid = this.state.article.article_id;
    api
      .deleteData(articleid)
      .then(() => {
        navigate('/articles');
      })
      .catch(err => {
        this.setState({
          hasError: true,
          error: err
        });
      });
  };
}

export default Article;
