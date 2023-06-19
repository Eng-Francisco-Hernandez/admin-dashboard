import { Route, Routes, Navigate } from "react-router-dom";
import { ROUTES } from "./navigation/routes";
import "./App.scss";
import { PrivateRoute } from "./components";

function App() {
  const authed =
    localStorage.getItem("accessToken") && localStorage.getItem("refreshToken");
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
    </Routes>
  );
}

export default App;
