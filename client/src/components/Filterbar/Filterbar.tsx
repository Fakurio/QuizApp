import { ChangeEvent, MutableRefObject } from "react";
import { GameMode } from "../../__generated__/graphql";
import { useCategories } from "../../contexts/CategoriesContext";
import { Filters } from "../HistoryPage/HistoryPage";
import "./Filterbar.css";

interface FilterbarProps {
  filters: MutableRefObject<Filters>;
  onFiltersChange: (filters: Filters) => void;
}

const Filterbar: React.FC<FilterbarProps> = ({ onFiltersChange, filters }) => {
  const { categories } = useCategories();

  const handleFiltersChange = (e: ChangeEvent<HTMLSelectElement>) => {
    filters.current = { ...filters.current, [e.target.name]: e.target.value };
    onFiltersChange(filters.current);
  };

  return (
    <div className="filterbar">
      <select
        className="filterbar__select"
        name="category"
        onChange={(e) => handleFiltersChange(e)}
        defaultValue="default"
      >
        <option disabled hidden value="default">
          Sort by category
        </option>
        <option value="">All</option>
        {categories?.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <select
        className="filterbar__select"
        name="gameMode"
        onChange={(e) => handleFiltersChange(e)}
        defaultValue="default"
      >
        <option disabled hidden value="default">
          Sort by gamemode
        </option>
        <option value="">All</option>
        {Object.keys(GameMode).map((mode) => (
          <option key={mode} value={mode}>
            {mode}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filterbar;
