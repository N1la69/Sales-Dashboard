/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface TrendData {
  year: number;
  month: number;
  retailing: number;
}

interface StoreRetailingTrendChartProps {
  data: TrendData[] | undefined;
  loading: boolean;
  error: any;
}

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function StoreRetailingTrendChart({
  data,
  loading,
  error,
}: StoreRetailingTrendChartProps) {
  if (loading) return <p>Loading retailing trend...</p>;
  if (error) return <p>Error loading trend data: {error.message}</p>;
  if (!data || data.length === 0) return <p>No trend data available.</p>;

  // Prepare months
  const uniqueMonths = Array.from(new Set(data.map((d) => d.month))).sort(
    (a, b) => a - b
  );

  const chartData = uniqueMonths.map((month) => {
    const entry: Record<string, number | string> = {
      month: monthNames[month - 1],
    };

    data
      .filter((d) => d.month === month)
      .forEach((d) => {
        entry[d.year] = Number((d.retailing / 100000).toFixed(2));
      });

    return entry;
  });

  const years = Array.from(new Set(data.map((d) => d.year)));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis
          label={{
            value: "Retailing (Lakhs)",
            angle: -90,
            position: "insideLeft",
          }}
          tick={{ fill: "currentColor" }}
          domain={[(dataMin: number) => Math.floor(dataMin * 0.9), "auto"]}
        />
        <Tooltip />
        <Legend />
        {years.map((year, idx) => (
          <Line
            key={year}
            type="monotone"
            dataKey={String(year)}
            stroke={getColor(idx)}
            strokeWidth={2}
            activeDot={{ r: 5 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

function getColor(index: number): string {
  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ff7300",
    "#d88484",
    "#84d8d8",
    "#d884d8",
  ];
  return colors[index % colors.length];
}
