import { Route, Routes, Navigate } from "react-router-dom";
import { ROUTES } from "./navigation/routes";
import "./App.scss";
import { PrivateRoute } from "./components";
import { useEffect } from "react";

function App() {
  const authed =
    localStorage.getItem("accessToken") && localStorage.getItem("refreshToken");

  // API Healthcheck
  useEffect(() => {
    async function healthCheck() {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL!}`);
      const hc: any = await res.json();
      console.log(hc.status);
    }
    healthCheck();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={authed ? <Navigate to="/home" /> : <Navigate to="/login" />}
      />
      {ROUTES.map((r, key) =>
        r.public ? (
          <Route key={key} {...r} />
        ) : (
          <Route
            key={key}
            {...r}
            element={<PrivateRoute>{r.element}</PrivateRoute>}
          />
        )
      )}
      <Route
        path="/*"
        element={authed ? <Navigate to="/home" /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

export default App;
