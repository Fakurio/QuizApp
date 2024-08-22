import "./Button.css";

interface ButtonProps {
  icon?: string;
  text: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button = ({ icon, text, onClick, className, type }: ButtonProps) => {
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
};

export default Button;
