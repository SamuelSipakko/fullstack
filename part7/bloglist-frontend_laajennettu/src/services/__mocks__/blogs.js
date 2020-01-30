const blogs = [
  {
    title: "testblog_1",
    author: "test_1 author",
    url: "www.test1.com",
    likes: 1,
    user: {
      blogs: [],
      username: "test 1",
      name: "test one",
      id: "5d1c8efb79da403df81401de"
    },
    id: "5d1c8f4b79da403df81401df"
  },
  {
    title: "testblog_2",
    author: "test_2 author",
    url: "www.test2.com",
    likes: 2,
    user: {
      blogs: [],
      username: "test 2",
      name: "test two",
      id: "5d1c8efb79da403df81401dg"
    },
    id: "5d1c8f4b79da403df81401dh"
  },
  {
    title: "testblog_3",
    author: "test_3 author",
    url: "www.test3.com",
    likes: 3,
    user: {
      blogs: [],
      username: "test 3",
      name: "test three",
      id: "5d1c8efb79da403df81401di"
    },
    id: "5d1c8f4b79da403df81401dj"
  },
  {
    title: "testblog_4",
    author: "test_4 author",
    url: "www.test4.com",
    likes: 4,
    user: {
      blogs: [],
      username: "test 4",
      name: "test four",
      id: "5d1c8efb79da403df81401dk"
    },
    id: "5d1c8f4b79da403df81401dl"
  },
]

const getAll = () => Promise.resolve(blogs)

const setToken = () => null

export default { getAll, setToken }