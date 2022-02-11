const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const blog = require('../models/blog')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('all blogs are returned', async() => {
  const res = await api.get('/api/blogs')

  expect(res.body).toHaveLength(helper.initialBlogs.length)
})

test('1 succesful blog post', async() => {
  const newBlogPost = {
      _id: "5a422ba71b54a676234d17ff",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    }

  await api
    .post('/api/blogs')
    .send(newBlogPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    
  const res = await api.get('/api/blogs')

  const authors = res.body.map(r => r.author)

  expect(res.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(authors).toHaveLength(helper.initialBlogs.length + 1)
})

test('blog post without likes is not added', async ()=>{
  const newBlogPost = {
    _id: "5a422bc61b54a676234d17fc",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlogPost)
    .expect(400)

  const res = await api.get('/api/blogs')
  expect(res.body).toHaveLength(helper.initialBlogs.length)
})

test('blog post without title and url is not added', async ()=>{
  const newBlogPost = {
    _id: "5a422bc61b54a676234d17fc",
    author: "Robert C. Martin",
    likes: 0,
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlogPost)
    .expect(400)

  const res = await api.get('/api/blogs')
  expect(res.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('unique identifier property of the blog posts is named id', async () =>{
  const res = await api.get('/api/blogs')
  expect(res.body[0]._id).toBeDefined()
})


test('deletion of a blog post', async () =>{
  const blogs = await api.get('/api/blogs')
  const id = blogs.body[0].id

  await api
    .delete(`/api/blogs/${id}`)
    .expect(204)

  const res = await api.get('/api/blogs')
  expect(res).toHaveLength(helper.initialBlogs.length - 1)

  const ids = blogsAtEnd.map(r => r._id)
  expect(ids).not.toContain(id)
})


afterAll(() => {
  mongoose.connection.close()
})