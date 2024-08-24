import "./GamePage.css";
import {
  useLocation,
  Navigate,
  useNavigate,
  useNavigationType,
} from "react-router-dom";
import { gql, useMutation, useSubscription } from "@apollo/client";
import {
  CreateGameMutation,
  CreateGameMutationVariables,
  OnNewQuestionSubscription,
  OnNewQuestionSubscriptionVariables,
} from "../../__generated__/graphql";
import QuestionCard from "../QuestionCard/QuestionCard";
import { useEffect, useState, useRef } from "react";
import Timer from "../Timer/Timer";
import { InfoBox } from "../InfoBox/InfoBox";
import GameSummary from "../GameSummary/GameSummary";

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
      latency
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

  const { data, loading, error } = useSubscription<
    OnNewQuestionSubscription,
    OnNewQuestionSubscriptionVariables
  >(ON_NEW_QUESTION, {
    variables: {
      gameCode: location.state?.gameData.gameCode || "",
    },
  });
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const playerPoints = useRef(0);
  const questionAmount = useRef(0);

  const startGame = async () => {
    console.log("Game page", location.state.gameData.gameCode);
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

  const handleAnswerSelection = (isCorrect: boolean, answer?: string) => {
    if (isCorrect) {
      playerPoints.current += 1;
    }
  };

  useEffect(() => {
    const waitForGameStart = async () => {
      await startGame();
    };
    waitForGameStart();
  }, []);

  useEffect(() => {
    if (data?.newQuestion) {
      setQuestionNumber((prev) => prev + 1);
    }
    if (data?.newQuestion.questionAmount) {
      questionAmount.current = data.newQuestion.questionAmount;
    }
  }, [data]);

  useEffect(() => {
    if (questionNumber === questionAmount.current && showCorrectAnswer) {
      setShowSummary(true);
    }
  }, [questionNumber, showCorrectAnswer, questionAmount]);

  if (!location.state) {
    return <Navigate to="/" />;
  }
  if (loading) {
    return (
      <div className="game-page">
        <InfoBox type="info" text="Loading..." />
      </div>
    );
  }
  if (error) {
    return (
      <div className="game-page">
        <InfoBox
          type="error"
          text="An error occurred. Please try again later."
        />
      </div>
    );
  }
  if (showSummary) {
    return (
      <div className="game-page">
        <GameSummary playerPoints={playerPoints.current} />
      </div>
    );
  }
  return (
    <div className="game-page">
      {data && (
        <>
          <div className="game-page__round-info">
            <p className="game-page__round-info__round">
              Question: {questionNumber}/{questionAmount.current}
            </p>
            <Timer
              key={data.newQuestion.startTime}
              startTime={data.newQuestion.startTime}
              duration={data.newQuestion.duration}
              onTimerEnd={() => setShowCorrectAnswer(true)}
              onTimerStart={() => setShowCorrectAnswer(false)}
            />
          </div>
          <QuestionCard
            key={data.newQuestion.name}
            question={data.newQuestion}
            showCorrectAnswer={showCorrectAnswer}
            onAnswerSelection={handleAnswerSelection}
          />
        </>
      )}
    </div>
  );
};

export default GamePage;
