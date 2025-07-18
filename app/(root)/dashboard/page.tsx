"use client";

import StatCard from "@/components/structures/StatCard";
import filterValues from "@/constants/filterValues";
import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import MultiSelect from "@/components/MultiSelect";

const GET_TOTAL_RETAILING = gql`
  query GetTotalRetailing($filters: FilterInput, $source: String) {
    totalRetailing(filters: $filters, source: $source)
  }
`;

const filters = [
  { label: "Year", key: "Year", values: filterValues.years },
  { label: "Month", key: "Month", values: filterValues.months },
  { label: "Category", key: "Category", values: filterValues.categories },
  { label: "Brand", key: "Brand", values: filterValues.brands },
  { label: "Brandform", key: "Brandform", values: filterValues.brandforms },
  { label: "Branch", key: "Branch", values: filterValues.branches },
  { label: "ZM", key: "ZM", values: filterValues.zms },
  { label: "SM", key: "SM", values: filterValues.sms },
  { label: "BE", key: "BE", values: filterValues.bes },
  { label: "Channel", key: "Channel", values: filterValues.channels },
  {
    label: "Broad Channel",
    key: "BroadChannel",
    values: filterValues.broadChannels,
  },
  {
    label: "Short Channel",
    key: "ShortChannel",
    values: filterValues.shortChannels,
  },
];

export default function Dashboard() {
  const [pendingFilters, setPendingFilters] = useState<{
    [key: string]: (string | number)[];
  }>({});
  const [appliedFilters, setAppliedFilters] = useState<{
    [key: string]: (string | number)[];
  }>({});
  const [dataSource, setDataSource] = useState<"combined" | "main" | "temp">(
    "combined"
  );

  const { data, loading, error, refetch } = useQuery(GET_TOTAL_RETAILING, {
    variables: { filters: appliedFilters, source: dataSource },
  });

  const handleFilterChange = (key: string, values: (string | number)[]) => {
    setPendingFilters((prev) => ({
      ...prev,
      [key]: values,
    }));
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

      {/* DATA SOURCE TOGGLE */}
      <div className="flex justify-center gap-3 my-4">
        <Button
          variant={dataSource === "combined" ? "default" : "outline"}
          onClick={() => handleSourceChange("combined")}
        >
          Combined
        </Button>
        <Button
          variant={dataSource === "main" ? "default" : "outline"}
          onClick={() => handleSourceChange("main")}
        >
          Main DB
        </Button>
        <Button
          variant={dataSource === "temp" ? "default" : "outline"}
          onClick={() => handleSourceChange("temp")}
        >
          Temp DB
        </Button>
      </div>

      {/* MULTI-SELECT FILTERS */}
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

      {/* SELECTED FILTERS */}
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

      {/* Apply & Clear Buttons */}
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

      <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error fetching data: {error.message}</p>}
        {data && (
          <StatCard title="Total Retailing" value={data.totalRetailing} />
        )}
      </div>
    </div>
  );
}
