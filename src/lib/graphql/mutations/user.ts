import { gql } from "@apollo/client";

export const CREATE_USER_M = gql`
  mutation createUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password)
  }
`;
