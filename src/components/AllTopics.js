import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../Utils/fetchData';
import Loader from './Loader';


class AllTopics extends Component {
    state = {
        isLoading: true,
        topics: []
    }
    render() {
        const { isLoading } = this.state;
        const { topics } = this.state;
        if (isLoading) return <Loader type="Bars" color="#somecolor" height={80} width={80} />;
        return (
             <div>
            <ul>
                {topics.map(({slug, description}) => {
                    return <li key={slug}>
                        <p>Topic: {slug} </p>
                        <p>{description}</p>
                        <Link to={`/topic/${slug}`}>View Articles</Link>
                    </li>
                })}
                
            </ul>
        </div>
        );
    }
    componentDidMount = () => {
        this.fetchTopics();
    }
    fetchTopics = () => {
        api.fetchTopics()
            .then(topics => {
                this.setState({
                    topics,
                    isLoading: false
                }, () => console.log(this.state))
            })
    }

}

export default AllTopics;