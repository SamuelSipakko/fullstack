import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { Query, Mutation, Subscription } from 'react-apollo'
import { gql } from 'apollo-boost'


const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    bookCount
  }
}`

const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  title
  published
  author { name }
  genres
}`

export const BOOKS = gql`
query allBooks($genre: String) {
  allBooks(genre: $genre) {
    ...BookDetails
  }
}
${BOOK_DETAILS}`

const CREATE_BOOK = gql`
mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
  addBook(title: $title, published: $published, author: $author, genres: $genres) {
    ...BookDetails
  }
}
${BOOK_DETAILS}`

const CHANGE_BIRTHYEAR = gql`
mutation changeBirthyear($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    born
    bookCount
  }
}
`

const LOGIN = gql`
mutation loginUser($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}`

const GET_USER = gql`
{
  me {
    username
    favoriteGenre
  }
}`

const BOOK_ADDED = gql`
subscription {
  bookAdded {
    ...BookDetails
  }
}
${BOOK_DETAILS}`


const App = ({ client }) => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [notification, setNofitication] = useState(null)
  let timer = null;

  useEffect(() => {
    const token = localStorage.getItem('user-token')
    if (token) setToken(token)
  }, [])

  const createNotification = (message, successful, nonimportant = false) => {
    clearTimeout(timer)
    setNofitication({ msg: message, success: successful, nonimportant })
    timer = setTimeout(() => setNofitication(null), 15000)
  }

  const handleError = (error) => {
    const ErrMsg = error.graphQLErrors[0] && error.graphQLErrors[0].message
      ? error.graphQLErrors[0].message
      : (error.message ? error.message : 'Error occurred')
    createNotification(ErrMsg, false)
  }

  const logOutUser = () => {
    setToken(null)
    localStorage.removeItem('user-token')
    createNotification('Logged out', true)
    if ( !(page in ['authors', 'books']) )
      setPage('authors')
  }

  const handleBookUpdate = ({ subscriptionData }) => {
    const updateBooks = (genre) => {
      const allBooks = () => {
        try {
          const { allBooks } = client.readQuery({ query: BOOKS, variables: { genre } })
          console.log('allbooks >>', allBooks)
          return allBooks
        } catch (error) {
          return []
        }
      }
      client.writeQuery({ 
        query: BOOKS,
        variables: { genre },
        data: { 
          allBooks: [ ...allBooks(), subscriptionData.data.bookAdded ]
        }
      })
    }
    updateBooks(null)
    subscriptionData.data.bookAdded.genres.forEach(g => updateBooks(g))

    client.query({ query: ALL_AUTHORS, fetchPolicy: "network-only" })
    createNotification(
      `A new book '${subscriptionData.data.bookAdded.title}' was added`,
      true, 
      true
    )
  }

  const notificationStyle = {
    border: `2px solid ${notification && notification.nonimportant 
      ? 'gray' 
      : (notification && notification.success ? 'green' : 'red')}`,
    color: (notification && notification.nonimportant) 
      ? 'gray' 
      : (notification && notification.success ? 'green' : 'red'),
    padding: '4px',
    margin: '2px 2px 15px 2px'
  }

  return (
    <div>
      {/*** Notification ***/}
      <Subscription 
        subscription={BOOK_ADDED}
        onSubscriptionData={handleBookUpdate}
      >
        {() => {
          if (notification)
            return <div style={notificationStyle}>{notification.msg}</div>
          
          return null
        }}
      </Subscription>
      

      {/*** Navigation bar ***/}
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommended')}>recommended</button>
          <button onClick={logOutUser}>logout</button>
        </>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
      </div>
      

      {/*** Authors page ***/}
      <Mutation 
        mutation={CHANGE_BIRTHYEAR}
        onError={handleError}
        onCompleted={({ editAuthor }) => {
          createNotification(
            `Changed the birthyear of ${editAuthor.name} to ${editAuthor.born}`,
            true
          )
        }}
        refetchQueries={[{ query: ALL_AUTHORS }]}
      > 
        { (setBirthYear) => 
          <Query query={ALL_AUTHORS}>
            {(result) => 
              <Authors 
                show={page === 'authors'} 
                result={result}
                setBirthYear={setBirthYear}
                token={token}
              />
            }
          </Query>
        }
      </Mutation>


      {/*** Books page ***/}
      <Query query={BOOKS} variables={{ genre: null }}>
        {(res) => <Books show={page === 'books'} client={client} result={res}/>}
      </Query>
      


      {/*** New book creation page ***/}
      <Mutation 
        mutation={CREATE_BOOK} 
        onError={handleError}
        onCompleted={({addBook}) =>
          createNotification(`Added a new book '${addBook.title}'`, true)}
        refetchQueries={[
          { query: ALL_AUTHORS },
          { query: GET_USER },
          { query: BOOKS/* , variables: { genre: null }  */}
        ]}
      > 
        {(addBook) => 
          <NewBook 
            show={page === 'add'} 
            addBook={addBook}
            createNotification={createNotification}
          />
        }
      </Mutation>

      
      {/*** Login page ***/}
      <Mutation
        mutation={LOGIN}
        onError={handleError}
        onCompleted={() => {
          createNotification('Logged in', true)
          setPage('authors')
        }}
      >
        {(login) => 
          <LoginForm 
            show={page === 'login'} 
            login={login} 
            setToken={setToken}
          />
        }
      </Mutation>


      {/*** Recommendations page ***/}
      <Query query={BOOKS} variables={{ genre: null }}>
        {(res) =>
          <Query query={GET_USER}>
            {(user) => 
              <Recommendations 
                show={page === 'recommended'}
                client={client} 
                user={user}
                result={res}
              />
            }
          </Query>
        }
      </Query>

    </div>
  )
}

export default App