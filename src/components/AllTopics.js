import React from 'react';
import { Link } from '@reach/router';


const AllTopics = () => {
    return <div>
        <ul>
          <li>
            <Link to="/topic/articles">All Topic links to articles by topic</Link>
          </li>
            <li>
                <Link to="/topic/articles">All topics</Link>
            </li>
            <li>
                <Link to="/topic/articles">All topics</Link>
            </li>
            <li>
                <Link to="/topic/articles">All topics</Link>
            </li>
            <li>
                <Link to="/topic/articles">All topics</Link>
            </li>
        </ul>
      </div>;
};

export default AllTopics;