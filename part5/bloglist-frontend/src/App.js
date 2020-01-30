import React, { useState, useEffect } from "react"
import "./app.css"
import loginService from "./services/login"
import blogService from "./services/blogs"
import LoginForm from "./components/LoginForm"
import CreateForm from "./components/CreateForm"
import HideSwitch from "./components/HideSwitch"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import { useField } from './hooks/useField'

function App() {

  const [blogs, setblogs] = useState([])
  const [errorMessage, setErrorMsg] = useState(null)
  const [successMessage, setSuccessMsg] = useState(null)
  const [user, setUser] = useState(null)
  const username = useField("text")
  const password = useField("text")
  const title = useField("text")
  const author = useField("text")
  const url = useField("text")

  const blogFormRef = React.createRef()



  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setblogs(blogs.sort((a,b) => b.likes - a.likes)))
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const createNotification = (msg, isSuccessful=false, timeout=5000) => {
    if(isSuccessful) {
      setSuccessMsg(msg)
      setTimeout(() => setSuccessMsg(null), timeout)
    } else {
      setErrorMsg(msg)
      setTimeout(() => setErrorMsg(null), timeout)
    }
  }

  const handleExceptions = exception => {
    if(exception.response &&
       exception.response.data &&
       exception.response.data.error)
      createNotification(exception.response.data.error)
    else if(exception.message)
      createNotification(exception.message)
    else
      createNotification("couldn't create new blog")
  }


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem("loggedUser", JSON.stringify(user))
      setUser(user)
      username.reset()
      password.reset()
      createNotification(`logged in as ${user.name}`, true)

    } catch (exception) {
      handleExceptions(exception)
    }
  }


  const logout = () => {
    window.localStorage.removeItem("loggedUser")
    setUser(null)
    createNotification("logged out", true)
  }


  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title: title.value,
        author: author.value,
        url: url.value
      }
      const response = await blogService.create(newBlog)
      if (response.error)
        return createNotification(response.error)
      setblogs(blogs.concat(response).sort((a,b) => b.likes - a.likes))
      createNotification(`Added a new blog '${title}' by ${author}`, true)
      // blogFormRef.current.toggleVisibility() -- Ei toimi
      title.reset()
      author.reset()
      url.reset()

    } catch (exception) {
      handleExceptions(exception)
    }
  }

  const addLike = async blog => {
    try {
      const newBlog = {
        user: blog.user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      }
      const returned = await blogService.update(newBlog, blog.id)
      setblogs(blogs.map(b => b.id !== blog.id ? b : returned))
      createNotification(`liked '${blog.title}'`, true)

    } catch (exception) {
      handleExceptions(exception)
    }
  }

  const deleteBlog = async blog => {
    try {
      const res = window.confirm(`Delete '${blog.title}' by ${blog.author}?`)
      if (!res)
        return createNotification("canceled")
      await blogService.remove(blog.id)
      setblogs(blogs.filter(b => b.id !== blog.id))
      createNotification(`deleted '${blog.title}'`, true)
    } catch (exception) {
      handleExceptions(exception)
    }
  }

  const LoginView = () => (
    <div>
      <h2>log in to application</h2>
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        password={password}
      />
    </div>
  )


  const BlogView = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in &nbsp;
        <button onClick={logout}>logout</button>
      </p>
      <HideSwitch buttonLabel='new blog' ref={blogFormRef}>
        <CreateForm
          handleSubmit={handleCreate}
          title={title}
          author={author}
          url={url}
        />
      </HideSwitch>
      <br/>
      {blogs.map(blog =>
        <Blog key={blog.id}
          blog={blog}
          addLike={addLike}
          delBlog={deleteBlog}
          user={user}
        /> )}
    </div>
  )


  return (
    <div>
      {errorMessage && <Notification msg={{ error: errorMessage }}/>}
      {successMessage && <Notification msg={{ success: successMessage }}/>}
      {user ? BlogView() : LoginView()}
    </div>
  )
}

export default App
