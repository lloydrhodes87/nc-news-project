import RecentArticles from './RecentArticles';
import Trending from './Trending';

import React from 'react';

const Home = (props) => {
    console.log(props, 'in home, before')
    return <div>
        {console.log(props.users, 'in home')}
        <h2 className="homeTitle">New here?</h2>
        <h3 className="homeTitle">Head over to users for login credentials</h3>
        <div className="home">
        {console.log(props)}
            <RecentArticles users={props.users}/>
            <Trending users={props.users}/>
        </div>
      </div>;
};

export default Home;