const mongoose = require('mongoose')

const CalendarSchema = new mongoose.Schema({
  calendar: {
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
  },
  date: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Calendar', CalendarSchema)