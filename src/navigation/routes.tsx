import * as React from "react";

import { Navigation } from "./navigation";
import { Login, Register, Home } from "../pages";

const routeComponents: { [key: string]: JSX.Element } = {
  Login: <Login />,
  Register: <Register />,
  Home: <Home />,
};

export type RouteNavigationType = {
  element: JSX.Element;
  path: string;
  public: boolean;
};

export const ROUTES: Array<RouteNavigationType> = Object.keys(
  Navigation
).reduce(
  (acc: Array<RouteNavigationType>, curr) => [
    ...acc,
    {
      ...Navigation[curr],
      element: routeComponents[Navigation[curr].element],
    },
  ],
  []
);
