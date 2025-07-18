"use client";

import StatCard from "@/components/structures/StatCard";
import { useQuery, gql } from "@apollo/client";
import filterValues from "@/constants/filterValues";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const GET_TOTAL_RETAILING = gql`
  query GetTotalRetailing($filters: FilterInput) {
    totalRetailing(filters: $filters)
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

const Dashboard = () => {
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string | number;
  }>({});

  const { data, loading, error, refetch } = useQuery(GET_TOTAL_RETAILING, {
    variables: { filters: selectedFilters },
  });

  const handleFilterChange = (key: string, value: string | number) => {
    const updatedFilters = { ...selectedFilters, [key]: value };
    setSelectedFilters(updatedFilters);
    refetch({ filters: updatedFilters });
  };

  const removeFilter = (key: string) => {
    const updatedFilters = { ...selectedFilters };
    delete updatedFilters[key];
    setSelectedFilters(updatedFilters);
    refetch({ filters: updatedFilters });
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
    refetch({ filters: {} });
  };

  return (
    <div className="pt-3 mx-5 z-10 dark:text-gray-200">
      <div className="flex flex-col text-center">
        <h1 className="text-3xl font-bold">Sales Overview</h1>
        <p className="text-gray-500 font-semibold text-xl">
          Your current sales summary and activity
        </p>
      </div>

      {/* FILTERS */}
      <div className="flex justify-center items-center gap-2 mt-4 pb-4 flex-wrap">
        {filters.map((filter) => (
          <Select
            key={filter.key}
            onValueChange={(value) => handleFilterChange(filter.key, value)}
            value={selectedFilters[filter.key]?.toString() ?? ""}
          >
            <SelectTrigger>
              <SelectValue placeholder={`Select ${filter.label}`} />
            </SelectTrigger>
            <SelectContent>
              {filter.values.map((val: string | number) => (
                <SelectItem key={val} value={val.toString()}>
                  {val}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
      </div>

      {/* SELECTED FILTERS */}
      {Object.keys(selectedFilters).length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {Object.entries(selectedFilters).map(([key, value]) => (
            <span
              key={key}
              className="flex items-center bg-primary text-primary-foreground rounded-full px-3 py-1 text-sm"
            >
              {`${key}: ${value}`}
              <button
                onClick={() => removeFilter(key)}
                className="ml-2 hover:text-red-400"
              >
                <X size={14} />
              </button>
            </span>
          ))}
          <Button variant="outline" size="sm" onClick={clearAllFilters}>
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
};

export default Dashboard;
