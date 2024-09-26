import { useCategories } from "../../contexts/CategoriesContext";
import { useAuth } from "../../contexts/AuthContext";
import Sidepanel from "../Sidepanel/Sidepanel";
import { InfoBox } from "../InfoBox/InfoBox";
import "./HighlightsPage.css";
import { useQuery } from "@apollo/client";
import { HIGHLIGHTS_QUERY } from "../../api/queries";
import { useState, useRef } from "react";
import {
  GetHighlightsQuery,
  GetHighlightsQueryVariables,
} from "../../__generated__/graphql";

const HighlightsPage = () => {
  const { categories } = useCategories();
  const { user } = useAuth();
  const [fetchedHighlights, setFetchedHighlights] = useState<{
    [key: string]: GetHighlightsQuery["getHighlights"];
  }>({});
  const lastFetchedCategory = useRef<string | null>(null);
  const { loading, refetch } = useQuery<
    GetHighlightsQuery,
    GetHighlightsQueryVariables
  >(HIGHLIGHTS_QUERY, {
    variables: {
      categoryName: lastFetchedCategory.current || "",
    },
    skip: !lastFetchedCategory.current,
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      if (data.getHighlights.length > 0) {
        const fetchedCategory = data.getHighlights[0].categoryName;
        setFetchedHighlights((prev) => ({
          ...prev,
          [fetchedCategory]: data.getHighlights,
        }));
      } else {
        setFetchedHighlights((prev) => ({
          ...prev,
          [lastFetchedCategory.current || ""]: [],
        }));
      }
    },
  });

  const handleCategoryClick = async (categoryName: string) => {
    lastFetchedCategory.current = categoryName;
    if (!fetchedHighlights[categoryName]) {
      refetch({
        categoryName,
      });
    }
  };

  if (!user) {
    return (
      <div className="history-page">
        <InfoBox
          type="info"
          text="Play as authenticated user to access your highlights"
        />
      </div>
    );
  }

  return (
    <div className="highlights-page">
      <Sidepanel />
      <main className="highlights-page__categories">
        {categories?.map((category) => (
          <details
            key={category.name}
            className="highlights-page__categories__category"
            onClick={() => handleCategoryClick(category.name)}
          >
            <summary className="category__title">{category.name}</summary>
            {loading && !fetchedHighlights[category.name] && <p>Loading...</p>}
            {fetchedHighlights[category.name] ? (
              fetchedHighlights[category.name].length === 0 ? (
                <p>No data</p>
              ) : (
                fetchedHighlights[category.name].map((highlight) => (
                  <div>
                    <p>Difficulty: {highlight.difficultyName}</p>
                    <p>Average score: {highlight.avgScore}</p>
                  </div>
                ))
              )
            ) : null}
          </details>
        ))}
      </main>
    </div>
  );
};

export default HighlightsPage;
