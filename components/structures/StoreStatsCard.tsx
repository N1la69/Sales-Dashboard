/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

interface StoreStatsProps {
  data: {
    highestRetailingMonth: {
      year: number;
      month: number;
      retailing: number;
    };
    lowestRetailingMonth: {
      year: number;
      month: number;
      retailing: number;
    };
    highestRetailingBrand: {
      brand: string;
      retailing: number;
    };
    lowestRetailingBrand: {
      brand: string;
      retailing: number;
    };
  } | null;
  loading: boolean;
  error: any;
}

export default function StoreStatsCard({
  data,
  loading,
  error,
}: StoreStatsProps) {
  if (loading)
    return (
      <p className="text-indigo-600 dark:text-indigo-300">
        Loading store stats...
      </p>
    );
  if (error)
    return (
      <p className="text-red-600 dark:text-red-400">
        Error loading stats: {error.message}
      </p>
    );
  if (!data)
    return (
      <p className="text-gray-500 dark:text-gray-400">No stats available.</p>
    );

  return (
    <div className="flex flex-col gap-4">
      <div className="p-4 rounded-xl border border-indigo-300 dark:border-indigo-700 bg-indigo-50/30 dark:bg-indigo-950/20 text-indigo-800 dark:text-indigo-200 shadow-sm">
        <h3 className="font-semibold mb-1">Highest Retailing Month</h3>
        <p>
          {data.highestRetailingMonth.month}/{data.highestRetailingMonth.year} –
          ₹{data.highestRetailingMonth.retailing.toFixed(2)}
        </p>
      </div>

      <div className="p-4 rounded-xl border border-indigo-300 dark:border-indigo-700 bg-indigo-50/30 dark:bg-indigo-950/20 text-indigo-800 dark:text-indigo-200 shadow-sm">
        <h3 className="font-semibold mb-1">Lowest Retailing Month</h3>
        <p>
          {data.lowestRetailingMonth.month}/{data.lowestRetailingMonth.year} – ₹
          {data.lowestRetailingMonth.retailing.toFixed(2)}
        </p>
      </div>

      <div className="p-4 rounded-xl border border-indigo-300 dark:border-indigo-700 bg-indigo-50/30 dark:bg-indigo-950/20 text-indigo-800 dark:text-indigo-200 shadow-sm">
        <h3 className="font-semibold mb-1">Highest Retailing Brand</h3>
        <p>
          {data.highestRetailingBrand.brand} – ₹
          {data.highestRetailingBrand.retailing.toFixed(2)}
        </p>
      </div>

      <div className="p-4 rounded-xl border border-indigo-300 dark:border-indigo-700 bg-indigo-50/30 dark:bg-indigo-950/20 text-indigo-800 dark:text-indigo-200 shadow-sm">
        <h3 className="font-semibold mb-1">Lowest Retailing Brand</h3>
        <p>
          {data.lowestRetailingBrand.brand} – ₹
          {data.lowestRetailingBrand.retailing.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
