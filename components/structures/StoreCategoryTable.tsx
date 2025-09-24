"use client";

import React, { useState, JSX } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MinusCircle, PlusCircle } from "lucide-react";

// ================= GraphQL =================
const STORE_RETAILING_BREAKDOWN = gql`
  query StoreRetailingBreakdown(
    $level: String!
    $parent: String
    $storeCode: String!
    $source: String
    $year: [Int!]
    $month: [Int!]
  ) {
    storeRetailingBreakdown(
      level: $level
      parent: $parent
      storeCode: $storeCode
      source: $source
      year: $year
      month: $month
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

// ================= Utilities =================
const PARENT_BG_COLORS = [
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

const CHILD_BG_COLORS = ["bg-gray-200/50 dark:bg-gray-800/30"];

const GRANDCHILD_BG_COLORS = ["bg-slate-300/50 dark:bg-slate-700/30"];

const GREATGRANDCHILD_BG_COLORS = ["bg-stone-300/50 dark:bg-stone-600/30"];

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

const NEXT_LEVEL: Record<string, string> = {
  category: "brand",
  brand: "brandform",
  brandform: "subbrandform",
};

const fiscalYearLabel = (fy: number) => `${fy - 1}-${String(fy).slice(-2)}`;

interface BreakdownItem {
  key: string;
  name: string;
  breakdown: { year: number; value: number }[];
  growth: number | null;
  childrenCount?: number | null;
}

interface CategoryRetailingStat {
  category: string;
  breakdown: { year: number; value: number }[];
}

interface Props {
  data: CategoryRetailingStat[];
  latestYears?: number[];
  filters?: Record<string, any>;
  source?: string;
  storeCode: string;
}

export default function StoreCategoryTable({
  data,
  latestYears,
  filters = {},
  source = "",
  storeCode,
}: Props) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [childrenData, setChildrenData] = useState<
    Record<string, BreakdownItem[]>
  >({});
  const [loadingKeys, setLoadingKeys] = useState<string[]>([]);

  const [fetchBreakdown] = useLazyQuery(STORE_RETAILING_BREAKDOWN);

  const topYears =
    latestYears ??
    Array.from(new Set(data.flatMap((d) => d.breakdown.map((y) => y.year))))
      .sort((a, b) => b - a)
      .slice(0, 2);

  const latestYear = topYears[0] ?? null;
  const previousYear = topYears[1] ?? null;

  // Convert top-level data into BreakdownItems
  const normalized: BreakdownItem[] = data.map((row) => ({
    key: row.category,
    name: row.category,
    breakdown: row.breakdown ?? [],
    growth: null,
    childrenCount: null,
  }));

  // Sort descending by latest year value
  const sortedTop = [...normalized].sort((a, b) => {
    const aLatest = latestYear
      ? a.breakdown.find((d) => d.year === latestYear)?.value ?? 0
      : 0;
    const bLatest = latestYear
      ? b.breakdown.find((d) => d.year === latestYear)?.value ?? 0
      : 0;
    return bLatest - aLatest;
  });

  // ================= Drill-down logic =================
  const toggleExpand = async (item: BreakdownItem, parentLevel: string) => {
    const rowKey = `${parentLevel}-${item.key}`;
    const nextLevel = NEXT_LEVEL[parentLevel];
    if (!nextLevel) return;

    // Collapse if already expanded
    if (expanded[rowKey]) {
      setExpanded((prev) => ({ ...prev, [rowKey]: false }));
      return;
    }

    // Use cached children if available
    if (childrenData[rowKey]) {
      setExpanded((prev) => ({ ...prev, [rowKey]: true }));
      return;
    }

    // Fetch children
    setLoadingKeys((prev) => [...prev, rowKey]);
    try {
      // 🔥 UPDATED: pass storeCode, year, month explicitly
      const res = await fetchBreakdown({
        variables: {
          level: nextLevel,
          parent: item.key,
          storeCode,
          source,
          year: filters?.year ?? [],
          month: filters?.month ?? [],
        },
      });

      const nodes: BreakdownItem[] = (
        res?.data?.storeRetailingBreakdown ?? []
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

      // **Set children first, then expand**
      setChildrenData((prev) => ({ ...prev, [rowKey]: sortedChildren }));
      setExpanded((prev) => ({ ...prev, [rowKey]: true }));
    } catch (error) {
      console.error("Drill fetch failed:", error);
    } finally {
      setLoadingKeys((prev) => prev.filter((k) => k !== rowKey));
    }
  };

  // ================= Render table rows =================
  const renderRows = (
    items: BreakdownItem[],
    parentLevel: string,
    depth = 0
  ): JSX.Element[] =>
    items.map((item, idx) => {
      const rowKey = `${parentLevel}-${item.key}`;
      const yearlyMap: Record<number, number> = {};
      (item.breakdown ?? []).forEach(({ year, value }) => {
        yearlyMap[year] = value;
      });

      const latest = latestYear ? yearlyMap[latestYear] ?? 0 : 0;
      const previous = previousYear ? yearlyMap[previousYear] ?? 0 : 0;
      const growth = previous !== 0 ? (latest / previous) * 100 : null;

      const growthColor =
        growth === null
          ? "text-gray-500"
          : growth > 100
          ? "text-green-500"
          : growth < 100
          ? "text-red-500"
          : "text-gray-500";

      const nextLevel = NEXT_LEVEL[parentLevel];
      const isExpandable = !!nextLevel;
      const isExpanded = !!expanded[rowKey];
      // Row color indexing
      let colorIdx: number;
      let rowBg: string;

      if (depth === 0) {
        colorIdx = idx % PARENT_BG_COLORS.length;
        rowBg = PARENT_BG_COLORS[colorIdx];
      } else if (depth === 1) {
        colorIdx = idx % CHILD_BG_COLORS.length;
        rowBg = CHILD_BG_COLORS[colorIdx];
      } else if (depth === 2) {
        colorIdx = idx % GRANDCHILD_BG_COLORS.length;
        rowBg = GRANDCHILD_BG_COLORS[colorIdx];
      } else {
        colorIdx = idx % GREATGRANDCHILD_BG_COLORS.length;
        rowBg = GREATGRANDCHILD_BG_COLORS[colorIdx];
      }

      return (
        <React.Fragment key={rowKey}>
          <tr
            className={`${rowBg} transition-colors hover:bg-muted dark:hover:bg-accent`}
          >
            <td
              style={{ paddingLeft: `${depth * 1.5}rem` }}
              className={`px-4 py-2 font-medium ${COLOR_PALETTE[colorIdx]} rounded-l-lg`}
            >
              <button
                className="flex items-center gap-2 w-full text-left pl-2"
                onClick={() => toggleExpand(item, parentLevel)}
                aria-expanded={isExpanded}
              >
                {isExpandable ? (
                  isExpanded ? (
                    <MinusCircle size={12} />
                  ) : (
                    <PlusCircle size={12} />
                  )
                ) : (
                  <span style={{ width: 18, display: "inline-block" }} />
                )}
                <span>{item.name}</span>
              </button>
            </td>

            {topYears.map((year, i) => (
              <td
                key={year}
                className={`px-4 py-2 text-right ${
                  i === 0 ? "font-semibold" : ""
                }`}
              >
                {yearlyMap[year]?.toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                }) ?? "0.00"}
              </td>
            ))}

            {topYears.length > 1 && (
              <td
                className={`px-4 py-2 text-right font-semibold ${growthColor}`}
              >
                {growth !== null
                  ? `${growth > 100 ? "+" : "-"}${growth.toFixed(1)}%`
                  : "N/A"}
              </td>
            )}
          </tr>

          {isExpanded &&
            nextLevel &&
            childrenData[rowKey] &&
            renderRows(childrenData[rowKey], nextLevel, depth + 1)}

          {loadingKeys.includes(rowKey) && (
            <tr>
              <td
                colSpan={(topYears.length || 1) + 2}
                className="px-4 py-2 italic text-gray-500"
              >
                Loading...
              </td>
            </tr>
          )}
        </React.Fragment>
      );
    });

  const collapseAll = () => setExpanded({});

  return (
    <Card className="mt-6 rounded-2xl shadow-md">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-lg font-semibold">
          Category Retailing Breakdown
        </CardTitle>
        <button
          onClick={collapseAll}
          className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm"
        >
          <MinusCircle size={18} />
        </button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border-separate border-spacing-y-2 overflow-hidden">
            <thead className="font-semibold">
              <tr>
                <th className="px-4 py-2">Category</th>
                {topYears.map((year) => (
                  <th key={year} className="px-4 py-2 text-right">
                    {fiscalYearLabel(year)} (₹)
                  </th>
                ))}
                {topYears.length > 1 && (
                  <th className="px-4 py-2 text-right">Growth %</th>
                )}
              </tr>
            </thead>
            <tbody>{renderRows(sortedTop, "category")}</tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
