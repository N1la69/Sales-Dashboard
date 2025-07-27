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
    <Card className="bg-red-100/20 dark:bg-rose-300/5 shadow-md border-transparent">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center">
          Retailing by Category
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!loading && !error && (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-muted">
                <th className="py-1">Category</th>
                <th className="py-1">Retailing (Lakhs)</th>
                <th className="py-1">% Share</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map(({ category, retailing }, index) => (
                <tr
                  key={category}
                  className="border-b border-muted hover:bg-muted/50 transition-colors"
                >
                  <td
                    className={`py-1 font-medium ${
                      COLOR_PALETTE[index % COLOR_PALETTE.length]
                    }`}
                  >
                    {category || "Unknown"}
                  </td>
                  <td className="py-1">{(retailing / 100000).toFixed(2)}</td>
                  <td className="py-1">
                    {total > 0 ? ((retailing / total) * 100).toFixed(1) : "0.0"}
                    %
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CardContent>
    </Card>
  );
}
