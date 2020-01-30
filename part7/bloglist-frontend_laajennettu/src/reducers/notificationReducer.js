const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case "SET_NOTIFICATION":
    return { text: action.data, success: true }
  case "SET_ERR_NOTIFICATION":
    return { text: action.data, success: false }
  case "CLEAR_NOTIFICATION":
    return null
  default:
    return state
  }
}

const handleExceptions = exception => {
  if(exception.response &&
      exception.response.data &&
      exception.response.data.error)
    return exception.response.data.error

  else if(exception.error)
    return exception.error

  else if(exception.message)
    return exception.message

  else
    return exception
}

export const setNotification = (data, isSuccessful = true, timeInSeconds = 10) => {
  return dispatch => {
    setTimeout(() => dispatch({ type: "CLEAR_NOTIFICATION" }), timeInSeconds*1000)
    isSuccessful
      ? dispatch({ type: "SET_NOTIFICATION", data })
      : dispatch({ type: "SET_ERR_NOTIFICATION", data: handleExceptions(data) })
  }
}


export default notificationReducer
