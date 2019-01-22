import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import { Router } from '@reach/router'
import AllArticles from './components/AllArticles';
import Article from './components/Article';
import Topics from './components/Topics';
import Users from './components/Users';
import Home from './components/Home';
import User from './components/User';
import Login from './Login';


class App extends Component {
  state = {
    article_id: '',
    sort_by: ''
  }
  render() {
    return <div className="App">
        <Login />
        <Header />
        <Navbar />
        <Router>
          <Home path="/" />
          <AllArticles path={`/articles`} getArticleId={this.getArticleId} getSearchValue={this.getSearchValue} />

          <Article path="/articles/:articleid" articleId={this.articleId} />

          <Topics path="/topics" />
          <AllArticles path="topic/:slug" getArticleId={this.getArticleId} getSearchValue={this.getSearchValue} />
          <Users path="/users" />
          <User path="/users/user" />
        </Router>
      </div>;
  }
  getArticleId = (article_id) => {
    this.setState({
      article_id
    })
  }
  getSearchValue = (value) => {
    this.setState({
      sort_by: value
    }, () => {
      console.log(this.state, 'state after get value')
    })
  }
}

export default App;



