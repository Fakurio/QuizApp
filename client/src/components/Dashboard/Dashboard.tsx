import Header from "../Header/Header";
import Sidepanel from "../Sidepanel/Sidepanel";
import Tileboard from "../Tileboard/Tileboard";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Header />
      <main className="dashboard__row">
        <Sidepanel />
        <Tileboard />
      </main>
    </div>
  );
};

export default Dashboard;
