import { gql } from "@apollo/client";

export const REGISTER_M = gql`
  mutation register($email: String!, $role: String!, $password: String!) {
    register(email: $email, role: $role, password: $password)
  }
`;

export const UPDATE_SELF_ROLE_M = gql`
  mutation updateSelfRole($newRole: String!) {
    updateSelfRole(newRole: $newRole)
  }
`;

export const UPDATE_ROLE_M = gql`
  mutation updateRole($userId: String!, $newRole: String!) {
    updateRole(userId: $userId, newRole: $newRole)
  }
`;
