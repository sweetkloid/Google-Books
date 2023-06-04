const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBook: [Book]
  }
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
  
  input BookInput {
    author: String!
    description: String!
    title: String!
    bookId: ID!
    image: String!
    link: String!
  }

  type Auth{
    token: String
    user: User
  }

  type Query{
    me: User
  }

  type Mutation{
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(author: String!, description: String!, title: String, bookId: BookInput!, image: String!, link: String!): UserInput
    removeBook(bookId: ID!): User
  }
  `;

  module.exports = typeDefs;