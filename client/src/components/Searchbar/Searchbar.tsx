import "./Searchbar.css";
import MagnifyingGlass from "../../assets/magnifying-glass.svg";
import { useRef } from "react";

const Searchbar = () => {
  const searchbarInputRef = useRef<HTMLInputElement>(null);

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
      ></input>
    </div>
  );
};

export default Searchbar;
