"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface RetailingCategoryPieProps {
  data: { category: string; retailing: number }[];
  loading?: boolean;
  error?: { message: string };
}

const LIGHT_COLORS = [
  "#4f46e5", // indigo
  "#06b6d4", // cyan
  "#22c55e", // green
  "#facc15", // yellow
  "#f97316", // orange
  "#ec4899", // pink
  "#8b5cf6", // violet
  "#10b981", // emerald
];

const DARK_COLORS = [
  "#3b82f6", // bright blue
  "#0ea5e9", // sky blue
  "#22c55e", // green
  "#eab308", // amber
  "#f97316", // orange
  "#ec4899", // pink
  "#8b5cf6", // violet
  "#14b8a6", // teal
];

export default function RetailingCategoryPie({
  data = [],
  loading,
  error,
}: RetailingCategoryPieProps) {
  if (loading) return <p>Loading category data...</p>;
  if (error) return <p>Error loading category data: {error.message}</p>;
  if (!data.length) return <p>No category data available.</p>;

  const total = data.reduce((sum, item) => sum + item.retailing, 0);
  const pieData = data.map((item) => ({
    name: item.category,
    value: Math.round((item.retailing / total) * 100),
  }));

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
        Retailing by Category
      </h2>

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
