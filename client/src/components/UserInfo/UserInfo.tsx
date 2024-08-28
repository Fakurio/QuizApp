import "./UserInfo.css";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import AvatarPlaceholder from "../../assets/avatar-placeholder.png";

const UserInfo = () => {
  const { user, logout } = useAuth();
  if (user) {
    return (
      <div className="user-info-container">
        <div className="user-info">
          <img
            src={user.avatarUrl || AvatarPlaceholder}
            className="user-info__avatar"
          />
          <p className="user-info__username">{user.username}</p>
        </div>
        <Button text="Logout" onClick={() => logout()} />
      </div>
    );
  } else {
    return (
      <Link to="/login">
        <div className="header__login">
          <Button text="Login" />
        </div>
      </Link>
    );
  }
};

export default UserInfo;
