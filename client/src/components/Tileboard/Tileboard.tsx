import Tile from "../Tile/Tile";
import "./Tileboard.css";
import Logo from "../../assets/dashboard-icon.svg";

const Tileboard = () => {
  //For now, later fetch from API
  const categories = [
    "Anime and Manga",
    "Video Games",
    "Science Computers",
    "Sports",
    "Vehicles",
    "Music",
    "Celebrities",
    "Science Gadgets",
    "Science and Nature",
    "Science Mathematics",
    "Science Physics",
    "Science Chemistry",
    "Science Biology",
    "Science Geology",
    "Science Astronomy",
    "Science Science",
    "Science Technology",
    "Science Computers",
    "Science Gadgets",
  ];

  return (
    <div className="tileboard">
      {categories.map((category) => Tile({ category, icon: Logo }))}
    </div>
  );
};

export default Tileboard;
