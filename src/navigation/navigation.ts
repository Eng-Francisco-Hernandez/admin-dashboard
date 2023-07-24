export type RouteNavigationType = {
  element: string;
  path: string;
  public: boolean;
};

export const Navigation: { [key: string]: RouteNavigationType } = {
  LOGIN: {
    element: "Login",
    path: "/login",
    public: true
  },
  REGISTER: {
    element: "Register",
    path: "/register",
    public: true
  },
  HOME: {
    element: "Home",
    path: "/home",
    public: false
  },
  CREATE: {
    element: "Create",
    path: "/create",
    public: false
  },
};
