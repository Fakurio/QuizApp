import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./GameSummary.css";
import { SEND_GAME_SUMMARY_MUTATION } from "../../api/mutations";
import {
  PlayerAnswers,
  SendGameSummaryMutation,
  SendGameSummaryMutationVariables,
} from "../../__generated__/graphql";
import { useMutation } from "@apollo/client";
import { useEffect } from "react";

interface GameSummaryProps {
  gameCode: string;
  playerPoints: number;
  playerAnswers: PlayerAnswers[];
}

const GameSummary = ({
  playerPoints,
  playerAnswers,
  gameCode,
}: GameSummaryProps) => {
  const [sendGameSummary] = useMutation<
    SendGameSummaryMutation,
    SendGameSummaryMutationVariables
  >(SEND_GAME_SUMMARY_MUTATION);

  useEffect(() => {
    console.log("Wysyłam odpowiedzi gracza", playerAnswers);
    sendGameSummary({
      variables: {
        gameCode: gameCode,
        playerAnswers: playerAnswers,
      },
    });
  }, []);

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
