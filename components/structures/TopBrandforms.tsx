/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Inline color palette for Tailwind utility classes (soft background)
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

  return (
    <Card className="shadow-md bg-slate-100/40 dark:bg-slate-800/30 border-transparent">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center">
          Top 10 Brandforms (in Lakhs)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {data.map((item, index) => (
            <li
              key={index}
              className={`flex justify-between items-center rounded-md px-3 py-1.5 font-medium text-sm hover:bg-muted ${
                BG_COLORS[index % BG_COLORS.length]
              }`}
            >
              <span>{item.brandform || "Unknown"}</span>
              <span>{(item.retailing / 100000).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
