import Button from "../Button/Button";
import "./PregamePage.css";
import { gql, useQuery } from "@apollo/client";
import { Link, useLocation } from "react-router-dom";
import { FormEvent, useState } from "react";
import { InfoBox } from "../InfoBox/InfoBox";
import { v4 as uuidv4 } from "uuid";
import {
  GameInput,
  GameMode,
  GetDifficultiesQuery,
} from "../../__generated__/graphql";
import toFirstLetterUppercase from "../../utils/first-letter-uppercase";

const DIFFICULTY_QUERY = gql`
  query GetDifficulties {
    difficulties {
      id
      name
    }
  }
`;

const PregamePage = () => {
  const { data, loading, error } =
    useQuery<GetDifficultiesQuery>(DIFFICULTY_QUERY);
  const location = useLocation();
  const [gameData, setGameData] = useState<GameInput>({
    gameCode: uuidv4(),
    categoryName: location.state.category,
    difficultyName: "",
    gameMode: GameMode.Solo,
  });
  const [isFormValid, setIsFormValid] = useState(true);

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
    console.log(gameData);
  };

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
          <Button
            text="Multiplayer"
            onClick={() => onGameModeChange(GameMode.Multiplayer)}
            className={`${
              gameData.gameMode === GameMode.Multiplayer
                ? "pregame-form__section__button--active"
                : undefined
            }`}
          />
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
