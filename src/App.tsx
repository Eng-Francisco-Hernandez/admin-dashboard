import { Route, Routes, Navigate } from "react-router-dom";
import { ROUTES } from "./navigation/routes";
import "./App.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      {ROUTES.map((r, key) => (
        <Route key={key} {...r} />
      ))}
    </Routes>
  );
}

export default App;
