import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";
import PregamePage from "./components/PregamePage/PregamePage";
import GamePage from "./components/GamePage/GamePage";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route index Component={Dashboard} />
        <Route path="/pregame" Component={PregamePage} />
        <Route path="/game" Component={GamePage} />
      </Routes>
    </div>
  );
}

export default App;
