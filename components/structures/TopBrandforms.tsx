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
        year: number;
        retailing: number;
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

  const brandformMap: Record<string, Record<number, number>> = {};
  const allYears = new Set<number>();

  data.forEach(({ brandform, year, retailing }) => {
    if (!brandformMap[brandform]) brandformMap[brandform] = {};
    brandformMap[brandform][year] = retailing;
    allYears.add(year);
  });

  const sortedYears = Array.from(allYears).sort((a, b) => b - a);
  const [latestYear, prevYear] = sortedYears;
  const brandforms = Object.keys(brandformMap);

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
                <th className="text-right px-4 py-2">Total</th>
                {sortedYears.map((year) => (
                  <th key={year} className="text-right px-4 py-2">
                    {year}
                  </th>
                ))}
                <th className="text-right px-4 py-2">Index</th>
              </tr>
            </thead>
            <tbody>
              {brandforms.map((brandform, index) => {
                const yearlyData = brandformMap[brandform];
                const totalRetailing = sortedYears.reduce(
                  (sum, year) => sum + (yearlyData[year] || 0),
                  0
                );

                const latest = yearlyData[latestYear] ?? 0;
                const previous = yearlyData[prevYear] ?? 0;
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
                    key={brandform}
                    className={`hover:bg-muted ${
                      BG_COLORS[index % BG_COLORS.length]
                    } rounded-lg`}
                  >
                    <td className="px-4 py-2 font-medium rounded-l-lg">
                      {brandform}
                    </td>
                    <td className="px-4 py-2 text-right font-semibold">
                      {(totalRetailing / 100000).toFixed(2)}
                    </td>
                    {sortedYears.map((year) => {
                      const retailing = yearlyData[year];
                      return (
                        <td key={year} className="px-4 py-2 text-right">
                          <div>{(retailing / 100000).toFixed(2)}</div>
                        </td>
                      );
                    })}
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
        </div>
      </CardContent>
    </Card>
  );
}
