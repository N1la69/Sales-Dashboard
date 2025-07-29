"use client";

import StatCard from "@/components/structures/StatCard";
import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import MultiSelect from "@/components/MultiSelect";
import { filters } from "@/constants/data";
import RetailingCategoryPie from "@/components/visuals/RetailingCategoryPie";
import RetailingChannelPie from "@/components/visuals/RetailingChannelPie";
import MonthlyTrendLineChart from "@/components/visuals/MonthlyTrendLineChart";
import TopBrandforms from "@/components/structures/TopBrandforms";
import CategoryTable from "@/components/structures/CategoryTable";
import BroadChannelTable from "@/components/structures/BroadChannelTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// ================= GraphQL Queries =================
const GET_RETAILING_STATS = gql`
  query GetRetailingStats($filters: FilterInput, $source: String) {
    retailingStats(filters: $filters, source: $source) {
      total
      breakdown {
        year
        value
      }
      growth
    }
  }
`;

const GET_HIGHEST_BRANCH = gql`
  query GetHighestRetailingBranch($filters: FilterInput, $source: String) {
    highestRetailingBranch(filters: $filters, source: $source) {
      branch
      retailing
      breakdown {
        year
        value
      }
      growth
    }
  }
`;

const GET_HIGHEST_BRAND = gql`
  query GetHighestRetailingBrand($filters: FilterInput, $source: String) {
    highestRetailingBrand(filters: $filters, source: $source) {
      brand
      retailing
      breakdown {
        year
        value
      }
      growth
    }
  }
`;

const GET_CATEGORY_PERCENTAGE = gql`
  query GetCategoryRetailingPercentage($filters: FilterInput, $source: String) {
    retailingByCategory(filters: $filters, source: $source) {
      category
      retailing
    }
  }
`;

const GET_BROAD_CHANNEL_PERCENTAGE = gql`
  query GetBroadChannelRetailingPercentage(
    $filters: FilterInput
    $source: String
  ) {
    retailingByBroadChannel(filters: $filters, source: $source) {
      broad_channel
      retailing
    }
  }
`;

const GET_MONTHLY_TREND = gql`
  query GetMonthlyRetailingTrend($filters: FilterInput, $source: String) {
    monthlyRetailingTrend(filters: $filters, source: $source) {
      year
      month
      retailing
    }
  }
`;

const GET_TOP_BRANDFORMS = gql`
  query GetTopBrandforms($filters: FilterInput, $source: String) {
    topBrandforms(filters: $filters, source: $source) {
      brandform
      retailing
    }
  }
`;

// ================= Component =================
export default function Dashboard() {
  const [pendingFilters, setPendingFilters] = useState<
    Record<string, (string | number)[]>
  >({});
  const [appliedFilters, setAppliedFilters] = useState<
    Record<string, (string | number)[]>
  >({});
  const [dataSource, setDataSource] = useState<"combined" | "main" | "temp">(
    "combined"
  );

  const queryOptions = {
    variables: { filters: appliedFilters, source: dataSource },
  };

  const { data, loading, error, refetch } = useQuery(
    GET_RETAILING_STATS,
    queryOptions
  );

  const {
    data: highestBranchData,
    loading: highestBranchLoading,
    error: highestBranchError,
  } = useQuery(GET_HIGHEST_BRANCH, queryOptions);

  const {
    data: highestBrandData,
    loading: highestBrandLoading,
    error: highestBrandError,
  } = useQuery(GET_HIGHEST_BRAND, queryOptions);

  const {
    data: categoryData,
    loading: categoryLoading,
    error: categoryError,
  } = useQuery(GET_CATEGORY_PERCENTAGE, queryOptions);

  const {
    data: broadChannelData,
    loading: broadChannelLoading,
    error: broadChannelError,
  } = useQuery(GET_BROAD_CHANNEL_PERCENTAGE, queryOptions);

  const {
    data: monthlyTrendData,
    loading: monthlyTrendLoading,
    error: monthlyTrendError,
  } = useQuery(GET_MONTHLY_TREND, {
    variables: { filters: appliedFilters, source: dataSource },
  });

  const {
    data: brandformData,
    loading: brandformLoading,
    error: brandformError,
  } = useQuery(GET_TOP_BRANDFORMS, {
    variables: { filters: appliedFilters, source: dataSource },
  });

  const handleFilterChange = (key: string, values: (string | number)[]) => {
    setPendingFilters((prev) => ({ ...prev, [key]: values }));
  };

  const applyFilters = () => {
    setAppliedFilters(pendingFilters);
    refetch({ filters: pendingFilters, source: dataSource });
  };

  const clearAllFilters = () => {
    setPendingFilters({});
    setAppliedFilters({});
    refetch({ filters: {}, source: dataSource });
  };

  const removeFilter = (key: string, value: string | number) => {
    const updated = {
      ...pendingFilters,
      [key]: pendingFilters[key].filter((v) => v !== value),
    };
    if (updated[key].length === 0) delete updated[key];
    setPendingFilters(updated);
  };

  const handleSourceChange = (source: "combined" | "main" | "temp") => {
    setDataSource(source);
    refetch({ filters: appliedFilters, source });
  };

  const hasPendingChanges =
    JSON.stringify(pendingFilters) !== JSON.stringify(appliedFilters);
  const hasAnyPendingFilter = Object.keys(pendingFilters).length > 0;

  return (
    <div className="relative pt-3 mx-5 z-10 text-gray-900 dark:text-gray-200">
      <div className="text-center space-y-1">
        <h1 className="text-3xl font-bold text-primary">Sales Overview</h1>
        <p className="text-muted-foreground font-medium text-lg">
          Your current sales summary and activity
        </p>
      </div>

      {/* Data Source Dropdown */}
      <div className="absolute right-4 top-7">
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

      <div className="flex flex-wrap justify-center items-center gap-2 mt-4 pb-4">
        {filters.map((filter) => (
          <MultiSelect
            key={filter.key}
            label={filter.label}
            options={[...filter.values]}
            selected={pendingFilters[filter.key] || []}
            onChange={(values) => handleFilterChange(filter.key, values)}
          />
        ))}
      </div>

      {hasAnyPendingFilter && (
        <div className="flex justify-center items-center gap-3 flex-wrap mb-4">
          {Object.entries(pendingFilters).flatMap(([key, values]) =>
            values.map((value) => (
              <span
                key={`${key}-${value}`}
                className="flex items-center bg-indigo text-white rounded-full px-3 py-1 text-sm"
              >
                {`${key}: ${value}`}
                <button
                  onClick={() => removeFilter(key, value)}
                  className="ml-2 hover:text-error"
                >
                  <X size={14} />
                </button>
              </span>
            ))
          )}
        </div>
      )}

      {hasAnyPendingFilter && (
        <div className="flex gap-2 my-4 justify-center">
          {hasPendingChanges && (
            <Button
              className="bg-indigo text-white hover:bg-indigo-hover"
              onClick={applyFilters}
            >
              Apply Filters
            </Button>
          )}
          <Button
            variant="outline"
            onClick={clearAllFilters}
            className="border border-gray-200 text-gray-900 dark:text-gray-100 hover:border-error"
          >
            Clear All Filters
          </Button>
        </div>
      )}

      {/* MAIN CONTENT */}
      <>
        {/* TOP SECTION */}
        <section className="grid grid-cols-4 gap-3 items-stretch px-5">
          <div className="col-span-1 h-full">
            {loading && (
              <p className="dark:text-gray-200">Loading Total Retailing...</p>
            )}
            {error && (
              <p className="dark:text-red-400">
                Error fetching data: {error.message}
              </p>
            )}
            {data && (
              <StatCard
                title="Total Retailing (in Lakhs)"
                value={(data.retailingStats.total / 100000).toFixed(1)}
                breakdown={data.retailingStats.breakdown}
                growth={data.retailingStats.growth}
              />
            )}
          </div>

          <div className="col-span-2 flex justify-around gap-2">
            <div className="w-1/2 h-full">
              <RetailingCategoryPie
                data={categoryData?.retailingByCategory}
                loading={categoryLoading}
                error={categoryError}
              />
            </div>
            <div className="w-1/2 h-full">
              <RetailingChannelPie
                data={broadChannelData?.retailingByBroadChannel}
                loading={broadChannelLoading}
                error={broadChannelError}
              />
            </div>
          </div>

          <div className="col-span-1 flex flex-col justify-between gap-2 h-full">
            <div>
              {highestBranchLoading && (
                <p className="dark:text-gray-200">Loading highest branch...</p>
              )}
              {highestBranchError && (
                <p className="dark:text-red-400">
                  Error: {highestBranchError.message}
                </p>
              )}
              {highestBranchData && (
                <StatCard
                  title="Highest Retailing Branch (in Lakhs)"
                  value={(
                    highestBranchData.highestRetailingBranch.retailing / 100000
                  ).toFixed(1)}
                  description={`Branch: ${highestBranchData.highestRetailingBranch.branch}`}
                  breakdown={highestBranchData.highestRetailingBranch.breakdown}
                  growth={highestBranchData.highestRetailingBranch.growth}
                />
              )}
            </div>

            <div>
              {highestBrandLoading && (
                <p className="dark:text-gray-200">Loading highest brand...</p>
              )}
              {highestBrandError && (
                <p className="dark:text-red-400">
                  Error: {highestBrandError.message}
                </p>
              )}
              {highestBrandData && (
                <StatCard
                  title="Highest Retailing Brand (in Lakhs)"
                  value={(
                    highestBrandData.highestRetailingBrand.retailing / 100000
                  ).toFixed(1)}
                  description={`Brand: ${highestBrandData.highestRetailingBrand.brand}`}
                  breakdown={highestBrandData.highestRetailingBrand.breakdown}
                  growth={highestBrandData.highestRetailingBrand.growth}
                />
              )}
            </div>
          </div>
        </section>

        {/* MIDDLE SECTION */}
        <section className="pt-5 px-6">
          <div className="bg-yellow-100/20 dark:bg-indigo-900/10 p-2 rounded-lg shadow">
            <MonthlyTrendLineChart
              data={monthlyTrendData?.monthlyRetailingTrend}
              loading={monthlyTrendLoading}
              error={monthlyTrendError}
            />
          </div>
        </section>

        {/* BOTTOM SECTION */}
        <section className="py-5 pt-8 grid grid-cols-3 gap-5 px-6">
          <div className="col-span-1">
            <TopBrandforms
              data={brandformData?.topBrandforms}
              loading={brandformLoading}
              error={brandformError}
            />
          </div>
          <div className="col-span-1">
            <CategoryTable
              data={categoryData?.retailingByCategory || []}
              loading={categoryLoading}
              error={categoryError}
            />
          </div>
          <div className="col-span-1">
            <BroadChannelTable
              data={broadChannelData?.retailingByBroadChannel || []}
              loading={broadChannelLoading}
              error={broadChannelError}
            />
          </div>
        </section>
      </>
    </div>
  );
}
