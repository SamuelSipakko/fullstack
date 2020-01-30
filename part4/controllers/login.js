const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const router = require('express').Router()
const User = require('../models/user')


router.post('/', async (request, response) => {
    const b = request.body

    const user = await User.findOne({ username: b.username })
    const passwordCorrect = user
        ? await bcrypt.compare(b.password, user.passwordhash)
        : false

    if (!user)
        return response.status(401).json({ error: 'invalid username' })
    if (!passwordCorrect)
        return response.status(401).json({ error: 'invalid password' })

    const userForToken = {
        username: user.username,
        id: user._id
    }
    
    const token = jwt.sign(userForToken, process.env.SECRET)

    response
        .status(200)
        .send({ token, username: user.username, name: user.name })
})

module.exports = router