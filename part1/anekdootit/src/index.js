import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({action, text}) => {
  return <button onClick={action}>{text}</button>
}


const Anecdote = ({anecdote, votes}) => {
  if(votes === -1)
    return <p>None yet</p>

  return (
  <div>
    <p>{anecdote}</p>
    <p>has {votes} votes</p>
  </div>
  )
}


const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)

  const next = () => {
    let toSelect = selected
    while (toSelect === selected && anecdotes.length > 1) {
      toSelect = Math.round(Math.random()*(anecdotes.length-1))
    }
    setSelected(toSelect)
  }
  
  const vote = () => {
    const copy =  [...votes]
    copy[selected] += 1
    setVotes(copy)
    const mostVoted = copy.map((v,i) => [v,i])
                          .sort((f,l)=> l[0] - f[0])
    setMostVoted(mostVoted[0][1])
  }

  function noBestCheck(num) {
    if (num === 0)
      return -1
    else return num
  }

  return (
    <div>
        <h1>Anecdote of the day</h1>
        <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]}/>
        <Button action={vote} text="vote"/>
        <Button action={next} text="next anecdote"/>
        <h1>Anecdote with most votes</h1>
        <Anecdote anecdote={anecdotes[mostVoted]} votes={noBestCheck(votes[mostVoted])}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)