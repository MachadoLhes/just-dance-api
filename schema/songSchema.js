const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

const songSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Song name is required']
  },
  artist: {
    type: String,
    required: [true, 'Artist is required']
  },
  year: {
    type: Number,
    required: [true, 'Song year is required']
  },
  mode: {
    type: String,
    required: [true, 'Song mode is required']
  },
  game: {
    type: String,
    required: [true, 'Game is required']
  },
  unlimited: {
    type: Boolean,
    required: [true, 'Unlimited is required']
  },
})

module.exports = songSchema