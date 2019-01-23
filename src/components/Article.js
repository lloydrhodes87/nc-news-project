import React, { Component } from 'react';
import { Link, navigate } from '@reach/router';
import Comments from './Comments';
import * as api from '../Utils/fetchData';
import Loader from './Loader';
import formatDate from '../Utils/utilFunctions';
import Voter from './Voter';


class Article extends Component {
    
    state = {
        toggleComments: false,
        article: [],
        isLoading: true,
        
    }
    render() {
        
        const { isLoading } = this.state;
        const { body, title, author, created_at, votes } = this.state.article
        if (isLoading) return <Loader />;

        const {articleid, user } = this.props;
       
        return <div>
            <h2>{title}</h2>
            <p>{body}</p>
            <p>by {author}</p>
            <p>published: {formatDate(created_at)}</p>
            <Voter votes={votes} articleid={articleid} />
            <button type="submit">
              <Link to="/articles">Back</Link>
            </button>
            <button type="submit" onClick={this.handleDeleteArticle} >
            {
                 // disabled={user.username !== author}
            }
              Delete
            </button>
            <button onClick={this.handleToggleComments} type="submit">
              comments
            </button>

            {this.state.toggleComments && <Comments comments={this.state.comments} articleid={articleid} user={user} />}
          </div>;
    }
  
    componentDidMount() {
       this.handleFetchArticle();  
    }
   
   
    
    handleToggleComments = () => {
        this.setState((prevState) => ({
            toggleComments: !prevState.toggleComments
        }))
    }
    handleFetchArticle = () => {
        const { articleid } = this.props;
        api.fetchArticle(articleid)
        .then(article => {
            const singleArticle = article.article
            this.setState({
                article: singleArticle,
                isLoading: false,
            })
        })
    }
    passArticleIdUp = () => {
        const { articleid } = this.props;
        navigate(`/articles`, {state: { articleid }} );
    }
    handleDeleteArticle = () => {
        const { articleid } = this.props;
        api.deleteData(articleid)
        .then(() => {
            this.passArticleIdUp()
        })
    }
  
}

export default Article;


