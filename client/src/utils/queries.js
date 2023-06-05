import { gql } from '@apollo/client';

export const GET_me = gql`
  query me{
    user{}
    _id
    username
    email
    bookCount
    savedBook
  }
}
`;