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
  if (loading) return <p>Loading store stats...</p>;
  if (error) return <p>Error loading stats: {error.message}</p>;
  if (!data) return <p>No stats available.</p>;

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="p-4 border rounded shadow">
        <h3 className="font-semibold">Highest Retailing Month</h3>
        {data.highestRetailingMonth ? (
          <p>
            {data.highestRetailingMonth.month}/{data.highestRetailingMonth.year}{" "}
            - ₹{(data.highestRetailingMonth.retailing / 100000).toFixed(2)}{" "}
            Lakhs
          </p>
        ) : (
          <p>No data</p>
        )}
      </div>

      <div className="p-4 border rounded shadow">
        <h3 className="font-semibold">Lowest Retailing Month</h3>
        {data.lowestRetailingMonth ? (
          <p>
            {data.lowestRetailingMonth.month}/{data.lowestRetailingMonth.year} -
            ₹{(data.lowestRetailingMonth.retailing / 100000).toFixed(2)} Lakhs
          </p>
        ) : (
          <p>No data</p>
        )}
      </div>

      <div className="p-4 border rounded shadow">
        <h3 className="font-semibold">Highest Retailing Brand</h3>
        <p>
          {data.highestRetailingBrand.brand} - ₹
          {(data.highestRetailingBrand.retailing / 100000).toFixed(2)} Lakhs
        </p>
      </div>

      <div className="p-4 border rounded shadow">
        <h3 className="font-semibold">Lowest Retailing Brand</h3>
        <p>
          {data.lowestRetailingBrand.brand} - ₹
          {(data.lowestRetailingBrand.retailing / 100000).toFixed(2)} Lakhs
        </p>
      </div>
    </div>
  );
}
