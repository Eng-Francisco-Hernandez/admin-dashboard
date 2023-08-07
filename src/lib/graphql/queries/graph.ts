import { gql } from "@apollo/client";

export const GET_GRAPHS_Q = gql`
  query getGraphs {
    getGraphs {
      name
      points {
        data
      }
    }
  }
`;
