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

interface MonthlyTrendLineChartProps {
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

export default function MonthlyTrendLineChart({
  data,
  loading,
  error,
}: MonthlyTrendLineChartProps) {
  if (loading) return <p>Loading monthly trend...</p>;
  if (error) return <p>Error loading monthly trend data: {error.message}</p>;
  if (!data?.length) return <p>No trend data available.</p>;

  // Prepare unique months and years
  const uniqueMonths = [...new Set(data.map((d) => d.month))].sort(
    (a, b) => a - b
  );
  const uniqueYears = [...new Set(data.map((d) => d.year))];

  // Prepare chart data month-wise
  const chartData = uniqueMonths.map((month) => {
    const monthEntry: Record<string, number | string> = {
      month: monthNames[month - 1],
    };
    data
      .filter((d) => d.month === month)
      .forEach((d) => {
        monthEntry[d.year] = Number((d.retailing / 100000).toFixed(2));
      });
    return monthEntry;
  });

  // Determine min Y value (retailing in Lakhs)
  const allValues = data.map((d) => d.retailing / 100000);
  const minRetailing = Math.min(...allValues);
  const yAxisMin = minRetailing > 5 ? minRetailing - 5 : 0;

  return (
    <>
      <h2 className="text-xl font-semibold mb-2 text-center">
        Monthly Retailing Trend by Year
      </h2>
      <ResponsiveContainer width="100%" height={450}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="currentColor"
            opacity={0.2}
          />
          <XAxis
            dataKey="month"
            padding={{ left: 20, right: 20 }}
            stroke="currentColor"
            tick={{ fill: "currentColor" }}
          />
          <YAxis
            label={{
              value: "Retailing (Lakhs)",
              angle: -90,
              position: "insideLeft",
              fill: "currentColor",
            }}
            stroke="currentColor"
            tick={{ fill: "currentColor" }}
            domain={[yAxisMin, "auto"]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--background)",
              color: "var(--foreground)",
            }}
            labelStyle={{ color: "var(--foreground)" }}
          />
          <Legend wrapperStyle={{ color: "currentColor" }} />
          {uniqueYears.map((year, idx) => (
            <Line
              key={year}
              type="monotone"
              dataKey={String(year)}
              stroke={getColor(idx)}
              activeDot={{ r: 6 }}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

function getColor(index: number): string {
  // Adjust colors for better light/dark contrast
  const colors = [
    "#3b82f6", // Blue
    "#10b981", // Green
    "#f97316", // Orange
    "#f43f5e", // Rose
    "#a855f7", // Purple
    "#14b8a6", // Teal
  ];
  return colors[index % colors.length];
}
