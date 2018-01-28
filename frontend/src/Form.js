import React, { Component } from 'react';
import './Form.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      priority: "",
      tags: [],
    }
  }
  JSONbody = (state) => {
    return JSON.stringify({
      ...state,
      title: state.title || "Task Title",
      tags: state.tags.length > 1 ? state.tags.split(',').map(tag => tag.toLowerCase().trim()) : []
    })
  }
  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }
  handleCancel = (event) => {
    event.preventDefault()
    document.getElementById('main-form').classList.toggle('hidden')
    document.getElementById('main-form').classList.toggle('no_margin')
  }
  handleSubmit = (event) => {
    fetch('http://localhost:5000/tasks', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: this.JSONbody(this.state),
    })
    .then(data => data.json())
    .then(task => {
      this.props.addTask(task)
      document.getElementById('main-form').classList.toggle('hidden')
      document.getElementById('main-form').classList.toggle('no_margin')
    })
    .catch(err=>console.log(err))
    this.setState({
      title: "",
      description: "",
      priority: "",
      tags: [],
    })
    event.preventDefault();
  }
  render() {
    return (
      <form name="main-form" id="main-form" className="hidden no_margin" onSubmit={this.handleSubmit}>
        <div className="inputs">
          <input type="text"
            placeholder="Title"
            name="title"
            onChange = {this.handleChange}
            value={this.state.title} />

          <input type="text"
            placeholder="Tags"
            name="tags"
            onChange = {this.handleChange}
            value={this.state.tags} />
            
          <textarea
            className='form-description'
            placeholder="Description/Notes"
            name="description"
            onChange = {this.handleChange}
            value={this.state.description} />
{/* 
          <input type="text"
            placeholder="Priority"
            name="priority"
            onChange = {this.handleChange}
            value={this.state.priority} /> */}
        </div>
        <button id="main-submit" type="submit">Submit</button>
        <button onClick={this.handleCancel}>Cancel</button>
      </form>
    )
  }
}

export default Form;