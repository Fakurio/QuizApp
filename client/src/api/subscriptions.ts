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
