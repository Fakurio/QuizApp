import "./Sidepanel.css";
import DashboardIcon from "../../assets/dashboard-icon.svg";
import HighlightsIcon from "../../assets/highlights-icon.svg";
import HistoryIcon from "../../assets/history-icon.svg";
import RankingIcon from "../../assets/ranking-icon.svg";
import Button from "../Button/Button";

interface Bookmark {
  name: string;
  icon: string;
}

const Sidepanel = () => {
  const bookmarks: Bookmark[] = [
    { name: "Dashboard", icon: DashboardIcon },
    { name: "Highlights", icon: HighlightsIcon },
    { name: "History", icon: HistoryIcon },
    { name: "Ranking", icon: RankingIcon },
  ];
  return (
    <aside className="sidepanel">
      <div className="sidepanel__container">
        {bookmarks.map((bookmark) => (
          <Button text={bookmark.name} icon={bookmark.icon} />
        ))}
      </div>
    </aside>
  );
};

export default Sidepanel;
