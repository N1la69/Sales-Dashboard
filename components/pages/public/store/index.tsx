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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import StoreCategoryTable from "@/components/structures/StoreCategoryTable";
import { filters } from "@/constants/data";
import { BillTable } from "@/components/structures/BillTable";

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
    }
  }
`;

const GET_CATEGORY_RETAILING = gql`
  query GetCategoryRetailing(
    $storeCode: String!
    $source: String
    $year: [Int]
    $month: [Int]
  ) {
    getCategoryRetailing(
      storeCode: $storeCode
      source: $source
      year: $year
      month: $month
    ) {
      category
      breakdown {
        year
        value
      }
    }
  }
`;

const GET_STORE_DETAILS = gql`
  query GetStoreDetails($storeCode: String!) {
    getStoreDetails(storeCode: $storeCode) {
      storeCode
      storeName
      channelDesc
    }
  }
`;

const GET_LAST_STORE_BILLS = gql`
  query GetLastStoreBills(
    $storeCode: String!
    $source: String
    $year: [Int]
    $month: [Int]
  ) {
    getLastStoreBills(
      storeCode: $storeCode
      source: $source
      year: $year
      month: $month
    ) {
      documentNo
      totalRetailing
      documentDate
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
  const [storeChannel, setStoreChannel] = useState<string | null>(null);

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

  const yearFilter = filters.find((f) => f.key === "Year");
  const monthFilter = filters.find((f) => f.key === "Month");

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

  const {
    data: categoryRetailingData,
    loading: categoryLoading,
    error: categoryError,
    refetch: refetchCategory,
  } = useQuery(GET_CATEGORY_RETAILING, {
    variables: {
      storeCode: selectedStore,
      source: dataSource,
      year: appliedFilters.year,
      month: appliedFilters.month,
    },
    skip: !selectedStore,
  });
  const categoryStats = categoryRetailingData?.getCategoryRetailing ?? [];

  const { refetch: refetchStoreDetails } = useQuery(GET_STORE_DETAILS, {
    variables: { storeCode: selectedStore },
    skip: !selectedStore,
    onCompleted: (data) => {
      if (data?.getStoreDetails) {
        setStoreName(data.getStoreDetails.storeName);
        setStoreChannel(data.getStoreDetails.channelDesc);
      }
    },
  });

  const { data, loading, error } = useQuery(GET_LAST_STORE_BILLS, {
    variables: {
      storeCode: selectedStore,
      source: dataSource,
      year: appliedFilters.year,
      month: appliedFilters.month,
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
      const storeCodes = searchData.suggestStores
        .map((s: any) => s.Old_Store_Code)
        .filter((code: string) => code && code.trim().length > 0);

      setSuggestions(storeCodes);
    }
  }, [searchData]);

  const handleStoreSelect = (storeCode: string) => {
    if (!storeCode || storeCode.trim().length === 0) return;

    setSelectedStore(storeCode);
    setSuggestions([]);

    setTimeout(() => {
      refetchTrend();
      refetchStats();
      refetchCategory();
      refetchStoreDetails();
    }, 0);
  };

  const handleSourceChange = (source: "combined" | "main" | "temp") => {
    setDataSource(source);
    if (selectedStore) {
      refetchTrend();
      refetchStats();
      refetchCategory();
      refetchStoreDetails();
    }
  };

  const applyFilters = () => {
    setAppliedFilters(pendingFilters);
    if (selectedStore) {
      refetchTrend();
      refetchStats();
      refetchCategory();
    }
  };

  const clearFilters = () => {
    setPendingFilters({ year: [], month: [] });
    setAppliedFilters({ year: [], month: [] });
    if (selectedStore) {
      refetchTrend();
      refetchStats();
      refetchCategory();
    }
  };

  return (
    <div className="relative pt-3 px-4 sm:px-6 md:px-8 z-10 text-gray-900 dark:text-gray-200">
      {/* Header */}
      <div className="text-left md:text-center space-y-1 mb-6">
        <h1 className=" text-2xl md:text-3xl font-bold text-primary">
          Store at Fingertips
        </h1>
        <p className="text-muted-foreground font-medium text-lg">
          Your current stores&apos; summary & activity
        </p>
      </div>

      {/* Data Source Dropdown */}
      <div className="absolute top-3 right-3 md:right-4 md:top-5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-indigo-300 dark:border-indigo-700 bg-indigo-500 dark:bg-indigo-200 text-indigo-50 dark:text-indigo-900"
            >
              {dataSource.charAt(0).toUpperCase() + dataSource.slice(1)} DB
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-36">
            {["combined", "main", "temp"].map((source) => (
              <DropdownMenuItem
                key={source}
                onClick={() =>
                  handleSourceChange(source as "combined" | "main" | "temp")
                }
                className={`cursor-pointer ${
                  dataSource === source
                    ? "bg-indigo-100 dark:bg-indigo-900 font-semibold"
                    : ""
                }`}
              >
                {source.charAt(0).toUpperCase() + source.slice(1)} DB
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* MAIN CONTENT */}
      <section className="space-y-5">
        <h2 className="font-semibold text-2xl mb-4">Store Lookup</h2>

        {/* Search Inputs */}
        <div className="flex flex-col gap-4 max-w-3xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 gap-2">
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
              {/* FILTERS */}
              <div className="flex flex-col sm:flex-row gap-3">
                <MultiSelect
                  label="Year"
                  options={[...(yearFilter?.values || [])]}
                  selected={pendingFilters.year}
                  onChange={(values) =>
                    setPendingFilters((prev) => ({
                      ...prev,
                      year: (values as (string | number)[]).map((y) =>
                        typeof y === "string"
                          ? parseInt(y.split("-")[1]) + 2000
                          : y
                      ),
                    }))
                  }
                />
                <MultiSelect
                  label="Month"
                  options={[...(monthFilter?.values || [])]}
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
                <div className="flex gap-2 flex-wrap">
                  <Button onClick={applyFilters}>Apply Filters</Button>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}

              {/* Responsive Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mt-4 mb-3">
                {/* Trend Chart */}
                <div className="lg:col-span-3">
                  <h2 className="text-xl font-semibold mb-3">
                    Retailing Trend for:{" "}
                    <span className="text-blue-600 dark:text-blue-400">
                      {selectedStore} {storeName && ` -- ${storeName}`}
                    </span>
                  </h2>
                  <h3 className="text-lg font-normal mb-1">
                    Channel:{" "}
                    <span className="text-indigo-700 dark:text-indigo-300 font-semibold">
                      {storeChannel}
                    </span>
                  </h3>

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

                {/* Stats */}
                <div className="lg:col-span-1">
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
              </div>

              {/* Bills */}
              <div className="py-3">
                <BillTable
                  bills={data?.getLastStoreBills || []}
                  loading={loading}
                  error={error}
                />
              </div>

              {/* Category Stats */}
              <div className="mt-4 mb-5">
                {categoryLoading ? (
                  <p className="text-indigo-600 dark:text-indigo-300">
                    Loading store category stats...
                  </p>
                ) : categoryError ? (
                  <p className="text-red-600 dark:text-red-400">
                    Error loading stats: {categoryError.message}
                  </p>
                ) : (
                  categoryStats.length > 0 && (
                    <StoreCategoryTable
                      data={categoryStats}
                      storeCode={selectedStore}
                      filters={appliedFilters}
                      source={dataSource}
                    />
                  )
                )}
              </div>
            </>
          ) : (
            // Loading Skeleton before store is selected
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mt-4">
              <div className="lg:col-span-3 space-y-4">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-60 w-full rounded-xl" />
              </div>
              <div className="lg:col-span-2 space-y-4">
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
