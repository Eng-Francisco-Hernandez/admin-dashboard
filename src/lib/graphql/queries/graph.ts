import { gql } from "@apollo/client";

export const GET_GRAPHS_Q = gql`
  query getGraphs {
    getGraphs {
      _id
      name
      points {
        data
      }
    }
  }
`;

export const GET_GRAPH_Q = gql`
  query getGraph($id: String!) {
    getGraph(id: $id) {
      name
      points {
        data
      }
    }
  }
`;
