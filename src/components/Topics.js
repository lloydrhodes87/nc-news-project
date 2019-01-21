import React from 'react';
import AllTopics from './AllTopics';

const Topics = () => {
    return (
        <div>
            <h1>Topics</h1>
            <form>
                <label htmlFor="slug">Slug</label>
                <input type="text" id="slug"></input>
                <label htmlFor="description">Description</label>
                <input type="text" id="desription"></input>
                <select id="filter">
                    <option id="sort_by">Sort By</option>
                    <option id="limit">Limit</option>
                    <option id="page">Page</option>
                    <option id="sort_asc">Sort Ascending</option>
                    <option id="sort_desc">Sort Descending</option>
                </select>
                <button type="submit">Add Topic</button>
            </form>
            <AllTopics />
        </div>
    );
};

export default Topics;