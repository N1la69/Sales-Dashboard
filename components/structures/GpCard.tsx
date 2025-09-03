import React, { useState } from "react";

type YearBreakdown = {
  year: number;
  value: number;
};

const formatFiscalYear = (endYear: number) => {
  const startYear = endYear - 1;
  return `${startYear}-${String(endYear).slice(-2)}`;
};

interface GpCardProps {
  title?: string;
  breakdown?: YearBreakdown[];
  growth?: number | null;
  onChange?: (gpType: "p3m" | "p1m") => void; // parent can hook into this
}

const GpCard: React.FC<GpCardProps> = ({
  title = "Gross Profit",
  breakdown,
  growth,
  onChange,
}) => {
  const [gpType, setGpType] = useState<"p3m" | "p1m">("p3m");

  const handleSwitch = (type: "p3m" | "p1m") => {
    setGpType(type);
    onChange?.(type); // notify parent
  };

  const sorted = [...(breakdown ?? [])].sort((a, b) => b.year - a.year);
  const current = sorted[0];
  const previous = sorted[1];

  return (
    <div className="bg-indigo-300/10 dark:bg-indigo-700/10 rounded-lg shadow p-4 text-left">
      <div className="flex items-center justify-between">
        <h2 className="text-md md:text-lg font-semibold text-indigo-600 dark:text-indigo-400">
          {title}
        </h2>

        {/* Switch buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => handleSwitch("p3m")}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              gpType === "p3m"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200"
            }`}
          >
            P3M
          </button>
          <button
            onClick={() => handleSwitch("p1m")}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              gpType === "p1m"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200"
            }`}
          >
            P1M
          </button>
        </div>
      </div>

      {/* Current year */}
      {current && (
        <div className="mt-2">
          <p className="text-2xl md:text-2xl font-bold text-black dark:text-white">
            {formatFiscalYear(current.year)}: {current.value}
          </p>
        </div>
      )}

      {/* Previous year */}
      {previous && (
        <div className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-1">
          {formatFiscalYear(previous.year)}: {previous.value}
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

export default GpCard;
