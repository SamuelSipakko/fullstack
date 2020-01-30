const bcrypt = require('bcryptjs')
const router = require('express').Router()
const User = require('../models/user')

router.post('/', async (request, response, next) => {
    try {
        if (!request.body.password)
            return response.status(400).json({ error: 'password undefined' })
        if (request.body.password.length < 3)
            return response.status(400).json({ error: 'password too short' })
        const passwordhash = await bcrypt.hash(request.body.password, 10)

        let newUser = {
            username: request.body.username,
            name: request.body.name,
            passwordhash,
            blogs: request.body.blogs
        }

        const user = new User(newUser)
        const result = await user.save()
        response.status(201).json(result)

    } catch (exception) {
        next(exception)
    }
})

router.get('/', async (request, response) => {
    const res = await User.find({}).populate('blogs')
    response.json(res)
})


module.exports = router