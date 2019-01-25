import RecentArticles from './RecentArticles';
import Trending from './Trending';

import React from 'react';

const Home = props => {
  return (
    <div>
      <h2 className="homeTitle">New here?</h2>
      <h3 className="homeTitle">Head over to users for login credentials</h3>
      <div className="home">
        <RecentArticles users={props.users} />
        <Trending users={props.users} />
      </div>
    </div>
  );
};

export default Home;
