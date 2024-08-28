import "./Header.css";
import Logo from "../../assets/logo.svg";
import Searchbar from "../Searchbar/Searchbar";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={Logo}></img>
        <h1>QuizApp</h1>
      </div>
      <Searchbar />
      <Link to="/login">
        <div className="header__login">
          <Button text="Login" />
        </div>
      </Link>
    </header>
  );
};

export default Header;
