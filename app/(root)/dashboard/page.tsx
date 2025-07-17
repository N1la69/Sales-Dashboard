"use client";

import StatCard from "@/components/structures/StatCard";
import { useQuery, gql } from "@apollo/client";
//import { useEffect, useState } from "react";

const GET_TOTAL_RETAILING = gql`
  query GetTotalRetailing {
    totalRetailing
  }
`;

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
      <div className="my-6">{/* Placeholder for Filters */}</div>

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
