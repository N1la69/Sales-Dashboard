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
import MonthlyTrendChart from "@/components/visuals/MonthlyTrendChart";
import TopBrandforms from "@/components/structures/TopBrandforms";
import CategoryTable from "@/components/structures/CategoryTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DateRange from "@/components/structures/DateRange";
import BaseChannelTable from "@/components/structures/BaseChannelTable";

// ================= GraphQL Queries =================
const GET_RETAILING_STATS = gql`
  query GetRetailingStats($filters: FilterInput, $source: String) {
    retailingStats(filters: $filters, source: $source) {
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
      breakdown {
        year
        value
      }
    }
  }
`;

const GET_BASE_CHANNEL_PERCENTAGE = gql`
  query GetBaseChannelRetailingPercentage(
    $filters: FilterInput
    $source: String
  ) {
    retailingByBaseChannel(filters: $filters, source: $source) {
      base_channel
      breakdown {
        year
        value
      }
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
      breakdown {
        year
        value
      }
      growth
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
  const [dateRange, setDateRange] = useState({
    startDate: null as Date | null,
    endDate: null as Date | null,
  });
  const [appliedDateRange, setAppliedDateRange] = useState({
    startDate: null as Date | null,
    endDate: null as Date | null,
  });

  const [dataSource, setDataSource] = useState<"combined" | "main" | "temp">(
    "combined"
  );

  const queryOptions = {
    variables: {
      filters: {
        ...appliedFilters,
        ...(appliedDateRange.startDate &&
          appliedDateRange.endDate && {
            StartDate: appliedDateRange.startDate.toISOString().split("T")[0],
            EndDate: appliedDateRange.endDate.toISOString().split("T")[0],
          }),
      },
      source: dataSource,
    },
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
    data: baseChannelData,
    loading: baseChannelLoading,
    error: baseChannelError,
  } = useQuery(GET_BASE_CHANNEL_PERCENTAGE, queryOptions);

  const {
    data: monthlyTrendData,
    loading: monthlyTrendLoading,
    error: monthlyTrendError,
  } = useQuery(GET_MONTHLY_TREND, queryOptions);

  const {
    data: brandformData,
    loading: brandformLoading,
    error: brandformError,
  } = useQuery(GET_TOP_BRANDFORMS, queryOptions);

  const handleFilterChange = (key: string, values: (string | number)[]) => {
    const mapped = values.map((v) => {
      if (typeof v === "string" && /^\d{4}-\d{2}$/.test(v)) {
        // "2024-25" → 2025 (end year)
        return parseInt(v.split("-")[1]) + 2000;
      }
      return v;
    });
    setPendingFilters((prev) => ({ ...prev, [key]: mapped }));
  };

  const applyFilters = (filtersOverride?: typeof pendingFilters) => {
    const filtersToApply = filtersOverride ?? pendingFilters;

    setAppliedFilters({ ...filtersToApply });
    setAppliedDateRange({ ...dateRange });

    refetch({
      filters: {
        ...filtersToApply,
        ...(dateRange.startDate &&
          dateRange.endDate && {
            StartDate: dateRange.startDate.toISOString().split("T")[0],
            EndDate: dateRange.endDate.toISOString().split("T")[0],
          }),
      },
      source: dataSource,
    });
  };

  const clearAllFilters = () => {
    setPendingFilters({});
    setAppliedFilters({});
    setDateRange({ startDate: null, endDate: null });
    setAppliedDateRange({ startDate: null, endDate: null }); // ✅ clear applied too
    refetch({ filters: {}, source: dataSource });
  };

  const clearDateRange = () => {
    const updated = { startDate: null, endDate: null };
    setDateRange(updated);
    setAppliedDateRange(updated); // Optional: immediately clear applied too
    setPendingFilters({ ...pendingFilters });
    refetch({
      filters: {
        ...pendingFilters,
      },
      source: dataSource,
    });
  };

  const removeFilter = (key: string, value: string | number) => {
    const updated = {
      ...pendingFilters,
      [key]: pendingFilters[key].filter((v) => v !== value),
    };
    if (updated[key].length === 0) delete updated[key];
    setPendingFilters(updated);
    applyFilters(updated);
  };

  const handleSourceChange = (source: "combined" | "main" | "temp") => {
    setDataSource(source);
    refetch({ filters: appliedFilters, source });
  };

  const hasPendingChanges =
    JSON.stringify(pendingFilters) !== JSON.stringify(appliedFilters) ||
    JSON.stringify(dateRange) !== JSON.stringify(appliedDateRange);

  const hasAnyPendingFilter =
    Object.keys(pendingFilters).length > 0 ||
    dateRange.startDate?.getTime() !== appliedDateRange.startDate?.getTime() ||
    dateRange.endDate?.getTime() !== appliedDateRange.endDate?.getTime();

  const hasAnyAppliedFilter =
    Object.keys(appliedFilters).length > 0 ||
    appliedDateRange.startDate !== null ||
    appliedDateRange.endDate !== null;

  return (
    <div className="relative pt-3 px-4 sm:px-6 z-10 text-gray-900 dark:text-gray-200">
      {/* HEADER */}
      <div className="text-left md:text-center space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary">
          Sales Overview
        </h1>
        <p className="text-muted-foreground font-medium text-base sm:text-lg">
          Your current sales summary and activity
        </p>
      </div>

      {/* DATA SOURCE DROPDOWN */}
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

      {/* FILTERS */}
      <div className="flex flex-wrap justify-start md:justify-center items-center gap-2 my-4 pb-4">
        {filters.map((filter) => (
          <MultiSelect
            key={filter.key}
            label={filter.label}
            options={[...filter.values]}
            selected={pendingFilters[filter.key] || []}
            onChange={(values) => handleFilterChange(filter.key, values)}
          />
        ))}
        <DateRange value={dateRange} onChange={setDateRange} />
      </div>

      {/* ACTIVE FILTER TAGS */}
      {(hasAnyPendingFilter || hasAnyAppliedFilter) && (
        <div className="flex justify-center items-center gap-2 flex-wrap mb-4">
          {/* Other filters */}
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

          {/* Date Range filter tag */}
          {(dateRange.startDate || dateRange.endDate) && (
            <span className="flex items-center bg-indigo text-white rounded-full px-3 py-1 text-sm">
              {`Date: ${dateRange.startDate?.toLocaleDateString() ?? "–"} to ${
                dateRange.endDate?.toLocaleDateString() ?? "–"
              }`}
              <button
                onClick={clearDateRange}
                className="ml-2 hover:text-error"
              >
                <X size={14} />
              </button>
            </span>
          )}
        </div>
      )}

      {/* APPLY / CLEAR BUTTONS */}
      {(hasAnyPendingFilter || hasAnyAppliedFilter) && (
        <div className="flex gap-2 my-4 justify-center flex-wrap">
          {hasPendingChanges && (
            <Button
              className="bg-indigo text-white hover:bg-indigo-hover"
              onClick={() => applyFilters()}
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

      {/* TOP SECTION */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch px-0 sm:px-2">
        <div className="h-full">
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
              breakdown={data.retailingStats.breakdown}
              growth={data.retailingStats.growth}
            />
          )}
        </div>

        <div className="md:col-span-1 lg:col-span-2 flex flex-col sm:flex-row justify-around gap-2">
          <div className="w-full sm:w-1/2 h-full">
            <RetailingCategoryPie
              data={categoryData?.retailingByCategory}
              loading={categoryLoading}
              error={categoryError}
            />
          </div>
          <div className="w-full sm:w-1/2 h-full">
            <RetailingChannelPie
              data={baseChannelData?.retailingByBaseChannel}
              loading={baseChannelLoading}
              error={baseChannelError}
            />
          </div>
        </div>

        <div className="h-full flex flex-col justify-between gap-2">
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
                description={`Brand: ${highestBrandData.highestRetailingBrand.brand}`}
                breakdown={highestBrandData.highestRetailingBrand.breakdown}
                growth={highestBrandData.highestRetailingBrand.growth}
              />
            )}
          </div>
        </div>
      </section>

      {/* MIDDLE SECTION */}
      <section className="pt-5 px-0 sm:px-6">
        <div className="bg-yellow-100/20 dark:bg-indigo-900/10 p-2 rounded-lg shadow">
          <MonthlyTrendChart
            data={monthlyTrendData?.monthlyRetailingTrend}
            loading={monthlyTrendLoading}
            error={monthlyTrendError}
          />
        </div>
      </section>

      {/* BOTTOM SECTION */}
      <section className="py-5 pt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-0 sm:px-6">
        <div>
          <TopBrandforms
            data={brandformData?.topBrandforms}
            loading={brandformLoading}
            error={brandformError}
          />
        </div>
        <div>
          <CategoryTable
            data={categoryData?.retailingByCategory || []}
            loading={categoryLoading}
            error={categoryError}
            filters={appliedFilters}
            source={dataSource}
          />
        </div>
        <div>
          <BaseChannelTable
            data={baseChannelData?.retailingByBaseChannel || []}
            loading={baseChannelLoading}
            error={baseChannelError}
          />
        </div>
      </section>
    </div>
  );
}
