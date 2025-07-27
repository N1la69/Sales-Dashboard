/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CategoryTableProps {
  data: { category: string; retailing: number }[];
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
  const total = data.reduce((sum, item) => sum + item.retailing, 0);
  const sortedData = [...data].sort((a, b) => b.retailing - a.retailing);

  if (loading) return <p className="dark:text-white">Loading categories...</p>;
  if (error)
    return (
      <p className="text-red-500">Error loading categories: {error.message}</p>
    );

  return (
    <Card className="shadow-md bg-slate-100/40 dark:bg-slate-800/30 border-transparent">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center">
          Retailing by Category
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 font-semibold text-sm text-gray-900 dark:text-gray-300 px-2 pb-2">
          <div>Category</div>
          <div className="text-right">Value (Lakhs)</div>
          <div className="text-right">% Share</div>
        </div>
        <ul className="space-y-2">
          {sortedData.map(({ category, retailing }, index) => {
            const percent = total > 0 ? (retailing / total) * 100 : 0;
            return (
              <li
                key={category}
                className={`grid grid-cols-3 items-center rounded-md px-3 py-1.5 text-sm font-medium hover:bg-muted transition-colors ${
                  BG_COLORS[index % BG_COLORS.length]
                }`}
              >
                <span
                  className={`${COLOR_PALETTE[index % COLOR_PALETTE.length]}`}
                >
                  {category || "Unknown"}
                </span>
                <span className="text-right">
                  {(retailing / 100000).toFixed(2)}
                </span>
                <span className="text-right">{percent.toFixed(1)}%</span>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
