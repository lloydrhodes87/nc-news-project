import React from 'react';
import formatDate from '../Utils/utilFunctions';
import Comment from './Comment';
import AddComment from './AddComment';



const Comments = (props) => {
    const { comments } = props;
    console.log(comments)
    const { articleid, getComment } = props
    return <div>
        <AddComment articleid={articleid} getComment={getComment} />
        <ul>
          {comments.map(comment => <li key={comment.comment_id}>
              <p>{comment.body}</p>
              <p>published by: {comment.author}</p>
              <p>left: {formatDate(comment.created_at)}</p>
              <Comment votes={comment.votes} />
            </li>)}
        </ul>
      </div>;
};

export default Comments;