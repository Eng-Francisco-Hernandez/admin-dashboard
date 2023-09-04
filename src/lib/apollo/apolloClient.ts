import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";

import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";
import { setContext } from "@apollo/client/link/context";

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, path }) => {
      return console.log(`Graphql error ${message}`);
    });
  }
  if (networkError) {
    switch (JSON.parse(JSON.stringify(networkError)).statusCode) {
      case 401:
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.replace("/login");
        break;
      case 403:
        fetchAccessToken();
    }
  }
});

const fetchAccessToken = () => {
  fetch(`${process.env.REACT_APP_BACKEND_BASE_URL!}/graphql`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      operationName: "refreshToken",
      query: `mutation refreshToken($token: String!) {  refreshToken(token: $token)}`,
      variables: {
        token: localStorage.getItem("refreshToken"),
      },
    }),
  }).then(async (data) => {
    const tokenData = await data.json();
    if (tokenData.data.refreshToken === null) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.replace("/login");
    } else {
      localStorage.setItem("accessToken", tokenData.data.refreshToken);
    }
  });
};

const retryLink = new RetryLink();

const authLink = setContext((_, { headers }) => {
  const accessToken = localStorage.getItem("accessToken");
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_BACKEND_BASE_URL}/graphql`,
});

export const link = from([retryLink, authLink, errorLink, httpLink]);

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false
  }),
  link: link,
});
