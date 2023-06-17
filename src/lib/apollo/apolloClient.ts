import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";

import { onError } from "@apollo/client/link/error";

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, path }) => {
      return console.log(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: `${process.env.REACT_APP_BACKEND_BASE_URL}/graphql` }),
]);

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});
