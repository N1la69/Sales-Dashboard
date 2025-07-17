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

const GET_TOTAL_RETAILING = gql`
  query GetTotalRetailing {
    totalRetailing
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
  const { data, loading, error } = useQuery(GET_TOTAL_RETAILING);

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
      <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {filters.map((filter) => (
          <Select key={filter.label}>
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
