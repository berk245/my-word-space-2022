import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Exercise from "./Views/Exercise";
import Word from "./Views/Word";
import Auth from "./Views/Auth";
import Dashboard from "./Views/Dashboard";
import Notebook from "./Views/Notebook";
import NotFound from "./Views/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/exercise" element={<Exercise />} />
        <Route path="/word" element={<Word />} />
        <Route path="/notebook" element={<Notebook />} />
        <Route path="/notebook" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
