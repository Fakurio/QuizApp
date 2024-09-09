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
import { useAuth } from "../../contexts/AuthContext";

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
  const { refreshTokens } = useAuth();

  useEffect(() => {
    const sendGameSummaryToServer = async () => {
      localStorage.removeItem("gameCode");
      try {
        sendGameSummary({
          variables: {
            gameCode: gameCode,
            playerAnswers: playerAnswers,
            playerScore: playerPoints,
          },
        });
      } catch (error: any) {
        if (error.message === "Unauthorized") {
          await refreshTokens();
          sendGameSummaryToServer();
        }
      }
    };
    console.log("GameSummaryProps", playerPoints, playerAnswers, gameCode);
    // sendGameSummaryToServer();
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
