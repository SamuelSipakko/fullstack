const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message
    case 'REMOVE_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const setNotification = (text, timeInSeconds) => {
  return async dispatch => {
    setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION' })
    }, timeInSeconds*1000)
    
    dispatch({
      type: 'SET_NOTIFICATION',
      message: text
    })
  }
}


export default reducer