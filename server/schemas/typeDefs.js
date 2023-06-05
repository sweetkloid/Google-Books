const { gql } = require('apollo-server-express');

const typeDefs = gql`
  #structure of data used for API
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBook: [Book]
  }
  type Book{
    bookId: ID!
    authors: [String]
    description: String
    title: String!
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
    users: [User]
    user(username: String!): User
    me: User
  }
#type of data that can be changed and updated
  type Mutation{
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: BookInput!): User
    removeBook(bookId: ID!): User
  }
  `;

  module.exports = typeDefs;