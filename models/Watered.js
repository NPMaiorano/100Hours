const mongoose = require('mongoose')

const wateredSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Watered', wateredSchema)
