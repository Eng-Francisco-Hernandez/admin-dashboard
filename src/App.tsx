import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./navigation/routes";
import "./App.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<></>} />
      {ROUTES.map((r, key) => (
        <Route key={key} {...r} />
      ))}
    </Routes>
  );
}

export default App;
