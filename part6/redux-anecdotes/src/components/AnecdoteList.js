import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = (props) => {

  const vote = (anecdote) => {
    props.voteAnecdote(anecdote)
    props.setNotification(`voted '${anecdote.content}'`, 10)
  }

  return (
    props.visibleAnecdotes
    .sort((a, b) => b.votes - a.votes)
    .map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )
  )
}


const anecdotesToShow = ({ anecdotes, filter }) => {
  const filt = (anecdote) => 
    anecdote.content
    .toLowerCase()
    .includes(filter.toLowerCase())

  return filter
    ? anecdotes.filter(anecdote => filt(anecdote))
    : anecdotes
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state),
    filter: state.filter
  }
}

const MapDispatchToProps = {
  voteAnecdote,
  setNotification,
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  MapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdoteList