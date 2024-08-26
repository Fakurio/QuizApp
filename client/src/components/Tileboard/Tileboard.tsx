import Tile from "../Tile/Tile";
import "./Tileboard.css";
import { InfoBox } from "../InfoBox/InfoBox";
import { useCategories } from "../../contexts/CategoriesContext";

const Tileboard = () => {
  const { filteredCategories, loading, error } = useCategories();

  if (loading) {
    return (
      <div className="tileboard">
        <InfoBox type="info" text="Loading..." />
      </div>
    );
  }
  if (error) {
    return (
      <div className="tileboard">
        <InfoBox type="error" text="Failed to fetch categories from server" />
      </div>
    );
  }
  return (
    <div className="tileboard">
      {filteredCategories &&
        filteredCategories.map((category) => (
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
