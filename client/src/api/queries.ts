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
