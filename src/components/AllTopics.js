
import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../Utils/fetchData';
import Loader from './Loader';
import Topics from './Topics';


class AllTopics extends Component {
  state = {
    isLoading: true,
    topics: []
  };
  render() {
    const { isLoading, topics } = this.state;
    if (isLoading)
      return <Loader type="Bars" color="#somecolor" height={80} width={80} />;
    return (

      <div>
        <h2 className="topicHeading"> Topics</h2>
        <Topics getTopic={this.getTopic} />
        <ul>
          {topics.map(({ slug, description }) => {
            return (
              <li className="panel" key={slug}>
                <h3>{slug[0].toUpperCase() + slug.substring(1)} </h3>
                <p>{description}</p>
                <Link id="linkToArticles" to={`/topics/${slug}`}>View Articles</Link>
              </li>
            );
          })}
        </ul>
        
      </div>
    );
  }
  componentDidMount = () => {
    this.fetchTopics();
  };
 
  fetchTopics = () => {
    api.fetchTopics().then(topics => {
      this.setState(
        {
          topics,
          isLoading: false
        }
      );
    });
  };


  getTopic = (topic) => {
    console.log(topic, 'in all topics');
    console.log(this.state.topics)
    this.setState(prevState => {
      
      return { topics: [topic, ...prevState.topics] };
    })
  }

}

export default AllTopics;