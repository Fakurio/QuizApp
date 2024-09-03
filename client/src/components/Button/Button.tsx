import { Link } from "react-router-dom";
import "./Button.css";

interface ButtonProps {
  icon?: string;
  text: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  link?: string;
}

const Button = ({
  icon,
  text,
  onClick,
  className,
  type,
  link,
}: ButtonProps) => {
  if (link) {
    return (
      <Link to={link}>
        <button
          className={`button ${className}`}
          onClick={onClick}
          type={type || "button"}
        >
          {icon && <img src={icon} className="button__icon" />}
          <span>{text}</span>
        </button>
      </Link>
    );
  } else {
    return (
      <button
        className={`button ${className}`}
        onClick={onClick}
        type={type || "button"}
      >
        {icon && <img src={icon} className="button__icon" />}
        <span>{text}</span>
      </button>
    );
  }
};

export default Button;
