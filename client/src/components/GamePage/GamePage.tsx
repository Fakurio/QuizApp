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
  GameMode,
  CreateSoloGameMutationVariables,
  CreateSoloGameMutation,
  PlayerAnswers,
  OnOpponentAnswerSubscription,
  OnOpponentAnswerSubscriptionVariables,
  OnOpponentDisconnectedSubscription,
  OnOpponentDisconnectedSubscriptionVariables,
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
  CREATE_SOLO_GAME_MUTATION,
} from "../../api/mutations";
import {
  ON_NEW_QUESTION,
  ON_OPPONENT_ANSWER,
  ON_OPPONENT_DISCONNECTED,
} from "../../api/subscriptions";
import { useAuth } from "../../contexts/AuthContext";

const GamePage = () => {
  const { user, refreshTokens } = useAuth();
  const location = useLocation();
  const [createGame] = useMutation<
    CreateGameMutation,
    CreateGameMutationVariables
  >(CREATE_GAME_MUTATION);
  const [createSoloGame] = useMutation<
    CreateSoloGameMutation,
    CreateSoloGameMutationVariables
  >(CREATE_SOLO_GAME_MUTATION);

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
  const { data: opponentAnswer } = useSubscription<
    OnOpponentAnswerSubscription,
    OnOpponentAnswerSubscriptionVariables
  >(ON_OPPONENT_ANSWER, {
    variables: {
      gameCode: location.state.gameData.gameCode,
      playerID: user?.id || 0,
    },
  });
  const { data: opponentDisconnected } = useSubscription<
    OnOpponentDisconnectedSubscription,
    OnOpponentDisconnectedSubscriptionVariables
  >(ON_OPPONENT_DISCONNECTED, {
    variables: {
      gameCode: location.state.gameData.gameCode,
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
  const [playerAnswers, setPlayerAnswers] = useState<PlayerAnswers[]>([]);
  const [showOpponentAnswer, setShowOpponentAnswer] = useState(false);
  const playerPoints = useRef(0);
  const questionAmount = useRef(0);
  const unansweredQuestionIDs = useRef<number[]>([]);

  const startGame = async () => {
    const gameData = location.state.gameData;
    if (gameData.gameMode === GameMode.Multiplayer) {
      return;
    }
    try {
      if (!user) {
        await createGame({
          variables: {
            gameData: gameData,
          },
        });
      } else if (gameData.gameMode === GameMode.Solo) {
        await createSoloGame({
          variables: {
            gameData: gameData,
          },
        });
      }
    } catch (error: any) {
      if (error.message === "Unauthorized") {
        await refreshTokens();
        startGame();
      }
    }
  };

  const handleTimerEnd = () => {
    setShowCorrectAnswer(true);
    if (unansweredQuestionIDs.current.length !== 0) {
      setPlayerAnswers((prev) => {
        return [
          ...prev,
          {
            questionID: unansweredQuestionIDs.current.pop()!,
            isCorrect: false,
          },
        ];
      });
    }
  };

  const handleAnswerSelection = (isCorrect: boolean, questionID: number) => {
    if (isCorrect) {
      playerPoints.current += 1;
    }
    setShowCorrectAnswer(true);
    unansweredQuestionIDs.current = unansweredQuestionIDs.current.filter(
      (id) => id !== questionID
    );
    setPlayerAnswers((prev) => {
      return [...prev, { questionID, isCorrect }];
    });

    if (location.state.gameData.gameMode === GameMode.Multiplayer) {
      endRound({
        variables: {
          gameCode: location.state.gameData.gameCode,
          currentAnswer: {
            playerID: user?.id || 0,
            isCorrect: isCorrect,
          },
        },
      });
    } else {
      setTimeout(() => {
        endRound({
          variables: {
            gameCode: location.state.gameData.gameCode,
          },
        });
      }, (data?.newQuestion.latency || 1) * 1000);
    }
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
      setShowOpponentAnswer(false);
      unansweredQuestionIDs.current.push(data.newQuestion.id);
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

  useEffect(() => {
    if (opponentAnswer?.opponentAnswer) {
      setShowOpponentAnswer(true);
    }
  }, [opponentAnswer]);

  useEffect(() => {
    if (opponentDisconnected?.opponentDisconnected) {
      alert("Opponent disconnected");
      localStorage.removeItem("gameCode");
      navigate("/", { replace: true });
    }
  }, [opponentDisconnected]);

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
        <GameSummary
          gameCode={user ? location.state.gameData.gameCode : null}
          playerPoints={playerPoints.current}
          playerAnswers={playerAnswers}
        />
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
              onTimerEnd={handleTimerEnd}
              onTimerStart={() => setShowCorrectAnswer(false)}
            />
          </div>
          <QuestionCard
            key={data.newQuestion.id}
            question={data.newQuestion}
            showCorrectAnswer={showCorrectAnswer}
            onAnswerSelection={handleAnswerSelection}
          />
          {opponentAnswer && showOpponentAnswer && (
            <InfoBox
              type="info"
              text={
                opponentAnswer.opponentAnswer.isCorrect
                  ? "Opponent answered correctly"
                  : "Opponent answered incorrectly"
              }
              className="game-page__opponent-answer"
            />
          )}
        </>
      )}
    </div>
  );
};

export default GamePage;
