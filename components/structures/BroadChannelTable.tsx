/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

interface BroadChannelItem {
  broad_channel: string;
  breakdown: { year: number; value: number }[];
}

interface BroadChannelTableProps {
  data: BroadChannelItem[];
  loading: boolean;
  error: any;
}

export default function BroadChannelTable({
  data = [],
  loading,
  error,
}: BroadChannelTableProps) {
  if (loading) return <p className="dark:text-white">Loading channels...</p>;
  if (error)
    return (
      <p className="text-red-500 font-outfit">
        Error loading channels: {error.message}
      </p>
    );

  const uniqueYears = Array.from(
    new Set(data.flatMap((item) => item.breakdown.map((b) => b.year)))
  ).sort((a, b) => b - a); // descending
  const [latestYear, previousYear] = uniqueYears;

  const channelMap: Record<string, Record<number, number>> = {};
  const allChannels = data.map((item) => item.broad_channel);

  data.forEach(({ broad_channel, breakdown }) => {
    if (!channelMap[broad_channel]) channelMap[broad_channel] = {};
    breakdown.forEach(({ year, value }) => {
      channelMap[broad_channel][year] = value;
    });
  });

  const sortedChannels = [...allChannels].sort((a, b) => {
    const sumA = Object.values(channelMap[a]).reduce((sum, v) => sum + v, 0);
    const sumB = Object.values(channelMap[b]).reduce((sum, v) => sum + v, 0);
    return sumB - sumA;
  });

  return (
    <Card className="shadow-md bg-slate-100/40 dark:bg-slate-800/30 border-transparent">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center">
          Retailing by Base Channel (in Lakhs)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border-separate border-spacing-y-2">
            <thead>
              <tr>
                <th className="px-4 py-2">Base Channel</th>
                {uniqueYears.map((year) => (
                  <th key={year} className="px-4 py-2 text-right">
                    {year}
                  </th>
                ))}
                <th className="px-4 py-2 text-right">Index</th>
              </tr>
            </thead>
            <tbody>
              {sortedChannels.map((channel, index) => {
                const yearly = channelMap[channel];
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
                    key={channel}
                    className={`hover:bg-muted transition-colors ${
                      BG_COLORS[index % BG_COLORS.length]
                    } rounded-lg`}
                  >
                    <td
                      className={`px-4 py-2 font-medium rounded-l-lg ${
                        COLOR_PALETTE[index % COLOR_PALETTE.length]
                      }`}
                    >
                      {channel || "Unknown"}
                    </td>
                    {uniqueYears.map((year) => (
                      <td key={year} className="px-4 py-2 text-right">
                        <div
                          className={year === latestYear ? "font-semibold" : ""}
                        >
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
        </div>
      </CardContent>
    </Card>
  );
}
