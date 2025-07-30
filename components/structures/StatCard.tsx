import React from "react";

type YearBreakdown = {
  year: number;
  value: number;
};

const StatCard = ({
  title,
  value,
  description,
  breakdown,
  growth,
}: {
  title: string;
  value: number | string;
  description?: string;
  breakdown?: YearBreakdown[];
  growth?: number | null;
}) => (
  <div className="bg-indigo-300/10 dark:bg-indigo-700/10 rounded-lg shadow p-4 text-left">
    <h2 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
      {title}
    </h2>

    {description ? (
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-300">
          {description}
        </h2>
        <p className="text-2xl font-bold text-black dark:text-white">
          {typeof value === "number" ? value.toLocaleString() : value}
        </p>
      </div>
    ) : (
      <p className="text-2xl font-bold text-black dark:text-white">
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>
    )}

    {(breakdown?.length || growth !== undefined) && (
      <div className="text-gray-700 dark:text-gray-300 mt-2">
        <h2 className="text-base font-semibold text-indigo-600 dark:text-indigo-400">
          Breakdown:
        </h2>
        {[...(breakdown ?? [])]
          .sort((a, b) => b.year - a.year)
          .map((entry) => (
            <div
              key={entry.year}
              className="font-bold text-black dark:text-gray-300"
            >
              {entry.year}:{" "}
              <span className="font-semibold text-gray-700 dark:text-white">
                {(entry.value / 100000).toFixed(1)}
              </span>
            </div>
          ))}

        {growth !== undefined && (
          <div className="mt-2 font-semibold text-indigo-600 dark:text-indigo-400">
            Index:{" "}
            {growth !== null ? (
              <span
                className={growth > 100 ? "text-green-500" : "text-red-500"}
              >
                {growth > 100 ? "+" : "-"}
                {growth.toFixed(1)}%
              </span>
            ) : (
              "N/A"
            )}
          </div>
        )}
      </div>
    )}
  </div>
);

export default StatCard;
