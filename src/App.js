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
import Login from './components/Login';
import * as api from './Utils/fetchData';


class App extends Component {
  state = {
    article_id: '',
    username: ''
  };
  render() {
    return <div className="App">
        
          <Header />
          <Navbar />
      <Login login={this.login} user={this.state.username}>
          <Router>
            <Home path="/" />
            <AllArticles path="/articles" // getArticleId={this.getArticleId}
             />

            <Article path="/articles/:articleid" />

            <Topics path="/topics" />
            <AllArticles path="/topics/:slug"  />
            <Users path="/users" />
            <User path="/users/user" />
          </Router>
      </Login>
    </div>;
  }
 
  
  login = user => {
    console.log(user)
    api.fetchUser(user)
    .then(user => {
      this.setState({
        username: user.username
      }
      )}
    )}
}

export default App;



