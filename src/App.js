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
import Logout from './components/Logout';



class App extends Component {
  state = {
    article_id: '',
    user: '',
  };
  render() {
    return <div className="App">
        <Logout logout={this.handleLogOut} />
        <Header />
        <Navbar />

        <Login login={this.login} user={this.state.user}>
          <Router>
            <Home path="/" />
            <AllArticles path="/articles" user={this.state.user}  />

            <Article path="/articles/:articleid" user={this.state.user} getArticleId={this.getArticleId} />

            <Topics path="/topics" />
            <AllArticles path="/topics/:slug" user={this.state.user} />

            <Users path="/users" />
            <User path="/users/user" />
          </Router>
        </Login>
      </div>;
  }
  
  componentDidMount = () => {
    const stored = sessionStorage.getItem('user');
    const user = JSON.parse(stored);
    this.setState({
      user
    })
    
  }
  
  login = user => {
    api.fetchUser(user)
    .then(user => {
      
      this.setState({
        user
      })
        sessionStorage.setItem('user', JSON.stringify(user))
      
    }
      
    )}
  handleLogOut = () => {
    sessionStorage.clear();
    this.setState({
      user: ''
    }, () => { 
      console.log(this.state)
    })
  };
}

export default App;



