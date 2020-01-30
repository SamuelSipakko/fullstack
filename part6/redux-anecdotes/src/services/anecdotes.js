import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'
 
const getAll = () => axios.get(baseUrl).then(res => res.data)

const create = (content) => (
    axios.post(baseUrl, { content, votes: 0 })
         .then(res => res.data)
)

const update = (id, newAnecdote) => (
    axios.put(`${baseUrl}/${id}`, newAnecdote)
         .then(res => res.data)
)

export default { getAll, create, update }