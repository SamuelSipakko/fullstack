import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      return state.map(anec => anec.id === action.data.id ? action.data : anec)
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const voteAnecdote = ({ content, id, votes }) => {
  return async dispatch => {
    const updated = { content, votes: votes + 1 }
    const newAnecdote = await anecdoteService.update(id, updated)
    dispatch({
      type: 'VOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type : 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}


export default reducer