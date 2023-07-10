import { gql } from "@apollo/client";

export const GET_DATA_Q = gql`
  query getData {
    getData {
      name
      uv
      pv
      amt
    }
  }
`;
