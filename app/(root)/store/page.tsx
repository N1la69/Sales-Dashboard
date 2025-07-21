/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import BranchSelector from "@/components/structures/BranchSelector";
import StoreSearchInput from "@/components/structures/StoreSearchInput";
import SuggestionList from "@/components/structures/SuggestionList";
import StoreRetailingTrendChart from "@/components/visuals/StoreRetailingTrendChart";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { useState, useEffect } from "react";

// ================= GraphQL Queries =================
const GET_ALL_BRANCHES = gql`
  query GetAllBranches {
    allBranches
  }
`;

const SEARCH_STORE_CODES = gql`
  query SearchStoreCodes($query: String!, $branch: String) {
    suggestStores(query: $query, branch: $branch) {
      Old_Store_Code
    }
  }
`;

const GET_STORE_TREND = gql`
  query GetStoreRetailingTrend($storeCode: String!) {
    storeRetailingTrend(storeCode: $storeCode) {
      year
      month
      retailing
    }
  }
`;

// ================= Component =================
const StorePage = () => {
  const [branch, setBranch] = useState<string>("");
  const [storeQuery, setStoreQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedStore, setSelectedStore] = useState<string>("");

  const {
    data: branchData,
    loading: branchLoading,
    error: branchError,
  } = useQuery(GET_ALL_BRANCHES);

  const [
    searchStores,
    { data: searchData, loading: searchLoading, error: searchError },
  ] = useLazyQuery(SEARCH_STORE_CODES);

  const {
    data: trendData,
    loading: trendLoading,
    error: trendError,
    refetch: refetchTrend,
  } = useQuery(GET_STORE_TREND, {
    variables: { storeCode: selectedStore },
    skip: !selectedStore,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      if (storeQuery.trim().length >= 2) {
        const branchFilter = branch.trim() === "" ? null : branch;
        searchStores({
          variables: { query: storeQuery, branch: branchFilter },
        });
      } else {
        setSuggestions([]);
      }
    }, 300); // debounce by 300ms

    return () => clearTimeout(handler);
  }, [storeQuery, branch, searchStores]);

  useEffect(() => {
    if (searchData?.suggestStores) {
      const storeCodes = searchData.suggestStores.map(
        (s: any) => s.Old_Store_Code
      );
      setSuggestions(storeCodes);
    }
  }, [searchData]);

  const handleStoreSelect = (storeCode: string) => {
    setSelectedStore(storeCode);
    refetchTrend();
  };

  return (
    <div className="pt-3 mx-5 z-10 dark:text-gray-200">
      <div className="flex flex-col text-center space-y-1 mb-6">
        <h1 className="text-3xl font-bold">Store at Fingertips</h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">
          Your current stores&apos; summary & activity
        </p>
      </div>

      {/* MAIN CONTENT */}
      <>
        {/* TOP SECTION */}
        <section className="space-y-5 px-5">
          <h2 className="font-semibold text-2xl mb-4">Store Lookup</h2>

          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="flex gap-3">
              <StoreSearchInput value={storeQuery} onChange={setStoreQuery} />

              {branchLoading ? (
                <p className="text-sm text-gray-500 self-center">
                  Loading branches...
                </p>
              ) : branchError ? (
                <p className="text-sm text-red-500 self-center">
                  Error loading branches: {branchError.message}
                </p>
              ) : (
                <BranchSelector
                  branches={branchData?.allBranches || []}
                  selectedBranch={branch}
                  onChange={setBranch}
                />
              )}

              {searchLoading && (
                <p className="text-sm text-gray-500 self-center">
                  Searching...
                </p>
              )}
              {searchError && (
                <p className="text-sm text-red-500 self-center">
                  Error searching: {searchError.message}
                </p>
              )}
            </div>

            <div>
              <SuggestionList
                suggestions={suggestions}
                onSelectSuggestion={handleStoreSelect}
              />
            </div>
          </div>

          {selectedStore && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-3">
                Retailing Trend for:{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  {selectedStore}
                </span>
              </h2>
              <StoreRetailingTrendChart
                data={trendData?.storeRetailingTrend}
                loading={trendLoading}
                error={trendError}
              />
            </div>
          )}
        </section>

        {/* BOTTOM SECTION */}
        <section className="px-4"></section>
      </>
    </div>
  );
};

export default StorePage;
