"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface CategoryRetailingStat {
  category: string;
  retailing: number;
  yearWise: {
    year: number;
    value: number;
  }[];
}

interface Props {
  data: CategoryRetailingStat[];
  latestYears?: number[];
}

const ROW_COLORS = [
  "bg-indigo-50 dark:bg-indigo-900/20",
  "bg-emerald-50 dark:bg-emerald-900/20",
  "bg-amber-50 dark:bg-amber-900/20",
  "bg-rose-50 dark:bg-rose-900/20",
  "bg-sky-50 dark:bg-sky-900/20",
];

export default function StoreCategoryTable({ data, latestYears }: Props) {
  const topYears =
    latestYears ??
    Array.from(new Set(data.flatMap((d) => d.yearWise.map((y) => y.year))))
      .sort((a, b) => b - a)
      .slice(0, 2);

  return (
    <Card className="mt-6 rounded-2xl shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Category Retailing Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border-separate border-spacing-y-2 overflow-hidden">
            <thead className="font-semibold">
              <tr>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2 text-right">Total (₹)</th>
                {topYears.map((year) => (
                  <th key={year} className="px-4 py-2 text-right">
                    {year} (₹)
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => {
                const yearMap = new Map(
                  row.yearWise.map((entry) => [entry.year, entry.value])
                );
                const rowColor = ROW_COLORS[index % ROW_COLORS.length];

                return (
                  <tr key={row.category} className={`${rowColor}`}>
                    <td className="px-4 py-2 font-medium">{row.category}</td>
                    <td className="px-4 py-2 text-right font-semibold text-indigo-700 dark:text-indigo-300">
                      {row.retailing?.toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    {topYears.map((year) => (
                      <td key={year} className="px-4 py-2 text-right">
                        {yearMap.has(year)
                          ? yearMap.get(year)!.toLocaleString("en-IN", {
                              maximumFractionDigits: 2,
                            })
                          : "0.00"}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
