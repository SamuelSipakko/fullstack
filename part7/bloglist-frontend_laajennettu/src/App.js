/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react"
import "./app.css"
import LoginForm from "./components/LoginForm"
import CreateForm from "./components/CreateForm"
import HideSwitch from "./components/HideSwitch"
import Blog from "./components/Blog"
import User from "./components/User"
import Notification from "./components/Notification"
import UserList from "./components/UserList"
import Navbar from "./components/Navbar"
import { setNotification } from "./reducers/notificationReducer"
import { createBlog, initializeBlogs } from "./reducers/blogReducer"
import { login, loginFromStorage } from "./reducers/userReducer"
import { initializeUsers } from "./reducers/usersReducer"
import useField from "./hooks/useField"
import { connect } from "react-redux"
import {
  BrowserRouter as Router,
  Route, Switch, Redirect, Link
} from "react-router-dom"


function App(props) {

  const username = useField("text")
  const password = useField("text")
  const title = useField("text")
  const author = useField("text")
  const url = useField("text")


  useEffect(() => { props.initializeBlogs() }, [])
  useEffect(() => { props.initializeUsers() }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser")
    if (loggedUserJSON)
      props.loginFromStorage(JSON.parse(loggedUserJSON))
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await props.login(username.value, password.value)
      username.reset()
      password.reset()
      props.setNotification("logged in")

    } catch (exception) {
      props.setNotification(exception, false)
    }
  }


  const LoginView = () => (
    <div className="content side-margins">
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
      <HideSwitch buttonLabel='new blog'>
        <CreateForm
          title={title}
          author={author}
          url={url}
        />
      </HideSwitch>
      <div className="side-margins">
        {props.blogs.map(blog =>
          <div key={blog.id} className="blog">
            <Link to={`/blogs/${blog.id}`} className="link">
              {blog.title} - {blog.author}
            </Link>
          </div>)}
      </div>
    </div>
  )


  return (
    <div>
      <Router>
        <div>
          <Navbar />
          <Notification />
          {props.user
            ? <div className="content">
              <Switch>
                <Route exact path="/" render={() => BlogView()} />
                <Route path="/blogs/:id" render={({ match }) => <Blog id={match.params.id}/>} />
                <Route exact path="/users" render={() => <UserList />} />
                <Route path="/users/:id" render={({ match }) => <User id={match.params.id}/>} />
                <Redirect to="/" />
              </Switch>
            </div>
            : LoginView()
          }
        </div>
      </Router>
    </div>
  )
}

const stateProps = (state) => ({
  blogs: state.blogs,
  user: state.user
})

const dispatchProps = {
  setNotification,
  createBlog,
  initializeBlogs,
  login,
  loginFromStorage,
  initializeUsers
}
export default connect(stateProps, dispatchProps)(App)
