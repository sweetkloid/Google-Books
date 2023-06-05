const { gql } = require('apollo-server-express');

const typeDefs = gql`
  #structure of data used for API
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    bookCount: Int
    savedBook: [Book]
  }
#logging the users input to be used later
  input UserInput {
    username: String!
    email: String!
    password: String!
  }
  type Book{
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }
  #logging book data to be used later
  input BookInput {
    author: String!
    description: String!
    title: String!
    bookId: ID!
    image: String!
    link: String!
  }
#requring the user to log in to access data
  type Auth{
    token: ID!
    user: User
  }

  type Query{
    me: [User]!
  }
#type of data that can be changed and updated
  type Mutation{
    login(email: String!, password: String!): Auth
    addUser(username: String!
      email: String!
      password: String!): Auth
    saveBook(input: BookInput!): User
    removeBook(bookId: ID!): User
  }
  `;

  module.exports = typeDefs;