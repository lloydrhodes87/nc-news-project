import React, { Component } from 'react';
import axios from 'axios';


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
        this.addTopicCall();
        this.setState({
            slug: '',
            description: ''
        })
    }

    addTopicCall = async () => {
        const topic = {
            slug: this.state.slug,
            description: this.state.description
        }
        await axios.post(`https://lloyd-news.herokuapp.com/api/topics`, topic)
        .then(({data}) => {
            this.props.getTopic(data.topic)
        })
        
    }


}

export default Topics;