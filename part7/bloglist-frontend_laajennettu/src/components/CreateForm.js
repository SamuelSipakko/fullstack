import React from "react"
import { setNotification } from "../reducers/notificationReducer"
import { createBlog } from "../reducers/blogReducer"
import { connect } from "react-redux"

const CreateForm = ({ title, author, url, createBlog, setNotification }) => {

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title: title.value,
        author: author.value,
        url: url.value
      }
      await createBlog(newBlog)
      setNotification(`Added a new blog '${title.value}' by ${author.value}`)
      title.reset()
      author.reset()
      url.reset()

    } catch (exception) {
      setNotification(exception, false)
    }
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleCreate}>
        <table>
          <tbody>
            <tr>
              <td>title:</td>
              <td><input {...title.inputParams} id="title"/></td>
            </tr>
            <tr>
              <td>author:</td>
              <td><input {...author.inputParams} id="author"/></td>
            </tr>
            <tr>
              <td>url:</td>
              <td><input {...url.inputParams} id="url"/></td>
            </tr>
          </tbody>
        </table>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default connect(null, { setNotification, createBlog })(CreateForm)