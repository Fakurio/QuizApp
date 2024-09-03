import Table from "../Table/Table";
import Sidepanel from "../Sidepanel/Sidepanel";
import { InfoBox } from "../InfoBox/InfoBox";
import { useQuery } from "@apollo/client";
import "./HistoryPage.css";
import { USER_GAME_HISTORY_QUERY } from "../../api/queries";
import {
  GetUserGamesHistoryQuery,
  GetUserGamesHistoryQueryVariables,
} from "../../__generated__/graphql";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import MobileTable from "../MobileTable/MobileTable";

const columns = ["Category", "Questions", "Correctly Answered"];

const HistoryPage = () => {
  const { user } = useAuth();
  const { data, loading, error } = useQuery<
    GetUserGamesHistoryQuery,
    GetUserGamesHistoryQueryVariables
  >(USER_GAME_HISTORY_QUERY, { skip: !user });
  const [showMobile, setShowMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowMobile(true);
      } else {
        setShowMobile(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!user) {
    return (
      <div className="history-page">
        <InfoBox
          type="info"
          text="Play as authenticated user to access game's history"
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="history-page">
        <InfoBox type="info" text="Loading..." />
      </div>
    );
  }
  if (error) {
    return (
      <div className="history-page">
        <InfoBox
          type="error"
          text="An error occurred. Please try again later."
        />
      </div>
    );
  }
  return (
    <div className="history-page">
      {data && data.getUserGamesHistory.length > 0 ? (
        <>
          {showMobile ? (
            <MobileTable columns={columns} items={data.getUserGamesHistory} />
          ) : (
            <Table columns={columns} items={data.getUserGamesHistory} />
          )}
        </>
      ) : (
        <InfoBox type="info" text="No history found" />
      )}
    </div>
  );
};

export default HistoryPage;
