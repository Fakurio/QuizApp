import "./Header.css";
import Logo from "../../assets/logo.svg";
import Searchbar from "../Searchbar/Searchbar";
import UserInfo from "../UserInfo/UserInfo";

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={Logo}></img>
        <h1>QuizApp</h1>
      </div>
      <div className="header__searchbar">
        <Searchbar />
      </div>
      <div className="header__user-info">
        <UserInfo />
      </div>
    </header>
  );
};

export default Header;
