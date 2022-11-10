import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Exercise from "./Views/Exercise";
import Word from "./Views/Word";
import Auth from "./Views/Auth";
import Dashboard from "./Views/Dashboard";
import Notebook from "./Views/Notebook";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Auth} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/exercise" component={Exercise} />
        <Route path="/word" component={Word} />
        <Route path="/notebook" component={Notebook} />
      </Switch>
    </Router>
  );
}

export default App;
