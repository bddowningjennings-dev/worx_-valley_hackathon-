const
  mongoose = require('mongoose'),
  Task = require('../models/task');

class TaskController {
  index(req, res) {
    Task.find({}, (err, tasks) => err ? res.json(err) : res.json(tasks))
  }
  create(req, res) {
    Task.create(req.body, (err, task) => err ? res.json(err) : res.json(task))
  }
  show(req, res) {
    Task.find({ _id: req.params.id }, (err, task) => err ? res.json(err) : res.json(task))
  }
  update(req, res) {
    Task.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, (err, task) => err ? res.json(err) : res.json(task))
  }
  destroy(req, res) {
    Task.findByIdAndRemove(req.params.id, (err, task) => err ? res.json(err) : res.json(task))
  }
  search(req, res) {
    if (req.query.filter) {
      let filter = JSON.parse(req.query.filter)
      let tag = "$in"
      for (let each in filter.tags) {
        tag = each;
      }
      filter = {
        ...filter,
        tags: {[tag]: filter.tags[tag].map(each => new RegExp(each))}
      }
      return Task.find(filter, (err, cards) =>
      err ? res.json(err) : res.json(cards))
    }
    return Task.find(req.query, (err, cards) =>
      err ? res.json(err) : res.json(cards))
  }
}

module.exports = new TaskController()