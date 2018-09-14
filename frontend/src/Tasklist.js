import React, { Component } from 'react';
import Search from './Search';
import Form from './Form';
import Task from './Task';
import './Tasklist.css';

class Tasklist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    }
  }
  removeTask = (_id) => {
    this.setState({
      ...this.state,
      tasks: this.state.tasks.filter(task => task._id !== _id)
    })
  }
  addTask = (task) => {
    this.setState({ ...this.state, tasks: [task, ...this.state.tasks]})
  }
  updateTasks = (id) => {
    let task = this.state.tasks.filter(e => e._id === id)
    let others = this.state.tasks.filter(e => e._id !== id)
    this.setState({
      ...this.state,
      tasks: [...task, ...others]
    })
  }
  filterTasks = (tasks) => {
    this.setState({tasks: [...tasks]})
  }
  componentDidMount() {
    fetch('/tasks')
    .then(res => res.json())
    .then(tasks => {
      this.setState({
        tasks: tasks.sort((a,b) => {
          let a_date = new Date(a.updatedAt)
          let b_date = new Date(b.updatedAt)
          return b_date - a_date
        })
      })
    })
    .catch(e => console.log(e))
  }
  render() {
    return (
      <div id="container">
        <div id="tasklist">
          <Search filterTasks={this.filterTasks} />
          <Form addTask={this.addTask} />
          {this.state.tasks.map((element) => 
            <Task
              key={element._id}
              card={element}
              removeTask={this.removeTask}
              updateTasks={this.updateTasks}  
              />)}
        </div>
        <div className="counter">
            {this.state.tasks.length}
        </div>
      </div>
    )
  }
}

export default Tasklist;