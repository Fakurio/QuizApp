import Button from "../Button/Button";
import "./PregamePage.css";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import {
  useLocation,
  useNavigate,
  Navigate,
  useNavigationType,
} from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { InfoBox } from "../InfoBox/InfoBox";
import { v4 as uuidv4 } from "uuid";
import {
  CancelSeekingGameMutation,
  CancelSeekingGameMutationVariables,
  GameInput,
  GameMode,
  GetDifficultiesQuery,
  OnOpponentFoundSubscription,
  OnOpponentFoundSubscriptionVariables,
  SeekGameMutation,
  SeekGameMutationVariables,
  StopGameMutation,
  StopGameMutationVariables,
} from "../../__generated__/graphql";
import toFirstLetterUppercase from "../../utils/first-letter-uppercase";
import {
  CANCEL_SEEKING_GAME_MUTATION,
  SEEK_GAME_MUTATION,
  STOP_GAME_MUTATION,
} from "../../api/mutations";
import { DIFFICULTY_QUERY } from "../../api/queries";
import { useAuth } from "../../contexts/AuthContext";
import { ON_OPPONENT_FOUND } from "../../api/subscriptions";

const PregamePage = () => {
  const { user } = useAuth();
  const { data, loading, error } =
    useQuery<GetDifficultiesQuery>(DIFFICULTY_QUERY);
  const [stopGame] = useMutation<StopGameMutation, StopGameMutationVariables>(
    STOP_GAME_MUTATION
  );
  const [seekGame] = useMutation<SeekGameMutation, SeekGameMutationVariables>(
    SEEK_GAME_MUTATION
  );
  const [cancelSeekingGame] = useMutation<
    CancelSeekingGameMutation,
    CancelSeekingGameMutationVariables
  >(CANCEL_SEEKING_GAME_MUTATION);
  // const { data, loading, error } = useSubscription<
  //   OnNewQuestionSubscription,
  //   OnNewQuestionSubscriptionVariables
  // >(ON_NEW_QUESTION, {
  //   variables: {
  //     gameCode: location.state?.gameData.gameCode || "",
  //   },
  // });
  const { data: onOpponentFoundData } = useSubscription<
    OnOpponentFoundSubscription,
    OnOpponentFoundSubscriptionVariables
  >(ON_OPPONENT_FOUND, {
    variables: {
      playerID: user!.id,
    },
  });
  const location = useLocation();
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const [gameData, setGameData] = useState<GameInput>({
    gameCode: "",
    categoryName: location.state?.category || "",
    difficultyName: "",
    gameMode: GameMode.Solo,
  });
  const [isFormValid, setIsFormValid] = useState(true);
  const [showWaitingScreen, setShowWaitingScreen] = useState(false);

  const onGameModeChange = (gameMode: GameMode) => {
    setGameData((prev) => ({ ...prev, gameMode }));
  };

  const onDifficultyChange = (difficultyName: string) => {
    setIsFormValid(true);
    setGameData((prev) => ({ ...prev, difficultyName }));
  };

  const startGame = (e: FormEvent) => {
    e.preventDefault();
    if (!gameData.difficultyName) {
      setIsFormValid(false);
      return;
    }
    if (gameData.gameMode === GameMode.Multiplayer) {
      seekGame({
        variables: {
          seekGameInput: {
            categoryName: gameData.categoryName,
            difficultyName: gameData.difficultyName,
          },
        },
      });
      setShowWaitingScreen(true);
      return;
    }
    navigate("/game", { state: { gameData } });
  };

  const onCancelSeekingGame = () => {
    cancelSeekingGame({
      variables: {
        seekGameInput: {
          categoryName: gameData.categoryName,
          difficultyName: gameData.difficultyName,
        },
      },
    });
    setShowWaitingScreen(false);
  };

  useEffect(() => {
    const savedGameCode = localStorage.getItem("gameCode");
    if (!savedGameCode) {
      const gameCode = uuidv4();
      localStorage.setItem("gameCode", gameCode);
      setGameData((prev) => ({ ...prev, gameCode }));
    } else {
      setGameData((prev) => ({ ...prev, gameCode: savedGameCode }));
    }
  }, []);

  useEffect(() => {
    if (navigationType === "POP") {
      const gameCode = localStorage.getItem("gameCode");
      localStorage.removeItem("gameCode");
      stopGame({ variables: { gameCode: gameCode! } });
      navigate("/", { replace: true });
    }
  }, [location, navigationType]);

  if (location.state === null) {
    return <Navigate to="/" />;
  }

  if (showWaitingScreen) {
    return (
      <div className="pregame-container">
        <InfoBox type="info" text="Waiting for opponent..." />
        <Button
          text="Cancel"
          onClick={onCancelSeekingGame}
          className="pregame-container__button"
        />
        {onOpponentFoundData && (
          <div>
            <p>{onOpponentFoundData.opponentFound.gameCode}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="pregame-container">
      <form className="pregame-form" onSubmit={(e) => startGame(e)}>
        <h1 className="pregame-form__heading">Select game mode</h1>
        <fieldset className="pregame-form__section">
          <Button
            text="Solo"
            onClick={() => onGameModeChange(GameMode.Solo)}
            className={`${
              gameData.gameMode === GameMode.Solo
                ? "pregame-form__section__button--active"
                : undefined
            }`}
          />
          {user && (
            <Button
              text="Multiplayer"
              onClick={() => onGameModeChange(GameMode.Multiplayer)}
              className={`${
                gameData.gameMode === GameMode.Multiplayer
                  ? "pregame-form__section__button--active"
                  : undefined
              }`}
            />
          )}
        </fieldset>
        <h1 className="pregame-form__heading">Select difficulty</h1>
        <fieldset className="pregame-form__section">
          {loading && <InfoBox type="info" text="Loading..." />}
          {error && (
            <InfoBox
              type="error"
              text="Failed to fetch difficulties from server"
            />
          )}
          {data &&
            data.difficulties.map((difficulty) => (
              <Button
                text={toFirstLetterUppercase(difficulty.name)}
                key={difficulty.id}
                onClick={() => onDifficultyChange(difficulty.name)}
                className={`${
                  gameData.difficultyName === difficulty.name
                    ? "pregame-form__section__button--active"
                    : undefined
                }`}
              />
            ))}
        </fieldset>
        {!isFormValid && (
          <InfoBox
            type="error"
            text="Please select a difficulty"
            className="pregame-form__error"
          />
        )}

        <Button
          text="Start game"
          className="pregame-form__start"
          type="submit"
        />
      </form>
    </div>
  );
};

export default PregamePage;
