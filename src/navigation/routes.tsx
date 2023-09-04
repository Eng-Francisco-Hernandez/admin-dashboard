import * as React from "react";

import { Navigation } from "./navigation";
import { Login, Register, Home, Create } from "../pages";
import Edit from "../pages/Edit";

const routeComponents: { [key: string]: JSX.Element } = {
  Login: <Login />,
  Register: <Register />,
  Home: <Home />,
  Create: <Create />,
  Edit: <Edit />,
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
