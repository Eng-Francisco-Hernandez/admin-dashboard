import { gql } from "@apollo/client";

export const CREATE_GRAPH_M = gql`
  mutation createGraph($graph: GraphInput!) {
    createGraph(graph: $graph)
  }
`;

export const EDIT_GRAPH_M = gql`
  mutation editGraph($graph: GraphInput!, $id: String!) {
    editGraph(graph: $graph, id: $id)
  }
`;
