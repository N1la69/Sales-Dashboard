/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  if (loading) return <p className="dark:text-white">Loading categories...</p>;
  if (error)
    return (
      <p className="text-red-500">Error loading categories: {error.message}</p>
    );

  const uniqueYears = Array.from(
    new Set(data.flatMap((item) => item.breakdown.map((b) => b.year)))
  ).sort((a, b) => b - a); // descending
  const [latestYear, previousYear] = uniqueYears;

  const categoryMap: Record<string, Record<number, number>> = {};
  const allCategories = data.map((item) => item.category);

  data.forEach(({ category, breakdown }) => {
    if (!categoryMap[category]) categoryMap[category] = {};
    breakdown.forEach(({ year, value }) => {
      categoryMap[category][year] = value;
    });
  });

  const sortedCategories = [...allCategories].sort((a, b) => {
    const sumA = Object.values(categoryMap[a]).reduce((sum, v) => sum + v, 0);
    const sumB = Object.values(categoryMap[b]).reduce((sum, v) => sum + v, 0);
    return sumB - sumA;
  });

  return (
    <Card className="shadow-md bg-slate-100/40 dark:bg-slate-800/30 border-transparent">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center">
          Retailing by Category (in Lakhs)
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border-separate border-spacing-y-2">
          <thead>
            <tr>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2 text-right">Total</th>
              {uniqueYears.map((year) => (
                <th key={year} className="px-4 py-2 text-right">
                  {year}
                </th>
              ))}
              <th className="px-4 py-2 text-right">Index</th>
            </tr>
          </thead>
          <tbody>
            {sortedCategories.map((category, index) => {
              const yearly = categoryMap[category];
              const total = uniqueYears.reduce(
                (sum, y) => sum + (yearly[y] || 0),
                0
              );
              const latest = yearly[latestYear] ?? 0;
              const previous = yearly[previousYear] ?? 0;
              const growth =
                previous && previous !== 0 ? (latest / previous) * 100 : null;

              const growthColor =
                growth === null
                  ? "text-gray-500"
                  : growth > 100
                  ? "text-green-500"
                  : growth < 100
                  ? "text-red-500"
                  : "text-gray-500";

              return (
                <tr
                  key={index}
                  className={`transition-colors hover:bg-muted dark:hover:bg-accent ${
                    BG_COLORS[index % BG_COLORS.length]
                  }`}
                >
                  <td
                    className={`px-4 py-2 font-medium ${
                      COLOR_PALETTE[index % COLOR_PALETTE.length]
                    } rounded-l-lg`}
                  >
                    {category || "Unknown"}
                  </td>
                  <td className="px-4 py-2 text-right font-semibold">
                    {(total / 100000).toFixed(2)}
                  </td>
                  {uniqueYears.map((year) => (
                    <td key={year} className="px-4 py-2 text-right">
                      <div>
                        {yearly[year]
                          ? (yearly[year] / 100000).toFixed(2)
                          : "0.00"}
                      </div>
                    </td>
                  ))}
                  <td
                    className={`px-4 py-2 text-right font-medium rounded-r-lg ${growthColor}`}
                  >
                    {growth !== null
                      ? `${growth > 100 ? "+" : "-"}${growth.toFixed(1)}%`
                      : "N/A"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
