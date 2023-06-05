import { gql } from '@apollo/client';

//grabbing the users (me) information on login
export const GET_ME = gql`
  query User {
    me{
    _id
    username
    email
    bookCount
    savedBook{
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