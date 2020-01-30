const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 3
    },
    name: String,
    passwordhash: {
        type: String,
        required: true
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog' 
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returned) => {
        returned.id = returned._id
        delete returned._id
        delete returned.__v
        delete returned.passwordhash
    }
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema) 