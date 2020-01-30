import React from 'react'


const BirthyearForm = ({ setBirthYear, authors }) => {

  const submit = (event) => {
    event.preventDefault()
    setBirthYear({ variables: { 
      name:  event.target.name.value,
      setBornTo: Number(event.target.born.value) }
    })
    event.target.name.value = ''
    event.target.born.value = ''
  }

  return (
    <>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
            <select id="name">
              {authors.map(a => 
                <option value={a.name} key={a.name}>{a.name}</option>
              )}
            </select>
        </div>
        <div>
          born
            <input type="number" id="born" />
        </div>
        <button type="submit">update author</button>
      </form>
    </>
  )
}

export default BirthyearForm