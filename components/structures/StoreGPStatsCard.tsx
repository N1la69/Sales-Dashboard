interface StoreGPStatsProps {
  data: {
    highestGPMonth?: {
      year: number;
      month: number;
      monthName: string;
      gp: number;
    } | null;
    lowestGPMonth?: {
      year: number;
      month: number;
      monthName: string;
      gp: number;
    } | null;
    averageGP?: number | null;
  } | null;
  loading: boolean;
  error: any;
}

export function StoreGPStatsCard({ data, loading, error }: StoreGPStatsProps) {
  if (loading)
    return (
      <p className="text-indigo-600 dark:text-indigo-300">
        Loading GP stats...
      </p>
    );
  if (error)
    return (
      <p className="text-red-600 dark:text-red-400">
        Error loading GP stats: {error.message}
      </p>
    );
  if (!data)
    return (
      <p className="text-gray-500 dark:text-gray-400">No GP stats available.</p>
    );

  return (
    <div className="flex flex-col gap-4">
      {/* Highest GP Month */}
      <div className="p-4 rounded-xl border border-green-300 dark:border-green-700 bg-green-50/30 dark:bg-green-950/20 text-green-800 dark:text-green-200 shadow-sm">
        <h3 className="font-semibold mb-1">Highest GP Month</h3>
        {data.highestGPMonth ? (
          <p>
            {data.highestGPMonth.monthName} {data.highestGPMonth.year} –{" "}
            {data.highestGPMonth.gp}
          </p>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No data available</p>
        )}
      </div>

      {/* Lowest GP Month */}
      <div className="p-4 rounded-xl border border-red-300 dark:border-red-700 bg-red-50/30 dark:bg-red-950/20 text-red-800 dark:text-red-200 shadow-sm">
        <h3 className="font-semibold mb-1">Lowest GP Month</h3>
        {data.lowestGPMonth ? (
          <p>
            {data.lowestGPMonth.monthName} {data.lowestGPMonth.year} –{" "}
            {data.lowestGPMonth.gp}
          </p>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No data available</p>
        )}
      </div>

      {/* Average GP */}
      <div className="p-4 rounded-xl border border-blue-300 dark:border-blue-700 bg-blue-50/30 dark:bg-blue-950/20 text-blue-800 dark:text-blue-200 shadow-sm">
        <h3 className="font-semibold mb-1">Average GP</h3>
        {data.averageGP !== null && data.averageGP !== undefined ? (
          <p>{data.averageGP}</p>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No data available</p>
        )}
      </div>
    </div>
  );
}
