import React, { Component } from 'react';
import './App.css';
import '../src/Styles/users.css';
import '../src/Styles/navbar.css';
import '../src/Styles/logout.css';
import '../src/Styles/topicsTop.css';
import '../src/Styles/topicMain.css';
import '../src/Styles/articles.css';
import '../src/Styles/article.css';
import '../src/Styles/comments.css';
import '../src/Styles/newComment.css';
import '../src/Styles/home.css';
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
    loggedIn: false,
    users: []
  };
  render() {
    return <div className="App">
        <div className="loggedTopArea">
          <Logout logout={this.handleLogOut} />
          {this.state.loggedIn && <LoggedIn user={this.state.user} />}
        </div>

        <Header />
        <Navbar />

      <Login login={this.login} user={this.state.user} users={this.state.users}>
          <Router>
          <Home path="/" users={this.state.users}/>
            <AllArticles path="/articles" user={this.state.user} users={this.state.users} />

          <Article path="/articles/:articleid" user={this.state.user} getArticleId={this.getArticleId} users={this.state.users} />

            <AllTopics path="/topics" />
          <AllArticles path="/topics/:slug" user={this.state.user} users={this.state.users}  />

            <Users path="/users" />
            <User path="/users/user" />
          </Router>
        </Login>
      </div>;
  }
  
  componentDidMount = () => {
    console.log('component mounted')
    this.fetchUsers();
    const stored = localStorage.getItem('user');
    if (stored) {
    const {user, loggedIn} = JSON.parse(stored);
    this.setState({
      user,
      loggedIn
    })
  }
    
  }
  
  login = user => {
    console.log(user, 'user in app js')
    api.fetchUser(user)
    .then(user => {
      this.setState((prevState) => ({
        user,
        loggedIn: true
      }), () => {
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
    })
  };

  fetchUsers = () => {
    console.log('fetching users');
    api.fetchAllUsers().then(users => {
      console.log(users, 'users after call')
      this.setState(() => ({
        users: users
      }));
    }, console.log(this.state, 'setting state after user call'));
  };
  

}

export default App;



