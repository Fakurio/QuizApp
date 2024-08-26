import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./GameSummary.css";

interface GameSummaryProps {
  playerPoints: number;
}

const GameSummary = ({ playerPoints }: GameSummaryProps) => {
  return (
    <div className="game-summary">
      <h1 className="game-summary__heading">Your score: {playerPoints}</h1>
      <Link to="/">
        <Button text="Return to menu" className="game-summary__button" />
      </Link>
    </div>
  );
};

export default GameSummary;
