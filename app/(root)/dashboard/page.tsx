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

const GET_TOTAL_RETAILING = gql`
  query GetTotalRetailing($filters: FilterInput) {
    totalRetailing(filters: $filters)
  }
`;

const filters = [
  { label: "Year", values: filterValues.years },
  { label: "Month", values: filterValues.months },
  { label: "Category", values: filterValues.categories },
  { label: "Brand", values: filterValues.brands },
  { label: "Brandform", values: filterValues.brandforms },
  { label: "Branch", values: filterValues.branches },
  { label: "ZM", values: filterValues.zms },
  { label: "SM", values: filterValues.sms },
  { label: "BE", values: filterValues.bes },
  { label: "Channel", values: filterValues.channels },
  { label: "Broad Channel", values: filterValues.broadChannels },
  { label: "Short Channel", values: filterValues.shortChannels },
];

const Dashboard = () => {
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string | number;
  }>({});

  const { data, loading, error } = useQuery(GET_TOTAL_RETAILING, {
    variables: {
      filters: selectedFilters,
    },
  });

  const handleFilterChange = (label: string, value: string | number) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  return (
    <div className="pt-3 mx-5 z-10 dark:text-gray-200">
      {/* HEADING */}
      <div className="flex flex-col text-center">
        <h1 className="text-3xl font-bold">Sales Overview</h1>
        <p className="text-gray-500 font-semibold text-xl">
          Your current sales summary and activity
        </p>
      </div>

      {/* FILTERS */}
      <div className="flex justify-center items-center gap-2 mt-4 pb-4">
        {filters.map((filter) => (
          <Select
            key={filter.label}
            onValueChange={(value) => handleFilterChange(filter.label, value)}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={`Select ${filter.label}`}
                defaultValue={selectedFilters[filter.label]}
              />
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

      {/* MAIN CONTENT */}
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error fetching data</p>}
        {data && (
          <StatCard title="Total Retailing" value={data.totalRetailing} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
