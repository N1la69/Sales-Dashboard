"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const LIGHT_COLORS = [
  "#4f46e5", // indigo-600
  "#059669", // green-600
  "#f59e0b", // amber-500
  "#ef4444", // red-500
  "#0ea5e9", // sky-500
  "#8b5cf6", // violet-500
  "#f43f5e", // rose-500
  "#10b981", // emerald-500
];

const DARK_COLORS = [
  "#60a5fa", // blue-400
  "#38bdf8", // sky-400
  "#4ade80", // green-400
  "#facc15", // yellow-400 (good contrast)
  "#fb923c", // orange-400
  "#f472b6", // pink-400
  "#a78bfa", // violet-400
  "#2dd4bf", // teal-400
];

interface RetailingChannelPieProps {
  data: { broad_channel: string; retailing: number }[];
  loading?: boolean;
  error?: { message: string };
}

export default function RetailingChannelPie({
  data = [],
  loading,
  error,
}: RetailingChannelPieProps) {
  if (loading) return <p>Loading channel data...</p>;
  if (error) return <p>Error loading channel data: {error.message}</p>;
  if (!data.length) return <p>No channel data available.</p>;

  const total = data.reduce((sum, item) => sum + item.retailing, 0);
  const pieData = data.map((item) => ({
    name: item.broad_channel,
    value: Math.round((item.retailing / total) * 100), // percentage to nearest integer
  }));

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
        Retailing by Channel (Base)
      </h2>

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
