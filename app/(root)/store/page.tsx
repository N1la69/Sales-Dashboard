/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import BranchSelector from "@/components/structures/BranchSelector";
import StoreSearchInput from "@/components/structures/StoreSearchInput";
import StoreStatsCard from "@/components/structures/StoreStatsCard";
import SuggestionList from "@/components/structures/SuggestionList";
import { Button } from "@/components/ui/button";
import StoreRetailingTrendChart from "@/components/visuals/StoreRetailingTrendChart";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import MultiSelect from "@/components/MultiSelect";
import { Skeleton } from "@/components/ui/skeleton";

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
  query GetStoreRetailingTrend(
    $storeCode: String!
    $source: String
    $year: [Int]
    $month: [Int]
  ) {
    storeRetailingTrend(
      storeCode: $storeCode
      source: $source
      year: $year
      month: $month
    ) {
      year
      month
      retailing
    }
  }
`;

const GET_ADDITIONAL_STATS = gql`
  query GetStoreStats(
    $storeCode: String!
    $source: String
    $year: [Int]
    $month: [Int]
  ) {
    getStoreStats(
      storeCode: $storeCode
      source: $source
      year: $year
      month: $month
    ) {
      highestRetailingMonth {
        year
        month
        monthName
        retailing
      }
      lowestRetailingMonth {
        year
        month
        monthName
        retailing
      }
      highestRetailingBrand {
        brand
        retailing
      }
      lowestRetailingBrand {
        brand
        retailing
      }
      categoryRetailing {
        category
        retailing
      }
    }
  }
`;

const GET_STORE_DETAILS = gql`
  query GetStoreDetails($storeCode: String!, $source: String) {
    getStoreDetails(storeCode: $storeCode, source: $source) {
      storeCode
      storeName
    }
  }
`;

// ================= Component =================
const StorePage = () => {
  const [dataSource, setDataSource] = useState<"combined" | "main" | "temp">(
    "combined"
  );
  const [branch, setBranch] = useState<string>("");
  const [storeQuery, setStoreQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedStore, setSelectedStore] = useState<string>("");
  const [storeName, setStoreName] = useState<string | null>(null);

  const [pendingFilters, setPendingFilters] = useState<{
    year: number[];
    month: number[];
  }>({
    year: [],
    month: [],
  });
  const [appliedFilters, setAppliedFilters] = useState<{
    year: number[];
    month: number[];
  }>({
    year: [],
    month: [],
  });

  const yearsList = [2023, 2024, 2025];
  const monthsList = Array.from({ length: 12 }, (_, i) => i + 1);

  const { data: branchData, loading: branchLoading } =
    useQuery(GET_ALL_BRANCHES);

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
    variables: {
      storeCode: selectedStore,
      source: dataSource,
      year: appliedFilters.year,
      month: appliedFilters.month,
    },
    skip: !selectedStore,
  });

  const {
    data: additionalStatsData,
    loading: statsLoading,
    error: statsError,
    refetch: refetchStats,
  } = useQuery(GET_ADDITIONAL_STATS, {
    variables: {
      storeCode: selectedStore,
      source: dataSource,
      year: appliedFilters.year,
      month: appliedFilters.month,
    },
    skip: !selectedStore,
  });
  const categoryStats =
    additionalStatsData?.getStoreStats?.categoryRetailing ?? [];

  const { refetch: refetchStoreDetails } = useQuery(GET_STORE_DETAILS, {
    variables: { storeCode: selectedStore, source: dataSource },
    skip: !selectedStore,
    onCompleted: (data) => {
      if (data?.getStoreDetails) {
        setStoreName(data.getStoreDetails.storeName);
      }
    },
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
    }, 300);

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
    setSuggestions([]);
    refetchTrend();
    refetchStats();
    refetchStoreDetails();
  };

  const handleSourceChange = (source: "combined" | "main" | "temp") => {
    setDataSource(source);
    if (selectedStore) {
      refetchTrend();
      refetchStats();
      refetchStoreDetails();
    }
  };

  const applyFilters = () => {
    setAppliedFilters(pendingFilters);
    if (selectedStore) {
      refetchTrend();
      refetchStats();
    }
  };

  const clearFilters = () => {
    setPendingFilters({ year: [], month: [] });
    setAppliedFilters({ year: [], month: [] });
    if (selectedStore) {
      refetchTrend();
      refetchStats();
    }
  };

  return (
    <div className="pt-3 mx-5 z-10 text-gray-900 dark:text-gray-200">
      <div className="flex flex-col text-center space-y-1 mb-6">
        <h1 className="text-3xl font-bold text-primary">Store at Fingertips</h1>
        <p className="text-muted-foreground font-medium text-lg">
          Your current stores&apos; summary & activity
        </p>
      </div>

      {/* Data Source Selection */}
      <div className="flex justify-center gap-3 my-4">
        {["combined", "main", "temp"].map((source) => (
          <Button
            key={source}
            variant={dataSource === source ? "default" : "outline"}
            onClick={() =>
              handleSourceChange(source as "combined" | "main" | "temp")
            }
            className={
              dataSource === source
                ? "bg-indigo text-white hover:bg-indigo-hover"
                : "border border-gray-200 text-gray-900 dark:text-gray-100 hover:border-indigo"
            }
          >
            {source.charAt(0).toUpperCase() + source.slice(1)} DB
          </Button>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <section className="space-y-5 px-5">
        <h2 className="font-semibold text-2xl mb-4">Store Lookup</h2>

        <div className="flex flex-col gap-4 max-w-3xl">
          <div className="flex gap-3">
            <StoreSearchInput value={storeQuery} onChange={setStoreQuery} />

            {branchLoading ? (
              <p>Loading branches...</p>
            ) : (
              <BranchSelector
                branches={branchData?.allBranches || []}
                selectedBranch={branch}
                onChange={setBranch}
              />
            )}

            {searchLoading && <p>Searching...</p>}
            {searchError && <p>Error searching: {searchError.message}</p>}
          </div>

          <SuggestionList
            suggestions={suggestions}
            onSelectSuggestion={handleStoreSelect}
          />
        </div>

        {/* Content Section */}
        <div className="space-y-4">
          {selectedStore ? (
            <>
              <div className="flex gap-3">
                <MultiSelect
                  label="Year"
                  options={yearsList}
                  selected={pendingFilters.year}
                  onChange={(values) =>
                    setPendingFilters((prev) => ({
                      ...prev,
                      year: values as number[],
                    }))
                  }
                />
                <MultiSelect
                  label="Month"
                  options={monthsList}
                  selected={pendingFilters.month}
                  onChange={(values) =>
                    setPendingFilters((prev) => ({
                      ...prev,
                      month: values as number[],
                    }))
                  }
                />
              </div>

              {(pendingFilters.year.length > 0 ||
                pendingFilters.month.length > 0) && (
                <div className="flex gap-2">
                  <Button onClick={applyFilters}>Apply Filters</Button>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}

              <div className="grid grid-cols-5 mt-4 space-x-4">
                <div className="col-span-3">
                  <h2 className="text-xl font-semibold mb-3">
                    Retailing Trend for:{" "}
                    <span className="text-blue-600 dark:text-blue-400">
                      {selectedStore} {storeName && ` - ${storeName}`}
                    </span>
                  </h2>

                  {trendLoading ? (
                    <Skeleton className="h-60 w-full rounded-xl" />
                  ) : (
                    <StoreRetailingTrendChart
                      data={trendData?.storeRetailingTrend}
                      loading={trendLoading}
                      error={trendError}
                    />
                  )}
                </div>

                <div className="col-span-1">
                  <h2 className="text-xl font-semibold mb-3">
                    Additional Details:
                  </h2>

                  {statsLoading ? (
                    <div className="space-y-4">
                      <Skeleton className="h-12 w-full rounded-md" />
                      <Skeleton className="h-12 w-full rounded-md" />
                      <Skeleton className="h-12 w-full rounded-md" />
                    </div>
                  ) : (
                    <StoreStatsCard
                      data={additionalStatsData?.getStoreStats}
                      loading={statsLoading}
                      error={statsError}
                    />
                  )}
                </div>

                <div className="col-span-1 pl-3">
                  {categoryStats.length > 0 && (
                    <div className="">
                      <h2 className="text-xl font-semibold mb-3">
                        Category-wise retailing:
                      </h2>
                      <ul className="space-y-1 h-96 overflow-y-auto">
                        {categoryStats.map((item: any, index: number) => (
                          <li
                            key={index}
                            className="flex justify-between text-indigo-800 dark:text-indigo-200"
                          >
                            <span>{item.category}</span>
                            <span>₹ {item.retailing.toLocaleString()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            // Initial loading placeholder before store is selected
            <div className="grid grid-cols-5 gap-2 mt-4">
              <div className="col-span-3 space-y-4">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-60 w-full rounded-xl" />
              </div>
              <div className="col-span-2 space-y-4">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-12 w-full rounded-md" />
                <Skeleton className="h-12 w-full rounded-md" />
                <Skeleton className="h-12 w-full rounded-md" />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default StorePage;
