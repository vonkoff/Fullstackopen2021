const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)

    if (blog) {
      res.json(blog)
    } 

    res.status(404).end()
})

blogsRouter.post('/', async (req,res) =>{
    const body = req.body
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (body.likes === undefined) {
      return res.status(400).json({ error: 'likes missing' })
    }

    if (body.url === undefined || body.title === undefined) {
      return res.status(400).json({ error: 'title and url missing' })
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = [...user.blogs, savedBlog._id]
    await user.save()

    res.json(savedBlog)
})

blogsRouter.put('/:id', async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    context: 'query',
  })

  res.json(updatedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id)
  
  if (!blog) 
    res.status(401).json({ error: 'can\'t delete blog that does not exist'})

  await Blog.findByIdAndDelete(blog.id)
  return res.status(204).end()

})

module.exports = blogsRouter
