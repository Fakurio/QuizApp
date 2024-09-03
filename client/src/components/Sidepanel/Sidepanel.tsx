import "./Sidepanel.css";
import DashboardIcon from "../../assets/dashboard-icon.svg";
import HighlightsIcon from "../../assets/highlights-icon.svg";
import HistoryIcon from "../../assets/history-icon.svg";
import RankingIcon from "../../assets/ranking-icon.svg";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

interface Bookmark {
  name: string;
  icon: string;
  link: string;
}

const Sidepanel = () => {
  const bookmarks: Bookmark[] = [
    { name: "Dashboard", icon: DashboardIcon, link: "/" },
    { name: "Highlights", icon: HighlightsIcon, link: "/highlights" },
    { name: "History", icon: HistoryIcon, link: "/history" },
    { name: "Ranking", icon: RankingIcon, link: "/ranking" },
  ];
  return (
    <aside className="sidepanel">
      <div className="sidepanel__container">
        {bookmarks.map((bookmark, index) => (
          <Button
            text={bookmark.name}
            icon={bookmark.icon}
            key={index}
            link={bookmark.link}
          />
        ))}
      </div>
    </aside>
  );
};

export default Sidepanel;
