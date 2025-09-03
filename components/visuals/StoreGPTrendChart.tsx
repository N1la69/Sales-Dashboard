"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

interface GpTrendData {
  year: number;
  month: number;
  gp: number;
}

interface StoreGPTrendChartProps {
  data: GpTrendData[] | undefined;
  loading: boolean;
  error: any;
  gpType?: string;
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

function formatFiscalYear(year: number): string {
  return `${year - 1}-${String(year).slice(-2)}`;
}

const fiscalMonthOrder = [7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6];

export default function StoreGPTrendChart({
  data,
  loading,
  error,
  gpType,
}: StoreGPTrendChartProps) {
  if (loading)
    return <p className="text-muted-foreground">Loading GP trend...</p>;
  if (error)
    return (
      <p className="text-destructive">
        Error loading GP trend: {error.message}
      </p>
    );
  if (!data || data.length === 0)
    return <p className="text-muted-foreground">No GP trend data available.</p>;

  const uniqueMonths = [...new Set(data.map((d) => d.month))].sort(
    (a, b) => fiscalMonthOrder.indexOf(a) - fiscalMonthOrder.indexOf(b)
  );
  const uniqueYears = [...new Set(data.map((d) => d.year))];

  const chartData = uniqueMonths.map((month) => {
    const entry: Record<string, number | string> = {
      month: monthNames[month - 1],
    };
    data
      .filter((d) => d.month === month)
      .forEach((d) => {
        entry[d.year] = Number(d.gp);
      });
    return entry;
  });

  return (
    <div className="w-full h-[20rem] sm:h-[25rem] md:h-[28rem] lg:h-[32rem]">
      <div>
        <h1 className="text-xl font-semibold mb-3">
          GP Trend Chart:{" "}
          <span className="text-blue-600 dark:text-blue-400">{gpType}</span>
        </h1>
      </div>

      {/* LEGEND */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
        {uniqueYears.map((year, idx) => (
          <div key={year} className="flex items-center gap-2">
            <span
              className="inline-block w-4 h-1.5 rounded-sm"
              style={{ backgroundColor: getColor(idx) }}
            />
            <span>{formatFiscalYear(year)}</span>
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, left: 10, bottom: 5, right: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis
            dataKey="month"
            tick={{ fill: "currentColor", fontSize: 12 }}
          />
          <YAxis
            label={{
              value: "Golden Points Achieved",
              angle: -90,
              position: "insideLeft",
              fill: "currentColor",
              fontSize: 12,
            }}
            tick={{ fill: "currentColor", fontSize: 12 }}
            domain={[(dataMin: number) => Math.floor(dataMin * 0.9), "auto"]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#f9f9f9",
              borderColor: "#ccc",
              color: "#000",
              fontSize: "0.875rem",
            }}
            formatter={(value, name) => [value, formatFiscalYear(Number(name))]}
          />
          {uniqueYears.map((year, idx) => (
            <Bar
              key={year}
              dataKey={String(year)}
              fill={getColor(idx)}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
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
