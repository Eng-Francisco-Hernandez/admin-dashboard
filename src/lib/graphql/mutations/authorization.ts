import { gql } from '@apollo/client';

export const LOGIN_M = gql`
  mutation login(
      $email: String!, 
      $password: String!
    ) {
        login(
            email: $email, 
            password: $password
        ) {
            accessToken
            refreshToken
        }
    }
`;
