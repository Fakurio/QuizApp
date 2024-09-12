import { gql } from "@apollo/client";
export const ON_NEW_QUESTION = gql`
  subscription OnNewQuestion($gameCode: String!) {
    newQuestion(gameCode: $gameCode) {
      id
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

export const ON_OPPONENT_FOUND = gql`
  subscription OnOpponentFound($playerID: Int!) {
    opponentFound(playerID: $playerID) {
      gameCode
    }
  }
`;

export const ON_OPPONENT_ANSWER = gql`
  subscription OnOpponentAnswer($gameCode: String!, $playerID: Int!) {
    opponentAnswer(gameCode: $gameCode, playerID: $playerID) {
      isCorrect
    }
  }
`;

export const ON_OPPONENT_DISCONNECTED = gql`
  subscription OnOpponentDisconnected($gameCode: String!) {
    opponentDisconnected(gameCode: $gameCode) {
      gameCode
    }
  }
`;
