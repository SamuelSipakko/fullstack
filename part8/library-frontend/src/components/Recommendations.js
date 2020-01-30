import React, { useState, useEffect } from 'react'
import BookTable from './BookTable'
import { BOOKS } from '../App'

const Recommendations = ({ show, client, user, result }) => {
  const [books, setBooks] = useState(null)

  useEffect(() => {
    const func = async () => {
      const { data } = await client.query({
        query: BOOKS,
        variables: { genre: user.data.me.favoriteGenre }
      })
      setBooks(data.allBooks)
    }
    if (!user.loading && user.data.me && !result.loading) func()
  }, [client, user, show, result])


  if (!show)
    return null

  if (!books || user.loading || result.loading)
    return <h2>Loading ...</h2>

  if (!user.data.me.favoriteGenre)
    return <h3>You don't have a favorite genre</h3>
  
  const filtered = books.filter(b => 
    b.genres.includes(user.data.me.favoriteGenre)
  )

  if (!filtered.length)
    return (
      <div>
        <h2>Recommendations</h2>
        <p>
          There are no books that match your favorite genre&nbsp;
          <b>{user.data.me.favoriteGenre}</b>
        </p>
      </div>
    )

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        Books in your favorite genre&nbsp;
        <b>{user.data.me.favoriteGenre}</b>
      </p>
      <BookTable books={filtered} />
    </div>
  )
}


export default Recommendations