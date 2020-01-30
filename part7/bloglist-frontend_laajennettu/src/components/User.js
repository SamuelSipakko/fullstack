import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

const User = ({ user }) => {

  if ( !user )
    return <p>User not found</p>

  return (
    <div className="side-margins">
      <h2>{user.name}</h2>
      {user.blogs.length === 0
        ? <h3>no blogs added</h3>
        : <>
        <h3>added blogs</h3>
        <ul id="user-blog-list">
          {user.blogs.map(blog =>
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>)}
        </ul>
        </>}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  user: state.users.find(u => u.id === ownProps.id)
})

export default connect(mapStateToProps)(User)