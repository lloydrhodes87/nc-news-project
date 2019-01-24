import React, { Component } from 'react';
import './App.css';
import '../src/Styles/users.css';
import '../src/Styles/navbar.css';
import '../src/Styles/logout.css';
import '../src/Styles/topicsTop.css';
import '../src/Styles/topicMain.css';
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
        <div className="loggedTopArea">
          <Logout logout={this.handleLogOut} />
          {this.state.loggedIn && <LoggedIn user={this.state.user} />}
          {console.log(this.state.loggedIn, 'am i logged in on ount')}
        </div>

        <Header />
        <Navbar />

        <Login login={this.login} user={this.state.user}>
          <Router>
            <Home path="/" />
            <AllArticles path="/articles" user={this.state.user} />

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
    const stored = localStorage.getItem('user');
    console.log(stored, 'stored state')
    const {user, loggedIn} = JSON.parse(stored);
    this.setState({
      user,
      loggedIn
    })
    
  }
  
  login = user => {
    api.fetchUser(user)
    .then(user => {
      
      this.setState((prevState) => ({
        user,
        loggedIn: true
      }), () => {
        console.log(this.state)
        const state = this.state
          localStorage.setItem('user', JSON.stringify(state))
      })
        
      
    }
      
    )}
  handleLogOut = () => {
    localStorage.clear();
    this.setState({
      user: '',
      loggedIn: false
    }, () => { 
      console.log(this.state)
    })
  };
}

export default App;



