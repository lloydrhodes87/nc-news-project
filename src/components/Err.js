import React from 'react';
import { Link } from '@reach/router';

const Err = props => {
  const err = props.error.response;
  console.log(err);
  return (
    <div className="errorBox">
      <h1>Whoops!</h1>
      <p>{err.data.msg}</p>
      <p>{err.status}</p>
      <p>{props.message}</p>
      <button>
        <Link className="link" to="/">
          Go Home
        </Link>
      </button>
    </div>
  );
};

export default Err;
