import "./Button.css";

interface ButtonProps {
  icon?: string;
  text: string;
  onClick?: () => void;
}

const Button = ({ icon, text, onClick }: ButtonProps) => {
  return (
    <button className="button" onClick={onClick}>
      {icon && <img src={icon} className="button__icon" />}
      <span>{text}</span>
    </button>
  );
};

export default Button;
