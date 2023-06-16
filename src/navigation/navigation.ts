export type RouteNavigationType = {
  element: string;
  path: string;
};

export const Navigation: { [key: string]: RouteNavigationType } = {
  LOGIN: {
    element: "Login",
    path: "/login",
  },
  SIGNUP: {
    element: "SignUp",
    path: "/signup",
  },
};
