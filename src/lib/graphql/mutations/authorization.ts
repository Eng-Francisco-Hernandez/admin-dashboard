import { gql } from "@apollo/client";

export const LOGIN_M = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
    }
  }
`;

export const LOGOUT_M = gql`
  mutation logout {
    logout
  }
`;

export const REFRESH_TOKEN_M = gql`
  mutation refreshToken($token: String!) {
    refreshToken(token: $token)
  }
`;
