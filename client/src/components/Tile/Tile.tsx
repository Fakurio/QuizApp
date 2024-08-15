import "./Tile.css";

interface TileProps {
  category: string;
  icon?: string;
}

const Tile = ({ category, icon }: TileProps) => {
  return (
    <div className="tile">
      {icon && <img src={icon} className="tile__icon" />}
      <span>{category}</span>
    </div>
  );
};

export default Tile;
