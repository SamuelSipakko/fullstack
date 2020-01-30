import React from 'react'
import BirthyearForm from './BirthyearForm'


const Authors = ({ show, result, setBirthYear, token }) => {
  if (!show) {
    return null
  }

  if (result.loading)
    return <h2>Loading ...</h2>

  if (result.data.allAuthors.length === 0)
    return <><h2>Authors</h2><h3>No authors to show</h3></>

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {result.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {result.data.allAuthors.length > 0 && token && 
        <BirthyearForm 
          setBirthYear={setBirthYear} 
          authors={result.data.allAuthors}
        />
      }
    </div>
  )
}

export default Authors