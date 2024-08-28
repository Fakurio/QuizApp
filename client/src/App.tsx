import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";
import PregamePage from "./components/PregamePage/PregamePage";
import GamePage from "./components/GamePage/GamePage";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import LoginForm from "./components/LoginForm/LoginForm";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route index Component={Dashboard} />
        <Route path="/pregame" Component={PregamePage} />
        <Route path="/game" Component={GamePage} />
        <Route path="/register" Component={RegisterForm} />
        <Route path="/login" Component={LoginForm} />
      </Routes>
    </div>
  );
}

export default App;
