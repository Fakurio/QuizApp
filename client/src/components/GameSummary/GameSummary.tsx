import "./GameSummary.css";

interface GameSummaryProps {
  playerPoints: number;
}

const GameSummary = ({ playerPoints }: GameSummaryProps) => {
  return (
    <div className="game-summary">
      <h1 className="game-summary__heading">Your score: {playerPoints}</h1>
    </div>
  );
};

export default GameSummary;
