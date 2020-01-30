import React, { useState } from "react"

const Blog = ({ blog, addLike, delBlog, user }) => {

  const [showFull, setShowFull] = useState(false)
  const [style, setStyle] = useState(false)

  const toggleShow = () => setShowFull(!showFull)

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
        <br/><button onClick={() => delBlog(blog)}>remove</button>
      </>
  }

  if (showFull)
    return (
      <div className={style ? "blog-special" : "blog"}>
        <span onClick={toggleShow}
          onMouseEnter={() => setStyle(true)}
          onMouseLeave={() => setStyle(false)}>
          {blog.title} - {blog.author}
        </span><br/>
        <a href={getLink()}>{blog.url}</a><br/>
        {blog.likes} likes &nbsp;
        <button onClick={() => addLike(blog)}>like</button><br/>
        added by {blog.user.name}
        {removeBtn()}
      </div>
    )

  return (
    <div className={style ? "blog-special" : "blog"}>
      <span onClick={toggleShow}
        onMouseEnter={() => setStyle(true)}
        onMouseLeave={() => setStyle(false)}>
        {blog.title} - {blog.author}
      </span>
    </div>
  )
}

export default Blog