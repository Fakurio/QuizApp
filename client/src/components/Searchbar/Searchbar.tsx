import "./Searchbar.css";
import MagnifyingGlass from "../../assets/magnifying-glass.svg";
import { useRef } from "react";
import { useCategories } from "../../contexts/CategoriesContext";

const Searchbar = () => {
  const searchbarInputRef = useRef<HTMLInputElement>(null);
  const { filterCategories } = useCategories();
  return (
    <div
      className="searchbar"
      onClick={() => searchbarInputRef.current?.focus()}
    >
      <img src={MagnifyingGlass} className="searchbar__icon"></img>
      <input
        type="text"
        placeholder="Search quiz"
        className="searchbar__input"
        ref={searchbarInputRef}
        onChange={() =>
          filterCategories(searchbarInputRef.current?.value || "")
        }
      ></input>
    </div>
  );
};

export default Searchbar;
