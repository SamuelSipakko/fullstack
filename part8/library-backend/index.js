require('dotenv').config()
const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const JWT_SECRET = "This-is-not-a-good-key"

const errorHandler = (error, args) => {
  let message = ""
  if (error.name === 'ValidationError') {
    const errors = []
    for (let field in error.errors) { errors.push(error.errors[field].message) };
    message = errors.length > 1
      ? errors.slice(0, -1).join(', ') + ' and ' + errors.slice(-1)[0]
      : errors[0]
  }
  else if (error.message) message = error.message

  throw new UserInputError(message, { invalidArgs: args })
}

const typeDefs = gql`

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
}

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Mutation {
    addBook(title: String!, author: String!, published: Int!, genres: [String!]!): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
    resetDB: Boolean!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Mutation: {
    addBook: async (_, args, { currentUser }) => {
      if (!currentUser)
        throw new AuthenticationError('not authenticated')
      try {
        let author = await Author.findOne({ name: args.author })
        if (!author)
          author = await new Author({ name: args.author, bookCount: 0 }).save()

        const newBook = await new Book({ ...args, author: author._id }).save()
        const populated = await newBook.populate('author').execPopulate()
        
        if (populated)
          pubsub.publish('BOOK_ADDED', { bookAdded: populated })

        await Author.findByIdAndUpdate(author._id, { bookCount: author.bookCount + 1 })
        
        return populated

      } catch (error) {
        errorHandler(error, args)
      }
    },
    editAuthor: async (_, args, { currentUser }) => {
      if (!currentUser)
        throw new AuthenticationError('not authenticated')
      try {
        return Author.findOneAndUpdate(
          { name: args.name }, { born: args.setBornTo }, { new: true }
        )
      } catch (error) {
        errorHandler(error, args)
      }
    },
    createUser: (_, args) => {
      try {
        return new User({ ...args }).save()
      } catch (error) {
        errorHandler(error, args)
      }
    },
    login: async (_, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'verysecretpassword')
        throw new UserInputError('wrong credentials')

      const userForToken = { username: user.username, id: user._id }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
    resetDB: async () => {
      try {
        await Book.deleteMany({})
        await Author.deleteMany({})
        return true
      } catch (error) {
        errorHandler(error, {})
      }
    }
  },
  Query: {
    bookCount: () => Book.countDocuments(),
    authorCount: () => Author.countDocuments(),
    allBooks: async (_, args) => {
      try {
        const toFind = args.genre ? { genres: { $in: [args.genre]} } : {}
        return await Book.find(toFind).populate('author')
      } catch (error) {
        errorHandler(error, args)
      }
    },
    allAuthors: () => Author.find({}),
    me: (_, __, context) => context.currentUser
   },
   Subscription: {
     bookAdded: {
       subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
     }
   }
}

const mongooseConnectionOptions = {
  useFindAndModify: false,
  useCreateIndex: true,
  useNewUrlParser: true,
}
console.log('connecting to', process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI, mongooseConnectionOptions)
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.log('got error while connecting to MongoDB', error.message))


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      return { currentUser: await User.findById(decodedToken.id) }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})