import { gql } from '@apollo/client';

//logging in a user
export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

//creating a user
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

//saving a book by paramaters to user collection
export const SAVE_BOOK = gql`
  mutation saveBook($author: [String], $description: String, $title: String, $bookId: ID, $image: String, $link: String) {
    saveBook(input: { author: $author, description: $description, title: $title, bookId: $bookId, image: $image, link: $link }) {
      _id
      username
      email
      bookCount
      savedBook {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;

//removing a book by id from user collection
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      bookCount
      savedBook {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
