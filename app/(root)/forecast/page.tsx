"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import dayjs from "dayjs";

interface ForecastData {
  year: number;
  month: number;
  retailing: number;
}

interface PredictedData {
  month: string; // format YYYY-MM
  forecast: number;
}

interface MergedDataPoint {
  month: string; // 'Jul', 'Aug', etc.
  [key: string]: number | string; // e.g., '2023 Actual': number, '2025 Forecast': number
}

async function fetchActual() {
  const res = await fetch("/api/forecast?type=actual");
  return res.json();
}

async function fetchForecast() {
  const res = await fetch("/api/forecast?type=forecast");
  return res.json();
}

const ForecastPage = () => {
  const [data, setData] = useState<MergedDataPoint[]>([]);
  const [lines, setLines] = useState<{ key: string; color: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const actual: ForecastData[] = await fetchActual();
      const forecast: PredictedData[] = await fetchForecast();

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

      const actualGrouped: Record<string, Record<string, number>> = {};
      const forecastGrouped: Record<string, Record<string, number>> = {};

      // Prepare actual data: { 'Jul': { '2023 Actual': value, '2024 Actual': value }, ... }
      actual.forEach(({ year, month, retailing }) => {
        const label = `${year} Actual`;
        const monthName = monthNames[month - 1];
        if (!actualGrouped[monthName]) actualGrouped[monthName] = {};
        actualGrouped[monthName][label] = retailing / 100000;
      });

      // Prepare forecast data
      forecast.forEach(({ month, forecast }) => {
        const m = dayjs(month);
        const label = `${m.year()} Forecast`;
        const monthName = monthNames[m.month()];
        if (!forecastGrouped[monthName]) forecastGrouped[monthName] = {};
        forecastGrouped[monthName][label] = forecast / 100000;
      });

      const merged: MergedDataPoint[] = [];

      const allMonths = new Set([
        ...Object.keys(actualGrouped),
        ...Object.keys(forecastGrouped),
      ]);

      const allLines = new Set<string>();

      allMonths.forEach((month) => {
        const row: MergedDataPoint = { month };
        Object.assign(row, actualGrouped[month]);
        Object.assign(row, forecastGrouped[month]);

        Object.keys(row).forEach((key) => {
          if (key !== "month") allLines.add(key);
        });

        merged.push(row);
      });

      // Assign colors (extend or customize as needed)
      const colorPalette = [
        "#8884d8",
        "#82ca9d",
        "#ffc658",
        "#ff7300",
        "#a4de6c",
        "#d0ed57",
      ];

      const dynamicLines = Array.from(allLines).map((key, idx) => ({
        key,
        color: colorPalette[idx % colorPalette.length],
      }));

      setData(merged);
      setLines(dynamicLines);
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading)
    return <p className="p-4 dark:text-gray-200">Loading forecast...</p>;

  return (
    <div className="pt-3 mx-5 z-10 dark:text-gray-200">
      <div className="flex flex-col text-center mb-5">
        <h1 className="text-3xl font-bold">Sales Forecast (in ₹ Lakhs)</h1>
        <p className="text-gray-600 dark:text-gray-400 font-semibold text-xl">
          Your trusted view of past performance and future sales trends.
        </p>
      </div>

      {/* FORECAST CHART */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,100,100,0.2)" />
          <XAxis dataKey="month" tick={{ fill: "currentColor" }} />
          <YAxis
            tick={{ fill: "currentColor" }}
            tickFormatter={(v) => `${v.toFixed(1)}L`}
            domain={["dataMin + 1", "auto"]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#f9f9f9",
              color: "#000",
              borderColor: "#ccc",
            }}
            formatter={(value: number, name: string) => [
              `${value.toFixed(2)} Lakhs`,
              name,
            ]}
            labelFormatter={(label) => label}
          />
          <Legend wrapperStyle={{ color: "currentColor" }} />
          {lines.map((line) => (
            <Line
              key={line.key}
              type="monotone"
              dataKey={line.key}
              stroke={line.color}
              strokeWidth={2}
              activeDot={{ r: 5 }}
              name={line.key}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      {/* FORECAST TABLE */}
    </div>
  );
};

export default ForecastPage;
