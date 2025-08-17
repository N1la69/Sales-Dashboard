"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";

interface BreakdownItem {
  year: number;
  value: number;
  label: string; // 👈 add label from API ("2023-24")
}

interface CategoryBreakdown {
  category: string;
  breakdown: BreakdownItem[];
}

interface RetailingCategoryPieProps {
  data: CategoryBreakdown[];
  loading?: boolean;
  error?: { message: string };
}

const LIGHT_COLORS = [
  "#4f46e5",
  "#06b6d4",
  "#22c55e",
  "#facc15",
  "#f97316",
  "#ec4899",
  "#8b5cf6",
  "#10b981",
];

const DARK_COLORS = [
  "#3b82f6",
  "#0ea5e9",
  "#22c55e",
  "#eab308",
  "#f97316",
  "#ec4899",
  "#8b5cf6",
  "#14b8a6",
];

export default function RetailingCategoryPie({
  data = [],
  loading,
  error,
}: RetailingCategoryPieProps) {
  if (loading) return <p>Loading category data...</p>;
  if (error) return <p>Error loading category data: {error.message}</p>;
  if (!data.length) return <p>No category data available.</p>;

  const allYears = Array.from(
    new Set(data.flatMap((item) => item.breakdown.map((b) => b.year)))
  ).sort((a, b) => b - a);

  const [selectedYear, setSelectedYear] = useState(allYears[0]);

  const selectedYearData = data
    .map((item) => {
      const entry = item.breakdown.find((b) => b.year === selectedYear);
      return {
        name: item.category || "Unknown",
        value: entry?.value ?? 0,
      };
    })
    .filter((item) => item.value > 0);

  const total = selectedYearData.reduce((sum, item) => sum + item.value, 0);
  const pieData = selectedYearData.map((item) => ({
    name: item.name,
    value: Math.round((item.value / total) * 100),
  }));

  // map year to fiscal label (find from any breakdown entry)
  const getLabel = (year: number) => {
    const entry = data.flatMap((d) => d.breakdown).find((b) => b.year === year);
    return entry?.label ?? `${year - 1}-${String(year).slice(-2)}`;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Category %
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
              {getLabel(year)}
            </option>
          ))}
        </select>
      </div>

      {/* Light Mode Chart */}
      <div className="w-full h-[20rem] dark:hidden">
        <ResponsiveContainer width="100%" height="100%">
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
                  key={`cell-light-${index}`}
                  fill={LIGHT_COLORS[index % LIGHT_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `${value}%`} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Dark Mode Chart */}
      <div className="w-full h-[20rem] hidden dark:block">
        <ResponsiveContainer width="100%" height="100%">
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
                  key={`cell-dark-${index}`}
                  fill={DARK_COLORS[index % DARK_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `${value}%`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
