import "./GamePage.css";
import {
  useLocation,
  Navigate,
  useNavigate,
  useNavigationType,
} from "react-router-dom";
import { useMutation, useSubscription } from "@apollo/client";
import {
  CreateGameMutation,
  CreateGameMutationVariables,
  OnNewQuestionSubscription,
  OnNewQuestionSubscriptionVariables,
  EndRoundMutation,
  EndRoundMutationVariables,
  StopGameMutation,
  StopGameMutationVariables,
} from "../../__generated__/graphql";
import QuestionCard from "../QuestionCard/QuestionCard";
import { useEffect, useState, useRef } from "react";
import Timer from "../Timer/Timer";
import { InfoBox } from "../InfoBox/InfoBox";
import GameSummary from "../GameSummary/GameSummary";
import {
  STOP_GAME_MUTATION,
  CREATE_GAME_MUTATION,
  END_ROUND_MUTATION,
} from "../../api/mutations";
import { ON_NEW_QUESTION } from "../../api/subscriptions";

const GamePage = () => {
  const location = useLocation();
  const [createGame] = useMutation<
    CreateGameMutation,
    CreateGameMutationVariables
  >(CREATE_GAME_MUTATION);
  const [endRound] = useMutation<EndRoundMutation, EndRoundMutationVariables>(
    END_ROUND_MUTATION
  );
  const { data, loading, error } = useSubscription<
    OnNewQuestionSubscription,
    OnNewQuestionSubscriptionVariables
  >(ON_NEW_QUESTION, {
    variables: {
      gameCode: location.state?.gameData.gameCode || "",
    },
  });
  const [stopGame] = useMutation<StopGameMutation, StopGameMutationVariables>(
    STOP_GAME_MUTATION
  );
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const playerPoints = useRef(0);
  const questionAmount = useRef(0);

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

  const handleAnswerSelection = (isCorrect: boolean, answer?: string) => {
    if (isCorrect) {
      playerPoints.current += 1;
    }
    setShowCorrectAnswer(true);
    setTimeout(() => {
      endRound({
        variables: {
          gameCode: location.state.gameData.gameCode,
        },
      });
    }, (data?.newQuestion.latency || 1) * 1000);
  };

  useEffect(() => {
    const waitForGameStart = async () => {
      await startGame();
    };
    waitForGameStart();
  }, []);

  useEffect(() => {
    if (navigationType === "POP" && !loading) {
      const gameCode = location.state.gameData.gameCode;
      stopGame({ variables: { gameCode } });
      navigate("/", { replace: true });
    }
  }, [location, navigationType, loading]);

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
      setTimeout(() => {
        setShowSummary(true);
      }, (data?.newQuestion.latency || 1) * 1000);
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
