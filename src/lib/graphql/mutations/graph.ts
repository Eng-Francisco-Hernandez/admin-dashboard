import { gql } from "@apollo/client";

export const CREATE_GRAPH_M = gql`
  mutation createGraph($graph: GraphInput!) {
    createGraph(graph: $graph)
  }
`;