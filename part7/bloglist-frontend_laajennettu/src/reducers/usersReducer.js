import usersService from "../services/users"

const usersReducer = (state = [], action) => {
  switch (action.type) {
  case "INIT_USERS":
    return action.data
  case "CHANGE_USER":
    return state.map(u => u.id === action.data.id ? action.data : u)
  case "REMOVE_USER_BLOG":
    return state.map(user => user.id === action.data.user
      ? { ...user, blogs: user.blogs.filter(b => b.id !== action.data.blog) }
      : user
    )
  default:
    return state
  }
}

export const updateUser = (user) => {
  return async dispatch => {
    dispatch({ type: "CHANGE_USER", data: user })
  }
}

export const removeBlogFromUser = (blogId, userId) => {
  return async dispatch => {
    dispatch({
      type: "REMOVE_USER_BLOG",
      data: { blog: blogId, user: userId }
    })
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch({
      type: "INIT_USERS",
      data: users
    })
  }
}


export default usersReducer