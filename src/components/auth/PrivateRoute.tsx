import React from "react";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const authed =
    localStorage.getItem("accessToken") && localStorage.getItem("refreshToken");

  return authed ? children : <Navigate to="/login" />;
}
