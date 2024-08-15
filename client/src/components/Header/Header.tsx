import "./Header.css";
import Logo from "../../assets/logo.svg";
import Searchbar from "../Searchbar/Searchbar";
import Button from "../Button/Button";

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={Logo}></img>
        <h1>QuizApp</h1>
      </div>
      <Searchbar />
      <div className="header__login">
        <Button text="Login" />
      </div>
    </header>
  );
};

export default Header;
