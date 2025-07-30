/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

interface CategoryItem {
  category: string;
  breakdown: { year: number; value: number }[];
}

interface CategoryTableProps {
  data: CategoryItem[];
  loading: boolean;
  error: any;
}

const COLOR_PALETTE = [
  "text-rose-500 dark:text-rose-400",
  "text-orange-500 dark:text-orange-400",
  "text-yellow-500 dark:text-yellow-300",
  "text-green-500 dark:text-green-400",
  "text-teal-500 dark:text-teal-400",
  "text-sky-500 dark:text-sky-400",
  "text-indigo-500 dark:text-indigo-400",
  "text-violet-500 dark:text-violet-400",
  "text-pink-500 dark:text-pink-400",
  "text-emerald-500 dark:text-emerald-400",
];

const BG_COLORS = [
  "bg-indigo-100/50 dark:bg-indigo-900/30",
  "bg-emerald-100/50 dark:bg-emerald-900/30",
  "bg-amber-100/50 dark:bg-amber-900/30",
  "bg-rose-100/50 dark:bg-rose-900/30",
  "bg-sky-100/50 dark:bg-sky-900/30",
  "bg-violet-100/50 dark:bg-violet-900/30",
  "bg-pink-100/50 dark:bg-pink-900/30",
  "bg-lime-100/50 dark:bg-lime-900/30",
  "bg-purple-100/50 dark:bg-purple-900/30",
  "bg-cyan-100/50 dark:bg-cyan-900/30",
];

export default function CategoryTable({
  data = [],
  loading,
  error,
}: CategoryTableProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (loading) return <p className="dark:text-white">Loading categories...</p>;
  if (error)
    return (
      <p className="text-red-500">Error loading categories: {error.message}</p>
    );

  const uniqueYears = Array.from(
    new Set(data.flatMap((item) => item.breakdown.map((b) => b.year)))
  ).sort((a, b) => b - a); // descending
  const latestYear = uniqueYears[0];
  const previousYear = uniqueYears[1];

  const grandTotal = data.reduce(
    (sum, item) =>
      sum + item.breakdown.reduce((s, b) => s + (b?.value || 0), 0),
    0
  );

  const sortedData = [...data].sort((a, b) => {
    const aTotal = a.breakdown.reduce((sum, b) => sum + (b?.value || 0), 0);
    const bTotal = b.breakdown.reduce((sum, b) => sum + (b?.value || 0), 0);
    return bTotal - aTotal;
  });

  return (
    <Card className="shadow-md bg-slate-100/40 dark:bg-slate-800/30 border-transparent">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center">
          Retailing by Category
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border-separate border-spacing-y-2">
          <thead>
            <tr>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2 text-right">Total (Lakhs)</th>
              <th className="px-4 py-2 text-right">% Share</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map(({ category, breakdown }, index) => {
              const yearMap = Object.fromEntries(
                breakdown.map(({ year, value }) => [year, value])
              );
              const total = uniqueYears.reduce(
                (sum, y) => sum + (yearMap[y] || 0),
                0
              );
              const share = grandTotal ? (total / grandTotal) * 100 : 0;
              const latestVal = yearMap[latestYear] || 0;
              const prevVal = yearMap[previousYear] || 0;
              const growth = prevVal > 0 ? (latestVal / prevVal) * 100 : null;

              const isExpanded = expanded === category;

              return (
                <>
                  <tr
                    key={index}
                    className={`cursor-pointer transition-colors hover:bg-muted ${
                      BG_COLORS[index % BG_COLORS.length]
                    }`}
                    onClick={() => setExpanded(isExpanded ? null : category)}
                  >
                    <td
                      className={`px-4 py-2 font-medium ${
                        COLOR_PALETTE[index % COLOR_PALETTE.length]
                      } rounded-l-lg`}
                    >
                      {category || "Unknown"}
                    </td>
                    <td className="px-4 py-2 text-right">
                      {(total / 100000).toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-right rounded-r-lg">
                      {share.toFixed(1)}%
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr className="bg-slate-50 dark:bg-slate-800/70">
                      <td colSpan={3} className="px-6 pb-4 pt-2">
                        <div className="text-sm space-y-1 text-gray-700 dark:text-gray-200">
                          <p>
                            <strong>{latestYear}:</strong>{" "}
                            {(latestVal / 100000).toFixed(2)} Lakhs (
                            {((latestVal / grandTotal) * 100).toFixed(1)}%)
                          </p>
                          <p>
                            <strong>{previousYear}:</strong>{" "}
                            {(prevVal / 100000).toFixed(2)} Lakhs (
                            {((prevVal / grandTotal) * 100).toFixed(1)}%)
                          </p>
                          <p>
                            <strong>Index:</strong>{" "}
                            {growth !== null ? (
                              <span
                                className={
                                  growth > 100
                                    ? "text-green-600 font-semibold"
                                    : "text-red-600 font-semibold"
                                }
                              >
                                {growth.toFixed(1)}%
                              </span>
                            ) : (
                              "N/A"
                            )}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
