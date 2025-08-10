"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";

const LIGHT_COLORS = [
  "#4f46e5",
  "#059669",
  "#f59e0b",
  "#ef4444",
  "#0ea5e9",
  "#8b5cf6",
  "#f43f5e",
  "#10b981",
];

const DARK_COLORS = [
  "#60a5fa",
  "#38bdf8",
  "#4ade80",
  "#facc15",
  "#fb923c",
  "#f472b6",
  "#a78bfa",
  "#2dd4bf",
];

interface ChannelBreakdownItem {
  year: number;
  value: number;
}

interface RetailingChannelPieProps {
  data: {
    base_channel: string;
    breakdown: ChannelBreakdownItem[];
  }[];
  loading?: boolean;
  error?: { message: string };
}

export default function RetailingChannelPie({
  data = [],
  loading,
  error,
}: RetailingChannelPieProps) {
  const allYears = Array.from(
    new Set(data.flatMap((item) => item.breakdown.map((b) => b.year)))
  ).sort((a, b) => b - a);

  const [selectedYear, setSelectedYear] = useState<number>(allYears[0]);

  if (loading) return <p>Loading channel data...</p>;
  if (error) return <p>Error loading channel data: {error.message}</p>;
  if (!data.length) return <p>No channel data available.</p>;

  const selectedYearData = data
    .map((item) => {
      const entry = item.breakdown.find((b) => b.year === selectedYear);
      return {
        name: item.base_channel || "Unknown",
        value: entry?.value ?? 0,
      };
    })
    .filter((item) => item.value > 0);

  const total = selectedYearData.reduce((sum, item) => sum + item.value, 0);

  const pieData = selectedYearData.map((item) => ({
    name: item.name,
    value: Math.round((item.value / total) * 100),
  }));

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Retailing by Channel (Base)
        </h2>
        <select
          className="ml-1 py-1 px-2 rounded-xl border border-indigo-300 dark:border-indigo-700 bg-indigo-50/30 dark:bg-indigo-950/20 
                     focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all placeholder:text-indigo-400 
                     dark:placeholder:text-indigo-500 text-indigo-700 dark:text-indigo-200"
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
        >
          {allYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Light Mode Pie Chart */}
      <div className="block dark:hidden w-full h-[20rem]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {pieData.map((_, index) => (
                <Cell
                  key={index}
                  fill={LIGHT_COLORS[index % LIGHT_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `${value}%`} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Dark Mode Pie Chart */}
      <div className="hidden dark:block w-full h-[20rem]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {pieData.map((_, index) => (
                <Cell
                  key={index}
                  fill={DARK_COLORS[index % DARK_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937", // gray-800
                borderColor: "#374151", // gray-700
                color: "#f9fafb", // gray-50
              }}
              formatter={(value: number) => `${value}%`}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
