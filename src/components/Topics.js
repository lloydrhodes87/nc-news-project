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
                <form onSubmit={this.onSubmit} className="postTopicContainer">
                        <div className="postTopicTop">
                            <label htmlFor="slug"></label>
                            <input type="text" value={this.state.slug} onChange={this.handleChange} id="slug" placeholder="Topic"></input>
                            <button type="submit">Add Topic</button>
                        </div>
                        
                        <label htmlFor="description"></label>
                        <textarea type="text" value={this.state.description} onChange={this.handleChange} placeholder="Description" id="description"></textarea>
                        
                    </form>
                    
                </div>
            
        );
    }
    handleChange = (event) => {
        const { value, id } = event.target;
        this.setState({
            [id]: value
        })
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