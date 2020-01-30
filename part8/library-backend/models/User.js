const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'username must be defined'],
    unique: [true, 'username must be unique'],
    minlength: [3, 'username must be at least 3 characters long'],
  },
  favoriteGenre: {
      type: String,
      required: [true, 'favorite genre must be defined'],
  }
})

module.exports = mongoose.model('User', schema)