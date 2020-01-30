const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

router.get('/', (request, response) => {
  Blog
    .find({})
    .populate('user')
    .then(blogs => {
      response.json(blogs)
    })
})

router.post('/', async (request, response, next) => {
  const b = request.body
  try{
    if (!request.token)
      return response.status(401).json({ error: 'token missing' })

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id)
      return response.status(401).json({ error: 'token invalid' })
    
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: b.title,
      author: b.author,
      url: b.url,
      likes: b.likes ? b.likes : 0,
      user: user._id,
      comments: []
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    const populated = await savedBlog
      .populate('user')
      .populate({
        path: 'user',
        populate: { path: 'blogs' }
      })
      .execPopulate()
    console.log("populated", populated)
    response.status(201).json(
      populated
    )
  } catch (exception) {
    next(exception)
  }
})

router.delete('/:id', async (request, response, next) => {
  const errResponse = msg => response.status(401).json({ error: msg })
  try {
    if (!request.token)
      return errResponse('token missing')
    
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken)
    return errResponse("access denied")

    const blog = await Blog.findById(request.params.id)
    const user = await User.findById(decodedToken.id)
    
    if (!blog)
      return errResponse("that blog doesn't exist")
    if(blog.user.toString() !== decodedToken.id.toString())
      return errResponse("unauthorized action")
    
    await Blog.findByIdAndDelete(request.params.id)
    user.blogs = user.blogs.filter(blog => blog.id !== request.params.id)
    user.save()
    response.status(204).end()
    
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (request, response, next) => {
  try {
    const b = request.body
    const newBlog = {
      title: b.title,
      author: b.author,
      url: b.url,
      likes: b.likes,
      user: b.user,
      comments: b.comments
    }

    const recieved = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
    if(!recieved)
      return response.status(404).json({ error: "Blog doesn't exist" })
    response.status(201).json(await recieved.populate('user').execPopulate())

  } catch (error) {
    next(error)
  }
})

router.post('/:id/comments', async (request, response, next) => {
  try {
    const b = request.body
    const newBlog = {
      title: b.title,
      author: b.author,
      url: b.url,
      likes: b.likes,
      user: b.user,
      comments: b.comments
    }

    const recieved = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
    if(!recieved)
      return response.status(404).json({ error: "Blog doesn't exist"})
    response.status(201).json(await recieved.populate('user').execPopulate())
  
  } catch (error) {
    next(error)
  }
})

module.exports = router