import { gql } from '@apollo/client';
// quering based on typeDefs
export const GET_ME = gql`
  query{
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