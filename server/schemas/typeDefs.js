const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBook: [Book]
  }
  type Book{
    bookId: String
    authors: String[]
    description: String
    title: String
    image: String
    link: String
  }

  type Auth{
    token: String
    user: [User]
  }

  type Query{
    me: [User]


  }
  type Mutation{
    create
  }
  `;

  module.exports = typeDefs;