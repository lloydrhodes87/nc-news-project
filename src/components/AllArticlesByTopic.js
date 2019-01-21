import React from 'react';
import { Link } from '@reach/router';

const AllArticlesByTopic = () => {
    return <div>
        <h1>All articles by topic</h1>
        <p>
          <Link to="/articles/article">Articles</Link>
        </p>
        <p>Articles</p>
        <p>Articles</p>
        <p>Articles</p>
      </div>;
};

export default AllArticlesByTopic;