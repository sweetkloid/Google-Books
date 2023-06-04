import { gql } from '@apollo/client';

export const GET_me = gql`
  query me{
    _id
    name
}
`;