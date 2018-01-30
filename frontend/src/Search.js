import React, { Component } from 'react';
import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    }
  }
  submitJson = (state) => {
    const inclusive = state.inclusive ? "$in" : "$all";
    let query = {
      [inclusive]: state.tags.length < 1 ? [/.*/] : state.tags.split(',').map(word => 
      `^${word.trim()}$`)
    }
    return JSON.stringify({
      tags: query
    })
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleSubmit = (event) => {
    let inclusive = false
    let tags = this.state.search
    if (this.state.search.match(/^\$in:.*/)) {
      inclusive = true
      tags = tags.slice(4)
    }
    let query = {
      tags,
      inclusive
    };
    const URL = 'http://18.144.16.205/tasks/search?filter=';
    fetch(URL + this.submitJson(query), {
      headers: {
        'Content-Type': 'application/javascript'
      }
    })
    .then(data => {
      return data.json();
    })
    .then(tasks => {
      this.props.filterTasks(tasks)
    })
    .catch(err=>console.log(err))
    event.preventDefault();
  }
  render() {
    return (
      <div className="Search" id="search-form">
        <div className="search-left">W O R X</div>
        <div className="search-mid">
          <form id="search-form"
            onSubmit={this.handleSubmit}
            name="search-form">
            <input
              id="search-input"
              type="text"
              name="search"
              value={this.state.search}
              onChange={this.handleChange}
              placeholder="S E A R C H" />
            {/* <input
              type="checkbox"
              id="inclusive"
              name="inclusive"
              onChange={this.handleCheck} /> */}
          </form>
        </div>
      </div>
    )
  }
}
export default Search;