import Tile from "../Tile/Tile";
import "./Tileboard.css";
import { gql, useQuery } from "@apollo/client";
import { GetCategoriesQuery } from "../../__generated__/graphql";
import { InfoBox } from "../InfoBox/InfoBox";

const CATEGORY_QUERY = gql`
  query GetCategories {
    categories {
      id
      name
      logo
    }
  }
`;

const Tileboard = () => {
  const { data, loading, error } = useQuery<GetCategoriesQuery>(CATEGORY_QUERY);

  return (
    <div className="tileboard">
      {loading && <InfoBox type="info" text="Loading..." />}
      {error && (
        <InfoBox type="error" text="Failed to fetch categories from server" />
      )}
      {!loading &&
        !error &&
        data!.categories.map((category) => (
          <Tile
            category={category.name}
            icon={category.logo}
            key={category.id}
          ></Tile>
        ))}
    </div>
  );
};

export default Tileboard;
