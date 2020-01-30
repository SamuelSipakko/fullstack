import blogService from "../services/blogs"
import { setNotification } from "./notificationReducer"
import { updateUser, removeBlogFromUser } from "./usersReducer"

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case "ADD_BLOG":
    return [...state, action.data].sort((a,b) => b.likes - a.likes)
  case "CHANGE_BLOG":
    return state.map(b => b.id === action.data.id ? action.data : b)
  case "REMOVE_BLOG":
    return state.filter(b => b.id !== action.data)
  case "INIT_BLOGS":
    return action.data.sort((a,b) => b.likes - a.likes)
  default:
    return state
  }
}

export const removeBlog = (id, userId) => {
  return async dispatch => {
    const res = await blogService.remove(id)
    if (res.error)
      dispatch(setNotification(res, false))
    else {
      dispatch(removeBlogFromUser(id, userId))
      dispatch({
        type: "REMOVE_BLOG",
        data: id
      }) // FIXME: Ei tallennu käyttäjään (user.blogs)
    }
  }
}

export const likeBlog = ({ id, likes, user, ...rest }) => {
  return async dispatch => {
    const newBlog = { ...rest, user: user.id, likes: likes + 1 }
    const updated = await blogService.update(newBlog, id)
    if (updated.error)
      dispatch(setNotification(updated, false))
    else
      dispatch({
        type: "CHANGE_BLOG",
        data: updated
      })
  }
}

export const commentBlog = (comment, blog) => {
  return async dispatch => {
    const { id, comments, user, ...rest } = blog
    const newBlog = { ...rest, user: user.id, comments: comments.concat(comment) }
    const updated = await blogService.updateComment(newBlog, id)
    if (updated.error)
      dispatch(setNotification(updated, false))
    else
      dispatch({
        type: "CHANGE_BLOG",
        data: updated
      })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    if (newBlog.error)
      dispatch(setNotification(newBlog, false))
    else {
      dispatch(updateUser(newBlog.user))
      dispatch({
        type: "ADD_BLOG",
        data: newBlog
      })
    }
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: "INIT_BLOGS",
      data: blogs
    })
  }
}

export default blogReducer