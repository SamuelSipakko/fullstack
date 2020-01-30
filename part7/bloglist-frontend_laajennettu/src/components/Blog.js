import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { removeBlog, likeBlog, commentBlog } from "../reducers/blogReducer"
import { setNotification } from "../reducers/notificationReducer"

const Blog = ({ blog, likeBlog, removeBlog, commentBlog, setNotification, user, history }) => {

  const addLike = async blog => {
    try {
      await likeBlog(blog)
      setNotification(`liked '${blog.title}'`)
    } catch (exception) {
      setNotification(exception, false)
    }
  }

  const deleteBlog = async blog => {
    try {
      const res = window.confirm(`Delete '${blog.title}' by ${blog.author}?`)
      if (!res)
        return setNotification("canceled", false)
      await removeBlog(blog.id)
      setNotification(`deleted '${blog.title}'`)
      history.push("/")
    } catch (exception) {
      setNotification(exception, false)
    }
  }

  const getLink = () => {
    if (blog.url.startsWith("http"))
      return blog.url
    if (blog.url.startsWith("www."))
      return `http://${blog.url}`
    return `http://www.${blog.url}`
  }

  const removeBtn = () => {
    if (blog.user.name === user.name && blog.user.username === user.username)
      return <>
        <br/><button onClick={() => deleteBlog(blog)} id="remove">remove</button>
      </>
  }

  const addComment = async event => {
    event.preventDefault()
    try {
      const comment = event.target.comment.value
      await commentBlog(comment, blog)
      setNotification(`added comment '${comment}'`)
    } catch (exception) {
      setNotification(exception, false)
    }
  }

  if (!blog)
    return <p className="side-margins">Blog not found</p>

  return (
    <div className="side-margins">
      <h2>{blog.title} - {blog.author}</h2>
      <a href={getLink()}>{blog.url}</a><br/>
      {blog.likes} likes &nbsp;
      <button onClick={() => addLike(blog)} id="like">like</button>
      <br/>
      added by {blog.user.name}
      {removeBtn()}
      <h3>Comments</h3>
      <form onSubmit={addComment}>
        <input type="text" name="comment" id="comment_input"></input> &nbsp;
        <button type="submit" id="add_comment">add comment</button>
      </form>
      <ul>
        {blog.comments.map((c, idx) =>
          <li key={idx}>{c}</li>)}
      </ul>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  user: state.user,
  blog: state.blogs.find(b => b.id === ownProps.id)
})

const dispatchProps = {
  removeBlog,
  likeBlog,
  commentBlog,
  setNotification
}

export default withRouter(connect(mapStateToProps, dispatchProps)(Blog))