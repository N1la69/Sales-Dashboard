import React from "react";

type YearBreakdown = {
  year: number;
  value: number;
};

const formatFiscalYear = (year: number) => {
  const startYear = year;
  const endYear = year + 1;
  return `${startYear}-${String(endYear).slice(-2)}`;
};

const StatCard = ({
  title,
  description,
  breakdown,
  growth,
}: {
  title: string;
  description?: string;
  breakdown?: YearBreakdown[];
  growth?: number | null;
}) => {
  const sorted = [...(breakdown ?? [])].sort((a, b) => b.year - a.year);
  const current = sorted[0];
  const previous = sorted[1];

  return (
    <div className="bg-indigo-300/10 dark:bg-indigo-700/10 rounded-lg shadow p-4 text-left">
      <h2 className="text-md md:text-lg font-semibold text-indigo-600 dark:text-indigo-400">
        {title}
      </h2>

      {description && (
        <h1 className="text-xl font-semibold mb-1">{description}</h1>
      )}

      {/* Current year */}
      {current && (
        <div className="mt-1">
          <p className="text-2xl md:text-2xl font-bold text-black dark:text-white">
            {formatFiscalYear(current.year)}:{" "}
            {(current.value / 100000).toFixed(1)}
          </p>
        </div>
      )}

      {/* Previous year */}
      {previous && (
        <div className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-1">
          {formatFiscalYear(previous.year)}:{" "}
          {(previous.value / 100000).toFixed(1)}
        </div>
      )}

      {/* Growth Index */}
      {growth !== undefined && (
        <div className="mt-2 font-semibold text-indigo-600 dark:text-indigo-400">
          Index:{" "}
          {growth !== null ? (
            <span
              className={
                growth > 100
                  ? "text-green-500"
                  : growth < 100
                  ? "text-red-500"
                  : "text-gray-500"
              }
            >
              {growth > 100 ? "+" : growth < 100 ? "-" : ""}
              {growth.toFixed(1)}%
            </span>
          ) : (
            "N/A"
          )}
        </div>
      )}
    </div>
  );
};

export default StatCard;
