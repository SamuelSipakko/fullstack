const listHelper = require('../utils/list_helper')
const {listWithOneBlog, biggerList} = require('./test_helper')



test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})


describe('total likes', () => {

  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(biggerList)
    expect(result).toBe(36)
  })
})


describe('favorite blog', () => {

  test('of empty list returns null', () => {
    expect(listHelper.favoriteBlog([])).toEqual(null)
  })

  test('of list with one entry to be the entry', () => {
    const expected = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    }

    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(expected)
  })

  test('of a bigger list to return correct blog', () => {
    const expected = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    }

    const result = listHelper.favoriteBlog(biggerList)
    expect(result).toEqual(expected)
  })

})


describe('most blogs', () => {

  test('of empty list returns null', () => {
    expect(listHelper.mostBlogs([])).toEqual(null)
  })

  test('of list with one entry to be the entry', () => {
    const expected = {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    }

    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual(expected)
  })

  test('of a bigger list to return correct blog', () => {
    const expected = {
      author: "Robert C. Martin",
      blogs: 3
    }

    const result = listHelper.mostBlogs(biggerList)
    expect(result).toEqual(expected)
  })

})


describe('most likes', () => {

  test('of empty list returns null', () => {
    expect(listHelper.mostLikes([])).toEqual(null)
  })

  test('of list with one entry to be the entry', () => {
    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 5
    }

    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual(expected)
  })

  test('of a bigger list to return correct blog', () => {
    const expected = {
      author: "Edsger W. Dijkstra",
      likes: 17
    }

    const result = listHelper.mostLikes(biggerList)
    expect(result).toEqual(expected)
  })

})