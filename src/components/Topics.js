import React, { Component } from 'react';
import AllTopics from './AllTopics';


class Topics extends Component {
    state = { 
        slug: '',
        description: '', 
    }
    render() {
        return (
            
                <div>
                    <h1>Topics</h1>
                    <form onSubmit={this.onSubmit}>
                        <label htmlFor="slug">Slug</label>
                        <input type="text" value={this.state.slug} onChange={this.handleChange} id="slug"></input>
                        <label htmlFor="description">Description</label>
                        <input type="text" value={this.state.description} onChange={this.handleChange} id="description"></input>
                        <button type="submit">Add Topic</button>
                    </form>
                    <AllTopics />
                </div>
            
        );
    }
    handleChange = (event) => {
        const { value, id } = event.target;
        this.setState({
            [id]: value
        }, console.log(this.state))
    }
    onSubmit = (event) => {
        event.preventDefault();
        this.addTopic()
        this.setState({
            slug: '',
            description: ''
        })
    }
    // addTopic = () => {
    //     const { slug } = this.state;
    //     return fetch(`https://lloyd-news.herokuapp.com/api/topics/${slug}/articles`, {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             slug: this.state.slug,
    //             description: this.state.description
    //         })
    //     }).then(res => res.json())
    //         .then(({ topic }) => {
    //             console.log(topic, 'adding topic')
    //         })


    // }
}

export default Topics;