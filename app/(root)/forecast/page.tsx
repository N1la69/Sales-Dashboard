/* eslint-disable @typescript-eslint/no-explicit-any */

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

interface ForecastData {
  year: number;
  month: number;
  retailing: number;
}

interface PredictedData {
  month: string; // format YYYY-MM
  forecast: number;
}

async function fetchActual() {
  const res = await fetch("/api/forecast?type=actual");
  const data = await res.json();
  return data;
}

async function fetchForecast() {
  const res = await fetch("/api/forecast?type=forecast");
  const data = await res.json();
  return data;
}

const ForecastPage = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const actual: ForecastData[] = await fetchActual();
      const forecast: PredictedData[] = await fetchForecast();

      const combined = [
        ...actual.map((d) => ({
          date: `${d.year}-${String(d.month).padStart(2, "0")}`,
          actual: d.retailing,
        })),
        ...forecast.map((f) => ({
          date: f.month,
          forecast: f.forecast,
        })),
      ];

      // Optional: Sort by date
      combined.sort((a, b) => a.date.localeCompare(b.date));

      setData(combined);
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) return <p className="p-4">Loading forecast...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Sales Forecast</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="actual" stroke="#8884d8" />
          <Line type="monotone" dataKey="forecast" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForecastPage;
