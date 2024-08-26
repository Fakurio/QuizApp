import { gql } from "@apollo/client";
export const STOP_GAME_MUTATION = gql`
  mutation StopGame($gameCode: String!) {
    stopGame(gameCode: $gameCode)
  }
`;

export const CREATE_GAME_MUTATION = gql`
  mutation createGame($gameData: GameInput!) {
    createGame(gameData: $gameData)
  }
`;

export const END_ROUND_MUTATION = gql`
  mutation endRound($gameCode: String!) {
    endRound(gameCode: $gameCode)
  }
`;
