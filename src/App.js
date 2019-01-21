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
import AllArticlesByTopic from './components/AllArticlesByTopic';
import User from './components/User';
import Login from './Login';


class App extends Component {
  state = {
    article_id: ''
  }
  render() {
    return (
    <div className="App">
      <Login />
      <Header />
      <Navbar />
      <Router>
        <Home path="/" />
        <AllArticles path="/articles" getArticleId={this.getArticleId} />
      
        <Article path="/articles/:articleid" articleId={this.articleId} />
        <AllArticlesByTopic path="topic/articles" />

        <Topics path="/topics" />
        <Users path="/users" />
        <User path="/users/user" />
      </Router>
    </div>
    );
  }
  getArticleId = (article_id) => {
    this.setState({
      article_id
    })
  }
}

export default App;



