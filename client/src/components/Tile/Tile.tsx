import "./Tile.css";

interface TileProps {
  category: string;
  icon?: string;
}

const Tile = ({ category, icon }: TileProps) => {
  return (
    <div className="tile">
      {icon && (
        <img
          src={`${import.meta.env.VITE_API_URL}/icons/${icon}`}
          className="tile__icon"
        />
      )}
      <span>{category}</span>
    </div>
  );
};

export default Tile;
