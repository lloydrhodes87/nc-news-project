import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import { Router } from '@reach/router'
import AllArticles from './components/AllArticles';
import Article from './components/Article';
import AllTopics from './components/AllTopics';
import Users from './components/Users';
import Home from './components/Home';
import User from './components/User';
import Login from './components/Login';
import * as api from './Utils/fetchData';
import Logout from './components/Logout';
import LoggedIn from './components/LoggedIn';




class App extends Component {
  state = {
    article_id: '',
    user: '',
    loggedIn: false
  };
  render() {
    return <div className="App">
        <Logout logout={this.handleLogOut} />
        {this.state.loggedIn && <LoggedIn user={this.state.user} />}
        <Header />
        <Navbar />
        
        <Login login={this.login} user={this.state.user}>
        
          <Router>
            <Home path="/" />
            <AllArticles path="/articles" user={this.state.user}  />

            <Article path="/articles/:articleid" user={this.state.user} getArticleId={this.getArticleId} />

            <AllTopics path="/topics" />
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
      
      this.setState((prevState) => ({
        user,
        loggedIn: true
      }))
        sessionStorage.setItem('user', JSON.stringify(user))
      
    }
      
    )}
  handleLogOut = () => {
    sessionStorage.clear();
    this.setState({
      user: '',
      loggedIn: false
    }, () => { 
      console.log(this.state)
    })
  };
}

export default App;



