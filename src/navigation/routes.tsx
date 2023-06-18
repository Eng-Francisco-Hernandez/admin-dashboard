import * as React from "react";

import { Navigation } from "./navigation";
import { Login, Register } from "../pages";

const routeComponents: { [key: string]: React.ReactNode } = {
  Login: <Login />,
  Register: <Register />,
};

export type RouteNavigationType = {
  element: React.ReactNode;
  path: string;
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
