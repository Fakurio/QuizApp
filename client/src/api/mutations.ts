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
  mutation endRound($gameCode: String!, $currentAnswer: CurrentAnswer) {
    endRound(gameCode: $gameCode, currentAnswer: $currentAnswer)
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
    $playerScore: Int!
  ) {
    sendGameSummary(
      gameCode: $gameCode
      playerAnswers: $playerAnswers
      playerScore: $playerScore
    )
  }
`;

export const SEEK_GAME_MUTATION = gql`
  mutation seekGame($seekGameInput: SeekGameInput!) {
    seekGame(seekGameInput: $seekGameInput)
  }
`;

export const CANCEL_SEEKING_GAME_MUTATION = gql`
  mutation cancelSeekingGame($seekGameInput: SeekGameInput!) {
    cancelSeekingGame(seekGameInput: $seekGameInput)
  }
`;
