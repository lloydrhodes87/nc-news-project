import React from 'react';
import { Link } from '@reach/router';

const NoPage = () => {
  return (
    <div className="errorBox">
      <h1>Whoops!</h1>
      <p>This page doesn't exist</p>
      <button>
        <Link className="link" to="/">
          Go Home
        </Link>
      </button>
    </div>
  );
};

export default NoPage;
