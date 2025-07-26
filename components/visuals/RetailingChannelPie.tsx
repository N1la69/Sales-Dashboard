"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#8dd1e1",
  "#a4de6c",
  "#d0ed57",
  "#ffc0cb",
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
      <h2 className="text-xl font-semibold">Retailing by Channel (Base)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `${value}%`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
