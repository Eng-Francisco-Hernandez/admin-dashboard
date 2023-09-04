import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./lib";
import { HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ApolloProvider client={apolloClient}>
    <HashRouter basename={process.env.PUBLIC_URL}>
      <App />
    </HashRouter>
  </ApolloProvider>
);
