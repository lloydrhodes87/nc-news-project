import React, { Component } from 'react';
import { Link } from '@reach/router';
import Comments from './Comments';
import * as api from '../Utils/fetchData';
import Loader from './Loader';
import formatDate from '../Utils/utilFunctions';

class Article extends Component {
    
    state = {
        toggleComments: false,
        article: [],
        isLoading: true,
        
    }
    render() {
        
        const { isLoading } = this.state;
        const { body, title, author, created_at } = this.state.article
        if (isLoading) return <Loader />;

        const {articleid, user } = this.props;
       
        return <div>
            <h2>{title}</h2>
            <p>{body}</p>
            <p>by {author}</p>
            <p>published: {formatDate(created_at)}</p>
            <button type="submit">
              <Link to="/articles">Back</Link>
            </button>
            <button onClick={this.handleToggleComments} type="submit">
              comments
            </button>
            {this.state.toggleComments && 
                <Comments 
                    comments={this.state.comments} 
                    articleid={articleid}
                    user={user}
                />}
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
  
}

export default Article;


