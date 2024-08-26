import { createContext, useContext, useEffect, useState } from "react";
import { ApolloError, useQuery } from "@apollo/client";
import { CATEGORY_QUERY } from "../api/queries";
import { GetCategoriesQuery } from "../__generated__/graphql";

interface CategoriesContextI {
  filteredCategories: GetCategoriesQuery["categories"] | undefined;
  loading: boolean;
  error: ApolloError | undefined;
  filterCategories: (searchQuery: string) => void;
}

const CategoriesContext = createContext<CategoriesContextI>(
  {} as CategoriesContextI
);

const useCategories = () => {
  return useContext(CategoriesContext);
};

const CategoriesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data, loading, error } = useQuery<GetCategoriesQuery>(CATEGORY_QUERY);
  const [filteredCategories, setFilteredCategories] = useState<
    GetCategoriesQuery["categories"] | undefined
  >(undefined);

  const filterCategories = (searchQuery: string) => {
    if (!data) return;
    setFilteredCategories(
      data.categories.filter((category) =>
        category.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      )
    );
  };

  useEffect(() => {
    if (data) {
      setFilteredCategories(data.categories);
    }
  }, [data]);

  const value = {
    filteredCategories,
    loading,
    error,
    filterCategories,
  };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

export { useCategories, CategoriesProvider };
