import Table from "../Table/Table";
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
import Button from "../Button/Button";

const columns = ["Category", "Questions", "Correctly Answered", "Opponent"];

const HistoryPage = () => {
  const { user } = useAuth();
  const { data, loading, error, fetchMore } = useQuery<
    GetUserGamesHistoryQuery,
    GetUserGamesHistoryQueryVariables
  >(USER_GAME_HISTORY_QUERY, { skip: !user });
  const [showMobile, setShowMobile] = useState(false);
  const [isHistoryEnd, setIsHistoryEnd] = useState(false);

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

  useEffect(() => {
    if (
      data &&
      data.getUserGamesHistory.history.length ===
        data.getUserGamesHistory.totalCount
    ) {
      setIsHistoryEnd(true);
    }
  }, [data]);

  const refreshHistory = () => {
    window.location.reload();
  };

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
      <Button
        text="Refresh history"
        onClick={() => refreshHistory()}
        className="history-page__button"
      />
      {data && data.getUserGamesHistory.history.length > 0 ? (
        <>
          {showMobile ? (
            <MobileTable
              columns={columns}
              items={data.getUserGamesHistory.history}
            />
          ) : (
            <Table columns={columns} items={data.getUserGamesHistory.history} />
          )}
        </>
      ) : (
        <InfoBox type="info" text="No history found" />
      )}
      {data && !isHistoryEnd && (
        <Button
          className="history-page__button history-page__button--load-more"
          text="Load more"
          onClick={() =>
            fetchMore({
              variables: {
                offset: data.getUserGamesHistory.history.length,
              },
            })
          }
        />
      )}
    </div>
  );
};

export default HistoryPage;
