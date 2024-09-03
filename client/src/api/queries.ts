import { gql } from "@apollo/client";
export const DIFFICULTY_QUERY = gql`
  query GetDifficulties {
    difficulties {
      id
      name
    }
  }
`;

export const CATEGORY_QUERY = gql`
  query GetCategories {
    categories {
      id
      name
      logo
    }
  }
`;

export const USER_GAME_HISTORY_QUERY = gql`
  query getUserGamesHistory {
    getUserGamesHistory {
      id
      categoryName
      questions {
        questionName
        isCorrectlyAnswered
      }
    }
  }
`;
