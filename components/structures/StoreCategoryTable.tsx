"use client";

import React, { useState, JSX } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MinusCircle, PlusCircle } from "lucide-react";

// ================= GraphQL =================
// 🔥 UPDATED: store drilldown query
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
const ROW_COLORS = [
  "bg-indigo-50 dark:bg-indigo-900/20",
  "bg-emerald-50 dark:bg-emerald-900/20",
  "bg-amber-50 dark:bg-amber-900/20",
  "bg-rose-50 dark:bg-rose-900/20",
  "bg-sky-50 dark:bg-sky-900/20",
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

  // 🔥 UPDATED: useLazyQuery for store breakdown
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
    breakdown: row.breakdown ?? [], // ✅ instead of row.yearWise
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
    } catch (err) {
      console.error("Drill fetch failed:", err);
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
      const rowBg = ROW_COLORS[idx % ROW_COLORS.length];

      return (
        <React.Fragment key={rowKey}>
          <tr
            className={`${rowBg} transition-colors hover:bg-muted dark:hover:bg-accent`}
          >
            <td className="px-4 py-2 font-medium">
              <button
                className="flex items-center gap-2 w-full text-left"
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
