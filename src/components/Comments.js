import React, { Component } from 'react';
import formatDate from '../Utils/utilFunctions';
import Comment from './Comment';
import AddComment from './AddComment';
import * as api from '../Utils/fetchData';


class Comments extends Component {
    state = {
        comments: []
    }
    render() {
        const { comments } = this.state;
        const { articleid, user } = this.props;

        return (
        
        <div>
            <AddComment 
                articleid={articleid} 
                getComment={this.getComment} 
                user={user}
            />
            <ul>
                {comments.map(comment => <li key={comment.comment_id}>
                    <p>{comment.body}</p>
                    <p>published by: {user.name}</p>
                    <p>left: {formatDate(comment.created_at)}</p>
                    <Comment 
                        votes={comment.votes} 
                        articleid={articleid}
                        commentid={comment.comment_id}
                        deleteComment={this.deleteComment}
                    />
                </li>)}
            </ul>
        </div>
        );
    }
    componentDidMount = () => {
        this.handleFetchComments();
    }
    handleFetchComments = () => {
        const { articleid } = this.props;
        api.fetchComments(articleid)
            .then(comments => {
                this.setState({
                    comments
                })
            })
    }
    getComment = (comment) => {
        this.setState((prevState) => {
            return { comments: [comment, ...prevState.comments] };
        })

    }
    deleteComment = (commentid) => {
    
        this.setState((prevState) => ({
            comments: prevState.comments.filter(({comment_id}) => comment_id !== commentid)
        }), () => {
            console.log('state after delete', this.state)
        })
    }
}

export default Comments;


