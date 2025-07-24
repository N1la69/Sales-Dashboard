/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <Card className="shadow-md">
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
              className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-1"
            >
              <span className="font-medium">{item.brandform || "Unknown"}</span>
              <span>{(item.retailing / 100000).toFixed(2)} </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
