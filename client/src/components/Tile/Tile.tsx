import "./Tile.css";
import { Link } from "react-router-dom";

interface TileProps {
  category: string;
  icon?: string;
}

const Tile = ({ category, icon }: TileProps) => {
  return (
    <Link to="/pregame" state={{ category }}>
      <div className="tile">
        {icon && (
          <img
            src={`${import.meta.env.VITE_HTML_URL}/icons/${icon}`}
            className="tile__icon"
          />
        )}
        <span>{category}</span>
      </div>
    </Link>
  );
};

export default Tile;
