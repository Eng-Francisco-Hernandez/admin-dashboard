import { gql } from "@apollo/client";

export const REGISTER_M = gql`
  mutation register($email: String!, $role: String!, $password: String!) {
    register(email: $email, role: $role, password: $password)
  }
`;
