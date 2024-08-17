import "./InfoBox.css";

interface InfoBoxProps {
  type: "info" | "error";
  text: string;
}

export const InfoBox = ({ type, text }: InfoBoxProps) => {
  return (
    <div className={`box ${type === "info" ? "info" : "error"}`}>{text}</div>
  );
};
