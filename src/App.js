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
import '../src/Styles/err.css';
import '../src/Styles/home.css';
import '../src/Styles/login.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import { Router } from '@reach/router';
import AllArticles from './components/AllArticles';
import Article from './components/Article';
import AllTopics from './components/AllTopics';
import Users from './components/Users';
import Home from './components/Home';
import Login from './components/Login';
import * as api from './Utils/fetchData';
import Logout from './components/Logout';
import LoggedIn from './components/LoggedIn';
import Loader from './components/Loader';

class App extends Component {
  state = {
    article_id: '',
    user: '',
    loggedIn: false,
    users: [],
    isLoading: true
  };
  render() {
    const { loggedIn, isLoading, user, users } = this.state;
    if (isLoading)
      return <Loader type="Bars" color="#somecolor" height={80} width={80} />;
    return (
      <div className="App">
        <div className="loggedTopArea">
          <Logout logout={this.handleLogOut} loggedIn={loggedIn} />
          {loggedIn && <LoggedIn user={user} />}
        </div>

        <Header />
        <Navbar />

        <Login login={this.login} user={user} users={users}>
          <Router>
            <Home path="/" users={users} />
            <AllArticles path="/articles" user={user} users={users} />

            <Article
              path="/articles/:articleid"
              user={user}
              getArticleId={this.getArticleId}
              users={users}
            />

            <AllTopics path="/topics" />
            <AllArticles path="/topics/:slug" user={user} users={users} />

            <Users path="/users" />
          </Router>
        </Login>
      </div>
    );
  }

  componentDidMount = () => {
    this.fetchUsers();
    const stored = localStorage.getItem('user');
    if (stored) {
      const { user, loggedIn } = JSON.parse(stored);
      this.setState({
        user,
        loggedIn
      });
    }
  };

  login = user => {
    api.fetchUser(user).then(user => {
      this.setState(
        prevState => ({
          user,
          loggedIn: true
        }),
        () => {
          const state = this.state;
          localStorage.setItem('user', JSON.stringify(state));
        }
      );
    });
  };
  handleLogOut = () => {
    localStorage.clear();
    this.setState({
      user: '',
      loggedIn: false
    });
  };

  fetchUsers = () => {
    api.fetchAllUsers().then(users => {
      this.setState(() => ({ users: users, isLoading: false }));
    });
  };
}

export default App;
