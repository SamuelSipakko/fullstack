const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "author's name must be defined"],
    unique: [true, "author's name must be unique"],
    minlength: [4, "author's name must be at least 4 characters long"],
  },
  born: Number,
  bookCount: {
    type: Number,
    required: true
  }
})

schema.plugin(uniqueValidator)

module.exports = mongoose.model('Author', schema)