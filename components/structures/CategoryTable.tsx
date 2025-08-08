/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { JSX, useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const GET_RETAILING_BREAKDOWN = gql`
  query GetRetailingBreakdown(
    $level: String!
    $parent: String
    $filters: FilterInput
    $source: String
  ) {
    retailingBreakdown(
      level: $level
      parent: $parent
      filters: $filters
      source: $source
    ) {
      key
      name
      breakdown {
        year
        value
      }
      growth
      childrenCount
    }
  }
`;

interface RawIncoming {
  category?: string;
  key?: string;
  name?: string;
  breakdown: { year: number; value: number }[];
  childrenCount?: number;
}

interface BreakdownItem {
  key: string;
  name: string;
  breakdown: { year: number; value: number }[];
  growth: number | null;
  childrenCount?: number | null;
}

interface CategoryTableProps {
  data: RawIncoming[];
  loading: boolean;
  error: any;
  filters?: any; // optional filters for the query
  source?: string; // optional source for the query
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

const NEXT_LEVEL: Record<string, string> = {
  category: "brand",
  brand: "brandform",
  brandform: "subbrandform",
};

export default function CategoryTable({
  data = [],
  loading,
  error,
  filters = {},
  source = "",
}: CategoryTableProps): JSX.Element {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [childrenData, setChildrenData] = useState<
    Record<string, BreakdownItem[]>
  >({});

  // useLazyQuery for drill-down
  const [fetchBreakdown, { loading: drillLoading }] = useLazyQuery(
    GET_RETAILING_BREAKDOWN,
    {
      fetchPolicy: "network-only",
    }
  );

  if (loading) return <p className="dark:text-white">Loading categories...</p>;
  if (error)
    return (
      <p className="text-red-500">Error loading categories: {error.message}</p>
    );

  // Normalize incoming data
  const normalized: BreakdownItem[] = data.map((raw) => {
    const key = raw.key ?? raw.category ?? raw.name ?? "Unknown";
    const name = raw.name ?? raw.category ?? raw.key ?? "Unknown";
    const breakdown = raw.breakdown ?? [];
    const childrenCount = raw.childrenCount ?? null;
    return { key, name, breakdown, growth: null, childrenCount };
  });

  // Determine unique years
  const uniqueYears = Array.from(
    new Set(normalized.flatMap((item) => item.breakdown.map((b) => b.year)))
  ).sort((a, b) => b - a);

  const latestYear = uniqueYears[0] ?? null;
  const previousYear = uniqueYears[1] ?? null;

  // Sort normalized rows descending by latest year value
  const sortedTop = [...normalized].sort((a, b) => {
    const aLatest = latestYear
      ? a.breakdown.find((d) => d.year === latestYear)?.value ?? 0
      : 0;
    const bLatest = latestYear
      ? b.breakdown.find((d) => d.year === latestYear)?.value ?? 0
      : 0;
    return bLatest - aLatest;
  });

  // returns an array of JSX elements
  const renderRows = (
    items: BreakdownItem[],
    depth: number,
    parentLevel: string
  ): JSX.Element[] => {
    return items.map((item, idx) => {
      const yearlyMap: Record<number, number> = {};
      item.breakdown.forEach(({ year, value }) => {
        yearlyMap[year] = value;
      });

      const latest = latestYear ? yearlyMap[latestYear] ?? 0 : 0;
      const previous = previousYear ? yearlyMap[previousYear] ?? 0 : 0;
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

      const isExpandable =
        item.childrenCount === null || item.childrenCount === undefined
          ? true
          : item.childrenCount > 0;
      const isExpanded = !!expanded[item.key];
      const nextLevel = NEXT_LEVEL[parentLevel];

      const toggleExpand = async () => {
        if (!nextLevel) return;

        if (isExpanded) {
          setExpanded((p) => ({ ...p, [item.key]: false }));
          return;
        }

        setExpanded((p) => ({ ...p, [item.key]: true }));

        try {
          const res = await fetchBreakdown({
            variables: {
              level: nextLevel,
              parent: item.key,
              filters: filters ?? {},
              source: source ?? "",
            },
          });

          const nodes: BreakdownItem[] = (
            res?.data?.retailingBreakdown ?? []
          ).map((n: any) => ({
            key: n.key ?? n.name ?? "Unknown",
            name: n.name ?? n.key ?? "Unknown",
            breakdown: n.breakdown ?? [],
            growth: n.growth ?? null,
            childrenCount: n.childrenCount ?? null,
          }));

          const sortedChildren = [...nodes].sort((a, b) => {
            const aLatest = latestYear
              ? a.breakdown.find((d) => d.year === latestYear)?.value ?? 0
              : 0;
            const bLatest = latestYear
              ? b.breakdown.find((d) => d.year === latestYear)?.value ?? 0
              : 0;
            return bLatest - aLatest;
          });

          setChildrenData((prev) => ({
            ...prev,
            [item.key]: sortedChildren,
          }));
        } catch (err) {
          console.error("Drill fetch failed:", err);
          setExpanded((p) => ({ ...p, [item.key]: false }));
        }
      };

      // Row color indexing
      const colorIdx = idx % BG_COLORS.length;
      const textColorIdx = idx % COLOR_PALETTE.length;

      return (
        <React.Fragment key={item.key}>
          <tr
            className={`transition-colors hover:bg-muted dark:hover:bg-accent ${BG_COLORS[colorIdx]}`}
          >
            <td
              className={`px-4 py-2 font-medium ${COLOR_PALETTE[textColorIdx]} rounded-l-lg`}
              style={{ paddingLeft: `${depth * 1.5}rem` }}
            >
              {/* clickable area */}
              <button
                onClick={toggleExpand}
                className="flex items-center gap-2 w-full text-left"
                aria-expanded={isExpanded}
                aria-label={`${isExpanded ? "Collapse" : "Expand"} ${
                  item.name
                }`}
              >
                {/* show arrow if nextLevel exists */}
                {nextLevel && isExpandable ? (
                  <span className="cursor-pointer select-none">
                    {isExpanded ? "▼" : "▶"}
                  </span>
                ) : (
                  <span style={{ width: 18, display: "inline-block" }} />
                )}
                <span>{item.name || "Unknown"}</span>
              </button>
            </td>

            {uniqueYears.map((year) => (
              <td key={year} className="px-4 py-2 text-right">
                <div className={year === latestYear ? "font-semibold" : ""}>
                  {yearlyMap[year]
                    ? (yearlyMap[year] / 100000).toFixed(2)
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

          {/* children (if expanded) */}
          {isExpanded &&
            childrenData[item.key] &&
            renderRows(childrenData[item.key], depth + 1, nextLevel ?? "")}

          {/* loading row */}
          {isExpanded && drillLoading && (
            <tr>
              <td
                colSpan={(uniqueYears.length || 1) + 2}
                className="px-4 py-2 italic text-gray-500"
                style={{ paddingLeft: `${(depth + 1) * 1.5}rem` }}
              >
                Loading...
              </td>
            </tr>
          )}
        </React.Fragment>
      );
    });
  };

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
              <th className="px-4 py-2">Name</th>
              {uniqueYears.length > 0 ? (
                uniqueYears.map((year) => (
                  <th key={year} className="px-4 py-2 text-right">
                    {year}
                  </th>
                ))
              ) : (
                <th className="px-4 py-2 text-right">Year</th>
              )}
              <th className="px-4 py-2 text-right">Index</th>
            </tr>
          </thead>
          <tbody>{renderRows(sortedTop, 0, "category")}</tbody>
        </table>
      </CardContent>
    </Card>
  );
}
