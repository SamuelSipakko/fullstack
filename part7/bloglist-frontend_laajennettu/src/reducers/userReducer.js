import loginService from "../services/login"
import blogService from "../services/blogs"
import blogs from "../services/blogs";


const userReducer = (state = null, action) => {
  switch (action.type) {
  case "LOGIN_USER":
    return action.data
  case "LOGOUT_USER":
    return null
  default:
    return state
  }
}

export const login = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username,
      password
    })
    
    blogService.setToken(user.token)
    window.localStorage.setItem("loggedUser", JSON.stringify(user))
    dispatch({ type: "LOGIN_USER", data: user })
  }
}

export const loginFromStorage = (user) => {
  return dispatch => {
    blogService.setToken(user.token)
    dispatch({ type: "LOGIN_USER", data: user })
  }
}

export const logout = () => {
  return async dispatch => {
    dispatch({ type: "LOGOUT_USER" })
  }
}


export default userReducer