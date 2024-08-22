import "./GamePage.css";
import { useLocation } from "react-router-dom";
import { gql, useMutation, useSubscription } from "@apollo/client";
import {
  CreateGameMutation,
  CreateGameMutationVariables,
  OnNewQuestionSubscription,
  OnNewQuestionSubscriptionVariables,
} from "../../__generated__/graphql";

const CREATE_GAME_MUTATION = gql`
  mutation createGame($gameData: GameInput!) {
    createGame(gameData: $gameData)
  }
`;

const ON_NEW_QUESTION = gql`
  subscription OnNewQuestion($gameCode: String!) {
    newQuestion(gameCode: $gameCode) {
      name
      answer {
        correct
        incorrect
      }
      startTime
      duration
      questionAmount
    }
  }
`;

const GamePage = () => {
  const location = useLocation();
  const [createGame] = useMutation<
    CreateGameMutation,
    CreateGameMutationVariables
  >(CREATE_GAME_MUTATION);
  const { data, loading } = useSubscription<
    OnNewQuestionSubscription,
    OnNewQuestionSubscriptionVariables
  >(ON_NEW_QUESTION, {
    variables: {
      gameCode: location.state.gameData.gameCode,
    },
  });

  const startGame = async () => {
    const gameData = location.state.gameData;
    try {
      await createGame({
        variables: {
          gameData: gameData,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="game-page">
      <button onClick={() => startGame()}>START</button>
      {!loading && data && <p>{data.newQuestion.name}</p>}
      {!loading && data && <p>{data.newQuestion.answer.correct}</p>}
      {!loading && data && <p>{data.newQuestion.answer.incorrect}</p>}
      {!loading && data && <p>{data.newQuestion.questionAmount}</p>}
      {!loading && data && <p>{data.newQuestion.duration}</p>}
      {!loading && data && <p>{data.newQuestion.startTime}</p>}
      <h1>Game Page</h1>
    </div>
  );
};

export default GamePage;
