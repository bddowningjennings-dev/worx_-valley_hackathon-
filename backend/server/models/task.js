const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  tags: {
    type: [String]
  }
}, { timestamps: true })

module.exports = mongoose.model('Task', TaskSchema)