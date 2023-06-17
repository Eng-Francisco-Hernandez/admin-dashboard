import { gql } from "@apollo/client";

export const CREATE_USER_M = gql`
  mutation createUser($email: String!, $role: String!, $password: String!) {
    createUser(email: $email, role: $role, password: $password)
  }
`;
