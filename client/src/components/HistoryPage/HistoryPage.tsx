import Table from "../Table/Table";
import { InfoBox } from "../InfoBox/InfoBox";
import { useQuery } from "@apollo/client";
import "./HistoryPage.css";
import { USER_GAME_HISTORY_QUERY } from "../../api/queries";
import {
  GameMode,
  GetUserGamesHistoryQuery,
  GetUserGamesHistoryQueryVariables,
} from "../../__generated__/graphql";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useRef, useState } from "react";
import MobileTable from "../MobileTable/MobileTable";
import Button from "../Button/Button";
import Filterbar from "../Filterbar/Filterbar";

const columns = ["Category", "Questions", "Correctly Answered", "Opponent"];

export interface Filters {
  category?: string;
  gameMode?: string;
}

const HistoryPage = () => {
  const { user } = useAuth();
  const { data, loading, error, fetchMore } = useQuery<
    GetUserGamesHistoryQuery,
    GetUserGamesHistoryQueryVariables
  >(USER_GAME_HISTORY_QUERY, { skip: !user });
  const [filteredHistory, setFilteredHistory] = useState<
    GetUserGamesHistoryQuery["getUserGamesHistory"]["history"]
  >([]);
  const [showMobile, setShowMobile] = useState(false);
  const [isHistoryEnd, setIsHistoryEnd] = useState(false);
  const filters = useRef<Filters>({});

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
    if (data) {
      handleFiltersChange(filters.current);
    }
    if (
      data &&
      data.getUserGamesHistory.history.length ===
        data.getUserGamesHistory.totalCount
    ) {
      setIsHistoryEnd(true);
    }
  }, [data]);

  const handleFiltersChange = (filters: Filters) => {
    const newFilteredHistory =
      data?.getUserGamesHistory.history.filter((input) => {
        if (filters.category && input.categoryName !== filters.category) {
          return false;
        }
        if (filters.gameMode) {
          if (filters.gameMode === GameMode.Solo) {
            return input.opponentName === "Solo game";
          }
          if (filters.gameMode === GameMode.Multiplayer) {
            return input.opponentName !== "Solo game";
          }
        }
        return true;
      }) || [];
    setFilteredHistory(newFilteredHistory);
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
      <Filterbar filters={filters} onFiltersChange={handleFiltersChange} />
      {filteredHistory ? (
        <>
          {showMobile ? (
            <MobileTable columns={columns} items={filteredHistory} />
          ) : (
            <Table columns={columns} items={filteredHistory} />
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
              updateQuery(prev, { fetchMoreResult }) {
                if (!fetchMoreResult) return prev;
                return {
                  getUserGamesHistory: {
                    ...prev.getUserGamesHistory,
                    history: [
                      ...prev.getUserGamesHistory.history,
                      ...fetchMoreResult.getUserGamesHistory.history,
                    ],
                    totalCount: fetchMoreResult.getUserGamesHistory.totalCount,
                  },
                };
              },
            })
          }
        />
      )}
    </div>
  );
};

export default HistoryPage;
