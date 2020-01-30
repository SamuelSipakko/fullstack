const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'title must be defined'],
    unique: [true, 'title must be unique'],
    minlength: [2, 'title must be at least 2 characters long'],
  },
  published: {
    type: Number
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  genres: [
    { type: String }
  ]
})


schema.plugin(uniqueValidator)

module.exports = mongoose.model('Book', schema)