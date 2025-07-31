/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  LineChart,
  BarChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface TrendData {
  year: number;
  month: number;
  retailing: number;
}

interface MonthlyTrendChartProps {
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

export default function MonthlyTrendChart({
  data,
  loading,
  error,
}: MonthlyTrendChartProps) {
  const [chartType, setChartType] = useState<"line" | "bar">("line");

  if (loading) return <p>Loading monthly trend...</p>;
  if (error) return <p>Error loading monthly trend data: {error.message}</p>;
  if (!data?.length) return <p>No trend data available.</p>;

  const uniqueMonths = [...new Set(data.map((d) => d.month))].sort(
    (a, b) => a - b
  );
  const uniqueYears = [...new Set(data.map((d) => d.year))];

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

  const allValues = data.map((d) => d.retailing / 100000);
  const minRetailing = Math.min(...allValues);
  const yAxisMin = minRetailing > 5 ? minRetailing - 5 : 0;

  return (
    <>
      {/* HEADER & TOGGLE BUTTON */}
      <div className="relative flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
        <h2 className="text-lg sm:text-xl font-semibold text-center w-full">
          Monthly Retailing Trend by Year (in Lakhs)
        </h2>
        <div className="sm:absolute sm:right-4 sm:top-4 self-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setChartType((prev) => (prev === "line" ? "bar" : "line"))
            }
          >
            {chartType === "line" ? "Show Bar Chart" : "Show Line Chart"}
          </Button>
        </div>
      </div>

      {/* LEGEND */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-3 text-sm sm:text-base text-gray-700 dark:text-gray-300">
        {uniqueYears.map((year, idx) => (
          <div key={year} className="flex items-center gap-2">
            <span
              className="inline-block w-4 h-1.5 rounded-sm"
              style={{ backgroundColor: getColor(idx) }}
            />
            <span>{year}</span>
          </div>
        ))}
      </div>

      {/* CHART */}
      <div className="w-full h-[18.75rem] sm:h-[31.25rem]">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "line" ? (
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
                stroke="currentColor"
                tick={{ fill: "currentColor", fontSize: 12 }}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis
                label={{
                  value: "Retailing",
                  angle: -90,
                  position: "insideLeft",
                  fill: "currentColor",
                }}
                stroke="currentColor"
                tick={{ fill: "currentColor", fontSize: 12 }}
                domain={[yAxisMin, "auto"]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                }}
                labelStyle={{ color: "var(--foreground)" }}
              />
              {uniqueYears.map((year, idx) => (
                <Line
                  key={year}
                  type="monotone"
                  dataKey={String(year)}
                  stroke={getColor(idx)}
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          ) : (
            <BarChart
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
                stroke="currentColor"
                tick={{ fill: "currentColor", fontSize: 12 }}
              />
              <YAxis
                label={{
                  value: "Retailing",
                  angle: -90,
                  position: "insideLeft",
                  fill: "currentColor",
                }}
                stroke="currentColor"
                tick={{ fill: "currentColor", fontSize: 12 }}
                domain={[yAxisMin, "auto"]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                }}
                labelStyle={{ color: "var(--foreground)" }}
              />
              {uniqueYears.map((year, idx) => (
                <Bar
                  key={year}
                  dataKey={String(year)}
                  fill={getColor(idx)}
                  barSize={30}
                />
              ))}
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </>
  );
}

function getColor(index: number): string {
  const colors = [
    "#60a5fa", // blue-400
    "#34d399", // emerald-400
    "#fbbf24", // amber-400
    "#f87171", // red-400
    "#c084fc", // purple-400
    "#38bdf8", // sky-400
    "#fb7185", // rose-400
    "#f472b6", // pink-400
    "#4ade80", // green-400
  ];
  return colors[index % colors.length];
}
