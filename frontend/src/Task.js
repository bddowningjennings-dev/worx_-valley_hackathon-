import React, { Component } from 'react';
import marked from 'marked'
import 'font-awesome/css/font-awesome.min.css';
import './Task.css';

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      card: this.props.card,
      title: this.props.card.title,
      description: this.props.card.description,
      priority: this.props.card.priority,
      tags: this.props.card.tags,
      tags_string: this.props.card.tags.join(', ')
    }
  }
  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }
  handleDelete = (event) => {
    let id = event.target.id
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'delete'
    })
    .then(data => data.json())
    .then(task => this.props.removeTask(task._id))
    .catch(err=>console.log(err))
  }
  JSONbody = (state) => {
    return JSON.stringify({
      ...state,
      title: state.title || "Task Title",
    })
  }
  handleClick = (event) => {
    let id = "task-" + event.target.id.slice(6)
    let thing = document.getElementById(id).children
    for (let i of thing) {
      i.classList.toggle('hidden')
    }
    document.getElementById(id).classList.toggle('no_padding')
  }
  handleTags = (event) => {
    this.setState({tags_string: event.target.value})
  }
  handleSubmit = (event) => {
    event.preventDefault();
    let id = this.state.card._id
    fetch(`http://localhost:5000/tasks/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'put',
      body: this.JSONbody({
        ...this.state.card,
        title: this.state.title,
        description: this.state.description,
        priority: this.state.priority,
        tags: this.state.tags_string.length > 1 ? this.state.tags_string.split(',').map(tag => tag.toLowerCase().trim()) : []
      }),
    })
    .then(data => data.json())
    .then(task => {
      this.setState({
        ...this.state,
        card: {
          ...this.state.card,
          title: this.state.title,
          description: this.state.description,
          priority: this.state.priority,
          tags: this.state.tags_string.length > 1 ? this.state.tags_string.split(',').map(tag => tag.toLowerCase().trim()) : []
        }
      })
      let id = "task-" + this.state.card._id
      let thing = document.getElementById(id).children
      for (let i of thing) {
        i.classList.toggle('hidden')
      }
      document.getElementById(id).classList.toggle('no_padding')
      this.props.updateTasks(this.state.card._id)
    })
    .catch(err=>console.log(err))
  }
  render() {
    return (
      <div className="task" id={"task-" + this.state.card._id}>
        <section className="task-front" id={"front-" + this.state.card._id}>
          <div className="task-top">
            <div className="top-left"></div>
            <div className="top-mid">
              <button
                className="title-button"
                id={"title-" + this.state.card._id}
                onClick={this.handleClick}>
                {this.state.card.title}
              </button>
            </div>
            <div className="top-right">
              {this.state.card.tags.map( (tag, i) => {
                return (
                  <button key={i} className="tag"><span className="tag">{`@ ${tag}`}</span></button>)})}
            </div>
            <button className="task-delete"
              onClick={this.handleDelete}
              id={this.state.card._id}>
                <i className="fa fa-trash-o" aria-hidden="true"></i>
              </button>
          </div>
          <div className="description" dangerouslySetInnerHTML={{__html: marked(this.state.card.description)}}></div>
        </section>
        <form
          name="update-form"
          className="task-back hidden"
          onSubmit={this.handleSubmit}>
          <div className="task-top">
            <label>Title:          
              <input
                name="title"
                type="text"
                placeholder={this.state.title}
                value={this.state.title}
                onChange={this.handleChange} />
              </label>
              <label>Tags:
              <input
                type="text"
                placeholder={this.state.tags_string}
                value={this.state.tags_string}
                onChange={this.handleTags} />
              </label>
            <button className="task-update"
              onClick={this.handleSubmit}
              id={this.state.card._id}>
                Update
            </button>
          </div>
          <textarea
            name="description"
            className="description"
            placeholder={this.state.description}
            value={this.state.description}
            onChange={this.handleChange} />            
        </form>
      </div>
    )
  }
}

export default Task;