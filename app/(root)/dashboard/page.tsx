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

// ================= GraphQL Queries =================
const GET_TOTAL_RETAILING = gql`
  query GetTotalRetailing($filters: FilterInput, $source: String) {
    totalRetailing(filters: $filters, source: $source)
  }
`;

const GET_HIGHEST_BRANCH = gql`
  query GetHighestRetailingBranch($filters: FilterInput, $source: String) {
    highestRetailingBranch(filters: $filters, source: $source) {
      branch
      retailing
    }
  }
`;

const GET_HIGHEST_BRAND = gql`
  query GetHighestRetailingBrand($filters: FilterInput, $source: String) {
    highestRetailingBrand(filters: $filters, source: $source) {
      brand
      retailing
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
    GET_TOTAL_RETAILING,
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
    <div className="pt-3 mx-5 z-10 dark:text-gray-200">
      <div className="flex flex-col text-center">
        <h1 className="text-3xl font-bold">Sales Overview</h1>
        <p className="text-gray-500 font-semibold text-xl">
          Your current sales summary and activity
        </p>
      </div>

      <div className="flex justify-center gap-3 my-4">
        {["combined", "main", "temp"].map((source) => (
          <Button
            key={source}
            variant={dataSource === source ? "default" : "outline"}
            onClick={() =>
              handleSourceChange(source as "combined" | "main" | "temp")
            }
          >
            {source.charAt(0).toUpperCase() + source.slice(1)} DB
          </Button>
        ))}
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
                className="flex items-center bg-primary text-primary-foreground rounded-full px-3 py-1 text-sm"
              >
                {`${key}: ${value}`}
                <button
                  onClick={() => removeFilter(key, value)}
                  className="ml-2 hover:text-red-400"
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
            <Button onClick={applyFilters}>Apply Filters</Button>
          )}
          <Button variant="outline" onClick={clearAllFilters}>
            Clear All Filters
          </Button>
        </div>
      )}

      {/* MAIN CONTENT */}
      <>
        {/* TOP SECTION */}
        <section className="grid grid-cols-4 gap-3 items-stretch px-5">
          <div className="col-span-1 h-full">
            {loading && <p>Loading Total Retailing...</p>}
            {error && <p>Error fetching data: {error.message}</p>}
            {data && (
              <StatCard
                title="Total Retailing (in Lakhs)"
                value={data.totalRetailing / 100000}
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
              {highestBranchLoading && <p>Loading highest branch...</p>}
              {highestBranchError && <p>Error: {highestBranchError.message}</p>}
              {highestBranchData && (
                <StatCard
                  title="Highest Retailing Branch (in Lakhs)"
                  value={
                    highestBranchData.highestRetailingBranch.retailing / 100000
                  }
                  description={`Branch: ${highestBranchData.highestRetailingBranch.branch}`}
                />
              )}
            </div>

            <div>
              {highestBrandLoading && <p>Loading highest brand...</p>}
              {highestBrandError && <p>Error: {highestBrandError.message}</p>}
              {highestBrandData && (
                <StatCard
                  title="Highest Retailing Brand (in Lakhs)"
                  value={
                    highestBrandData.highestRetailingBrand.retailing / 100000
                  }
                  description={`Brand: ${highestBrandData.highestRetailingBrand.brand}`}
                />
              )}
            </div>
          </div>
        </section>

        {/* BOTTOM SECTION */}
        <section className="pt-5 grid grid-cols-5 gap-3 px-6">
          <div className="col-span-3">
            <MonthlyTrendLineChart
              data={monthlyTrendData?.monthlyRetailingTrend}
              loading={monthlyTrendLoading}
              error={monthlyTrendError}
            />
          </div>

          <div className="col-span-2">
            <TopBrandforms
              data={brandformData?.topBrandforms}
              loading={brandformLoading}
              error={brandformError}
            />
          </div>
        </section>
      </>
    </div>
  );
}
