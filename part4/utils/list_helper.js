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


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}

