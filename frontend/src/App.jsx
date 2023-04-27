import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Exercise from "./Views/Exercise";
import Word from "./Views/Word";
import Auth from "./Views/Auth";
import Dashboard from "./Views/Dashboard";
import Notebooks from "./Views/Notebooks";
import Notebook from "./Views/Notebook";
import AllWords from "./Views/AllWords"
import NotFound from "./Views/NotFound";
import NotAuthorized from "./Views/NotAuthorized";
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Auth/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/exercise" element={<Exercise />} />
        <Route path="/words" element={<AllWords />} />
        <Route path="/word/:id" element={<Word />} />
        <Route path="/notebooks" element={<Notebooks />} />
        <Route path="/notebook/:id" element={<Notebook />} />
        <Route path="/not-authorized" element={<NotAuthorized />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
