import React, { Component } from 'react';

class AddArticle extends Component {
    render() {
        return <div>
            <form>
              <label htmlFor="title">Article Title:</label>
              <input id="title" type="text" />
              <label htmlFor="username">Username:</label>
              <input id="username" type="text" />
              <label htmlFor="body">Body:</label>
              <input id="body" type="text"></input>
              <label for="filter">Filter:</label>
              <select id="filter">
                <option id="sort_by">Sort By</option>
                <option id="limit">Limit</option>
                <option id="page">Page</option>
                <option id="sort_asc">Sort Ascending</option>
                <option id="sort_desc">Sort Descending</option>
              </select>
            </form>
          </div>;
    }
}

export default AddArticle;