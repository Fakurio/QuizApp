import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./GameSummary.css";
import { SEND_GAME_SUMMARY_MUTATION } from "../../api/mutations";
import {
  GetUserGamesHistoryQuery,
  PlayerAnswers,
  SendGameSummaryMutation,
  SendGameSummaryMutationVariables,
} from "../../__generated__/graphql";
import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { USER_GAME_HISTORY_QUERY } from "../../api/queries";

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
  >(SEND_GAME_SUMMARY_MUTATION, {
    update(cache, { data }) {
      const existingData = cache.readQuery<GetUserGamesHistoryQuery>({
        query: USER_GAME_HISTORY_QUERY,
      });
      if (existingData) {
        cache.writeQuery({
          query: USER_GAME_HISTORY_QUERY,
          data: {
            getUserGamesHistory: {
              ...existingData.getUserGamesHistory,
              history: [
                data?.sendGameSummary,
                ...existingData.getUserGamesHistory.history,
              ],
              totalCount: existingData.getUserGamesHistory.totalCount + 1,
            },
          },
        });
      }
    },
  });
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
    sendGameSummaryToServer();
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
