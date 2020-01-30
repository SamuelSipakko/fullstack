import React, { useState, useEffect } from 'react'
import BookTable from './BookTable'
import { BOOKS } from '../App'


const Books = ({ show, client, result }) => {
  const [filter, setFilter] = useState('all')
  const [books, setBooks] = useState(null)
  const [filters, setFilters] = useState(['all'])

  useEffect(() => {
    const func = async () => {
      const { data } = await client.query({
        query: BOOKS,
        variables: { genre: filter === 'all' ? null : filter }
      })
      setBooks(data.allBooks)
    }
    if (!result.loading) func()
  }, [client, show, filter, result])


  useEffect(() => {
    if (!result.loading) {
      const filterSet = new Set()
      result.data.allBooks.forEach(book => 
        book.genres.forEach(genre => filterSet.add(genre))
      )
      setFilters(['all', ...([...filterSet].sort()) ])
    }
  }, [result])

  if (!show) {
    return null
  }

  if (!books || result.loading)
    return <h2>Loading ...</h2>

  if (books.length === 0)
    return <><h2>Books</h2><h3>No books to show</h3></>


  const filterButtons = () => {
    if (filters.length === 1)
      return null

    return <div onChange={(event) => setFilter(event.target.value)}>
      {filters.map(f =>
        <span key={f}>
          <input type="radio" name="filter" value={f} defaultChecked={f === filter} />
          <label>{f}</label>
        </span>
      )}
    </div>
  }

  const filtered = books.filter(b => 
    filter === 'all'
      ? true
      : b.genres.includes(filter)
  )

  return (
    <div>
      <h2>books</h2>
      <div>
        {filterButtons()}
      </div>
      <BookTable books={filtered} />
    </div>
  )
}

export default Books