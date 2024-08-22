import "./InfoBox.css";

interface InfoBoxProps {
  type: "info" | "error";
  text: string;
  className?: string;
}

export const InfoBox = ({ type, text, className }: InfoBoxProps) => {
  return (
    <div className={`box ${type === "info" ? "info" : "error"} ${className}`}>
      {text}
    </div>
  );
};
