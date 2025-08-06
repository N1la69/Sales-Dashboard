/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

interface TopBrandformsProps {
  data:
    | {
        brandform: string;
        breakdown: { year: number; value: number }[];
        growth?: number | null;
      }[]
    | undefined;
  loading: boolean;
  error: any;
}

export default function TopBrandforms({
  data,
  loading,
  error,
}: TopBrandformsProps) {
  if (loading) return <p>Loading top brandforms...</p>;
  if (error) return <p>Error loading brandforms: {error.message}</p>;
  if (!data || data.length === 0) return <p>No brandform data available.</p>;

  // Extract unique years
  const allYears = Array.from(
    new Set(data.flatMap((item) => item.breakdown.map((b) => b.year)))
  ).sort((a, b) => b - a);

  const [latestYear, prevYear] = allYears;

  return (
    <Card className="shadow-md bg-slate-100/40 dark:bg-slate-800/30 border-transparent">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center">
          Top 10 Brandforms (in Lakhs)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border-separate border-spacing-y-2">
            <thead>
              <tr>
                <th className="px-4 py-2">Brandform</th>
                {allYears.map((year) => (
                  <th key={year} className="text-right px-4 py-2">
                    {year}
                  </th>
                ))}
                <th className="text-right px-4 py-2">Index</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                const { brandform, breakdown, growth } = item;

                const yearly: Record<number, number> = {};
                breakdown.forEach((b) => {
                  yearly[b.year] = b.value;
                });

                const growthColor =
                  growth === null || growth === undefined
                    ? "text-gray-500"
                    : growth > 100
                    ? "text-green-500"
                    : growth < 100
                    ? "text-red-500"
                    : "text-gray-500";

                return (
                  <tr
                    key={brandform}
                    className={`hover:bg-muted ${
                      BG_COLORS[index % BG_COLORS.length]
                    } rounded-lg`}
                  >
                    <td className="px-4 py-2 font-medium rounded-l-lg">
                      {brandform}
                    </td>
                    {allYears.map((year) => (
                      <td key={year} className="px-4 py-2 text-right">
                        <span
                          className={
                            year === latestYear
                              ? "font-bold text-black dark:text-white"
                              : ""
                          }
                        >
                          {yearly[year]
                            ? (yearly[year] / 100000).toFixed(2)
                            : "0.00"}
                        </span>
                      </td>
                    ))}
                    <td
                      className={`px-4 py-2 text-right font-medium rounded-r-lg ${growthColor}`}
                    >
                      {growth !== null && growth !== undefined
                        ? `${growth > 100 ? "+" : "-"}${growth.toFixed(1)}%`
                        : "N/A"}
                    </td>
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
