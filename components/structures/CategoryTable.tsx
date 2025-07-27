/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CategoryTableProps {
  data: { category: string; retailing: number }[];
  loading: boolean;
  error: any;
}

export default function CategoryTable({
  data = [],
  loading,
  error,
}: CategoryTableProps) {
  const total = data.reduce((sum, item) => sum + item.retailing, 0);

  const sortedData = [...data].sort((a, b) => b.retailing - a.retailing);

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center">
          Retailing by Category
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error.message}</p>}
        {!loading && !error && (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-1">Category</th>
                <th className="py-1">Retailing (Lakhs)</th>
                <th className="py-1">% Share</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map(({ category, retailing }) => (
                <tr key={category} className="border-b hover:bg-muted">
                  <td className="py-1">{category || "Unknown"}</td>
                  <td className="py-1">{(retailing / 100000).toFixed(2)}</td>
                  <td className="py-1">
                    {total > 0 ? ((retailing / total) * 100).toFixed(1) : "0.0"}
                    %
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CardContent>
    </Card>
  );
}
