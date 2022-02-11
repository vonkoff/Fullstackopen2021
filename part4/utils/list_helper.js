const _ = require('lodash')

const dummy = blogs => {
    return 1
}

const totalLikes = blogs => {
    const total = blogs.reduce((total, currValue) =>{
        return total + currValue.likes
    }, 0)
    return total
}

const favoriteBlog = blogs => {
  if (!blogs || blogs.length === 0) {
    return null
  }

  const max = blogs.reduce((prev, curr) =>
    prev.likes > curr.likes ? prev : curr,
  )

  const favoriteBlog = {
    title: max.title,
    author: max.author,
    likes: max.likes,
  }

  return favoriteBlog
}

const mostBlogs = blogs => {
  if (!blogs || blogs.length === 0){
    return null
  }

  return _.maxBy(
    _.map(_.countBy(blogs, 'author'), (val, key) => ({
      author: key,
      blogs: val,
    })),
    'blogs'
  )
}

const mostLikes = blogs => {
  if (!blogs || blogs.length === 0){
    return null
  }

  return _.maxBy(
    _.chain(blogs)
      .groupBy('author')
      .map((val, key) => ({
        author: key,
        likes: _.sumBy(val, 'likes'),
      }))
      .value(),
    'likes'
  )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}

