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

export const CREATE_SOLO_GAME_MUTATION = gql`
  mutation createSoloGame($gameData: GameInput!) {
    createSoloGame(gameData: $gameData)
  }
`;

export const SEND_GAME_SUMMARY_MUTATION = gql`
  mutation sendGameSummary(
    $gameCode: String!
    $playerAnswers: [PlayerAnswers!]!
  ) {
    sendGameSummary(gameCode: $gameCode, playerAnswers: $playerAnswers)
  }
`;
